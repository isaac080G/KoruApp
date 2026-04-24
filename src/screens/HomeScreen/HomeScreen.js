import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react'

import {styles} from "./HomeScreen.styles"
import { Icon } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../utils';
import {Header} from "../../components/Home/Header"
import {MoodSelector} from "../../components/Home"

export function HomeScreen() {
  const navigation = useNavigation()

  const gotoAlert = () => {
  navigation.navigate(screen.Alert.tab, {
    screen: screen.Alert.Alert
  });
};

  return (
    <SafeAreaView style={styles.container}>
      
      <Header></Header>

      <MoodSelector></MoodSelector> 

      <View style={styles.recommendationCard}>
        <Icon type="material-community" name="emoticon-happy" size={30} color="#333" />
        <Text style={styles.cardTitle}>Basado en tu Semana:</Text>
        <Text style={styles.cardBody}>
          Te recomendamos hacer los siguientes ejercicios:
        </Text>
        
        <TouchableOpacity style={styles.startButton}>
          <Icon type="material-community" name="star-circle" color="#8b80f9" size={24} />
          <Text style={styles.startButtonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.floatingActionContainer}>
        {/* Label Motivador a la izquierda */}
        <View style={styles.motivationBubble}>
          <Text style={styles.motivationBubbleText} numberOfLines={2}>
            Tu salud mental es prioridad
          </Text>
        </View>
        <Icon
          reverse
          type="material-community"
          name="alarm-light"
          color="#FFA318"
          size={35}
          containerStyle={styles.alertBtn}
          onPress={gotoAlert}
        />
      </View>

    </SafeAreaView>
    
  );
}