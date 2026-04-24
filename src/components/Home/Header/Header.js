import { View, Text } from 'react-native'
import { Avatar } from '@rneui/base'
import {styles} from "./Header.styles"
import { useNavigation } from "@react-navigation/native";
import {screen} from "../../../utils/Screenname"
import {auth} from "../../../utils/Firebase"
import {db} from "../../../utils/Firebase"
import {getDoc,doc} from "firebase/firestore";
import {storage} from "../../../utils/Firebase"
import {ref,getDownloadURL} from "firebase/storage"

import { useState,useEffect} from 'react';
export function Header() {


  const [Photo, setPhoto] = useState(null)
  const [name,setName]= useState("")
  const navigation= useNavigation()

  const goToAccount= () =>{
    navigation.navigate(screen.Profile.tab, {
      screen:screen.Profile.Profile
    })

  }

  useEffect(() => {
    const getData =  async()=>{
      try{
        const docRef = doc(db,"usuarios",auth.currentUser.uid)
        const DocSnapshot =  await getDoc(docRef)
        if (DocSnapshot.exists()) {
          const nameAux= (DocSnapshot.data().name).replace(/\s+/g, ' ').trim()
          setName(nameAux)
          
        }

      }catch(error){
        console.log("Error al obtener el nombre del usuario:", error);

      }
      try{
        if (auth.currentUser?.uid){
          const photoURL = ref(storage,`avatar/${auth.currentUser.uid}`)
          setPhoto(await getDownloadURL(photoURL))
        }
        
      }catch(error){
        console.log("Error al obtener la foto del usuario:", error);
      }

    }
    getData()
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    });

    return unsubscribe;
  }, [navigation])
  
  console.log(name);
  return (
    <View style={styles.header}>
        <Avatar
          size={50}
          rounded
          source={Photo? {uri:Photo} : require("../../../../assets/images/koruApp.png")} 
          containerStyle={styles.avatar}
          onPress={goToAccount}
          
        />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeTitle}>
            <Text> {`Hola, ${name || "Anónimo"}`}</Text>
          </Text>
          <Text style={styles.welcomeSubtitle}>¿Como te sientes el dia de hoy?</Text>
        </View>
      </View>
  )
}