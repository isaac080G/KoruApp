import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Icon } from '@rneui/themed';
import Communications from 'react-native-communications';
import { useNavigation } from '@react-navigation/native';
import { styles } from './alertScreenStyles';
import {auth} from "../../utils/Firebase"
import {db} from "../../utils/Firebase"
import {getDoc,doc} from "firebase/firestore";
import  Toast from 'react-native-toast-message';




export function AlertScreen() {
  const [seconds, setSeconds] = useState(10);
  const navigation = useNavigation();

  useEffect(() => {
    
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    
    if (seconds === 0) {
      clearInterval(timer);
      handleEmergencyCall();
    }

    return () => clearInterval(timer);
  }, [seconds]);

  const handleEmergencyCall = async() => {
    console.log("Iniciando llamada de emergencia...");
    const DocRef=doc(db,"usuarios",auth.currentUser.uid)
    console.log(DocRef)
    const EmergencyPhone= await getDoc(DocRef)

    if (!EmergencyPhone){
      console.log("No se encontró el número de emergencia para el usuario.");
      return;
    }else{
      console.log(EmergencyPhone.data().emergencyPhone)
      Communications.phonecall(EmergencyPhone.data().emergencyPhone, true);
      Toast.show({
        Text:"Llamando al contacto de emergencia...",
        Text2:EmergencyPhone.data().emergencyPhone,
        Text3:"Si no se conecta, por favor intente llamar manualmente.",
        position:"top-end",
        duration: 4000
      })
    }
    
    

  };

  const cancelAlert = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Text style={styles.warningTitle}>ALERTA ACTIVADA</Text>
      
      <View style={styles.timerOuterCircle}>
        <View style={styles.timerInnerCircle}>
          <Text style={styles.timerText}>{seconds}</Text>
        </View>
      </View>

      <Text style={styles.instructionText}>
        Llamando al contacto de emergencia en 10 segundos...
      </Text>

      <TouchableOpacity style={styles.cancelButton} onPress={cancelAlert}>
        <Text style={styles.cancelButtonText}>CANCELAR</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.callNowButton} onPress={handleEmergencyCall}>
        <Icon name="phone" type="material-community" color="#fff" size={24} />
        <Text style={styles.callNowText}>Llamar ahora</Text>
      </TouchableOpacity>
    </View>
  );
}