import { View, Text, ActivityIndicator } from 'react-native'
import { useState,useEffect } from 'react'
import {getAuth,onAuthStateChanged} from "firebase/auth"



import {UserLoggedScreen} from "./UserLoggedScreen"
import {UserGestScreen} from "./UserGestScreen"
import { LoadingModals } from '../../components/shared/LoadingModals/LoadingModals'


export function ProfileScreen() {
  const [hasLogged, sethasLogged] = useState(null)  

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
      sethasLogged(user ? true : false)
    })
  }, []);

  if (hasLogged===null) {
    return <LoadingModals show={true} text="Cargando..." />;
  }

  return hasLogged ? <UserLoggedScreen /> : <UserGestScreen />;
}