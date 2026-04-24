import { View, Text } from 'react-native'
import React from 'react'
import {InfoUser} from "../../../components/Account/InfoUser/InfoUser"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@rneui/themed'
import{styles} from "./UserLoggedScreen.styles"
import { getAuth } from 'firebase/auth'


export function UserLoggedScreen() {

  const logout = () => {
    const auth= getAuth()
    auth.signOut()
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF9F7' }}>
    <View>
      <InfoUser></InfoUser>
    </View>
    <Button
        title={"Cerrar sesion"}
        buttonStyle={styles.btnStyles}
        titleStyle={styles.title}
        onPress={logout}
      ></Button>
    </SafeAreaView>
  )
}