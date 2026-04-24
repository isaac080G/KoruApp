import React, { useState } from 'react';
import { View, Text, Platform,ScrollView } from 'react-native';
import { Button, Icon,Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './BirthdayScreenStyles';
import { collection,addDoc, doc,setDoc} from 'firebase/firestore';


import { auth, db } from "../../../utils/Firebase";
import {validationSchema,initialValues} from "./BirthdayScreen.Data"
import {useFormik } from 'formik';
import {useNavigation} from "@react-navigation/native";
import { screen } from '../../../utils';





export function BirthdayScreen({route}) {

  const {userName}=route.params;
  
  const navigation=useNavigation();
  const [date, setDate] = useState(new Date(1995, 0, 15));
  const [show, setShow] = useState(Platform.OS === 'ios');
  console.log("Nombre recibido en BirthdayScreen:", userName); 



  const formik=useFormik({
    initialValues:initialValues(),
    validationSchema:validationSchema(),
    onSubmit:async(formValue)=>{
      try{
        const uid=auth.currentUser.uid;
        await setDoc(doc(db, "usuarios", uid), {
        name:userName,
        email: auth.currentUser.email,
        birthday: date.toISOString(),
        emergencyPhone: formValue.emergencyPhone,
        updatedAt: new Date().toISOString(),
      });
      console.log("Perfil de usuario guardado con su propio UID");
      navigation.navigate(screen.Home.tab,{
        screen: screen.Home.home
      });
    }catch(error){
      console.log("Error al crear el documento del usuario", error);
    }
    }
  })

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === 'android') setShow(false);
    setDate(currentDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
    <View style={styles.content}>

      <Icon
        type="material-community"
        name="cake-variant-outline"
        size={60}
        color="#9562ed"
        containerStyle={styles.iconHeader}
      />

      <Text style={styles.title}>¿CUÁNDO ES TU CUMPLEAÑOS?</Text>
      <Text style={styles.subtitle}>
        Esto nos ayuda a personalizar tu experiencia de bienestar en Koru.
      </Text>


      <View style={styles.pickerCard}>
        {Platform.OS === 'android' && (
          <Button
            title="Seleccionar Fecha"
            onPress={() => setShow(true)}
            buttonStyle={styles.androidDateBtn}
          />
        )}

        {(show || Platform.OS === 'ios') && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            locale="es-ES"
            maximumDate={new Date()}
            textColor="#000"
          />
        )}
      </View>


      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateLabel}>TU FECHA SELECCIONADA:</Text>
        <Text style={styles.selectedDateText}>{formatDate(date)}</Text>
      </View>
      
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <Icon type="material-community" name="alarm-light" iconStyle={{color:"red",}} size={80} />
      </View>
      <View style={styles.emergencyPhoneContainer}>
        <Input 
        placeholder='Numero de telefono de Emergencia'
        keyboardType="number-pad" 
        maxLength={10}            
        onChangeText={(text) => formik.setFieldValue("emergencyPhone", text)}
        value={formik.values.emergencyPhone}
        ></Input>
        <Text style={{marginTop: 0}}>Este numero se registrara para la configuracion del Boton de Emergencia</Text>
      
        
      </View>


      
    </View>
    <View style={{marginHorizontal: 30}}>
    
      <Button
        title="CONTINUAR"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={()=>{console.log("Submitting form..."); formik.handleSubmit();console.log("Errores de Formik:", formik.errors);}}
        loading={formik.isSubmitting}
      />
    </View>
  </>
  );
}