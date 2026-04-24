import React from 'react';
import { View, Image} from 'react-native';
import { Button } from '@rneui/themed'; 
import {styles} from './UserGestScreen.styles';
import { useNavigation } from '@react-navigation/native';
import {screen} from "../../../utils"

export function UserGestScreen() {
  const navigation=useNavigation()


  const goToLogin=()=>{
      navigation.navigate(screen.Profile.login)
  }
  const goToRegister=()=>{
    navigation.navigate(screen.Profile.register)
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require("../../../../assets/images/koruApp.png")} 
          style={styles.logo}
        />
      </View>
      <Button 
        title="INICIAR SESIÓN"
        buttonStyle={styles.btn} 
        containerStyle={styles.btnContainer} 
        onPress={()=>goToLogin()}
      />
      <Button 
        title="REGISTRARSE"
        type="outline"
        buttonStyle={styles.btnRegister} 
        titleStyle={styles.btnTextRegister}
        containerStyle={styles.btnContainer} 
        onPress={goToRegister}
      />
    </View>
  );
}