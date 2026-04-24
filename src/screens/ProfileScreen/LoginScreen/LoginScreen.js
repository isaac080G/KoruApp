import { View, Text, ScrollView} from 'react-native'
import React from 'react'
import {LoginForm} from "../../../components/auth/LoginForm"
import {styles} from "./LoginScreen.styles"
import { Image,Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { screen } from "../../../utils/Screenname"

export function LoginScreen() {
  const navigation = useNavigation()
  const goToRegister = () => {
    navigation.navigate(screen.Profile.register)
  }
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <ScrollView>
      <Icon
        type="material-community"
        name="arrow-left"
        size={30}
        containerStyle={{ position: 'absolute', top: 10, left: 10, zIndex: 1,marginTop:20 }}
        onPress={goBack}
      ></Icon>

      <Image source={require("../../../../assets/images/koruApp.png")} style={styles.Image}></Image>
      <View style={styles.content}>
        <LoginForm></LoginForm>
        <Text style={styles.textRegister}> 
          ¿Aún no tienes una cuenta?
          <Text style={styles.btnRegister} onPress={goToRegister}>resgistrarse</Text>
        </Text>
      </View>
      
    </ScrollView>
  )
}