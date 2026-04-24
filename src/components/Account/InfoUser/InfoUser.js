import { Avatar, Text,Icon,Button } from "@rneui/themed";
import { View } from "react-native";
//import {getAuth,} from "firebase/auth"
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { styles } from "./InfoUser.styles";
import { useNavigation } from "@react-navigation/native";
import {auth} from "../../../utils/Firebase"
import {db} from "../../../utils/Firebase"
import {getDoc,doc} from "firebase/firestore";


export function InfoUser() {
  const navigation = useNavigation()
  const [Data,setData] = useState(null)


  const { uid, photoURL, email } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);

  //use Effect
  useEffect(() => {
    const getData = async()=>{

      try{
        const docRef = doc(db,"usuarios",auth.currentUser.uid)
      const DocSnapshot =  await getDoc(docRef)
      if (DocSnapshot.exists()) {
        setData(DocSnapshot.data())
      }
      }catch(error){
        console.log("Error al obtener el nombre del usuario:", error);
      }
      
    }
    getData()
      
    const unsubscribe = navigation.addListener('focus', () => {
    getData();
  });
    return () => {
      unsubscribe();
    }
  }, [navigation])
  

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
      console.log("cargando imagen...");
    }
  };
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoURL(snapshot.metadata.fullPath);
    });
  };
  const updatePhotoURL = async (imagepath) => {
    const storage = getStorage();
    const imageref = ref(storage, imagepath);

    const imageurl = await getDownloadURL(imageref);

    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageurl });
    setAvatar(imageurl);
    
  };

  const goBack = () =>{
    navigation.goBack()
  }

  const GetDate = () =>{
    console.log(Data)
      if(Data){
        const DateIso= Data.birthday
        const DateObj = new Date(DateIso)
        const day = DateObj.getDate().toString().padStart(2, '0');
        const month = (DateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = DateObj.getFullYear();
        const Fecha = `${day}/${month}/${year}`;
        return Fecha
      }
    }


  return (
    <>
    
    <Icon
              type="material-community"
              name="arrow-left"
              size={20}
              containerStyle={{ position: 'absolute', top: 10, left: 10, zIndex: 1,marginTop:20 }}
              onPress={goBack}
            ></Icon>
    <View style={styles.content}>
      
  <Avatar
    size={140} 
        containerStyle={styles.avatarMarco} 
        avatarStyle={styles.avatarImage} 
    icon={!avatar ? { type: "material-community", name: "account", color: "#A9A9A9" } : undefined}
    source={avatar ? { uri: avatar } : null}
    onPress={changeAvatar}
  />
  
  
  <View style={styles.userInfo}>
    <Text style={styles.displayName}>{Data?.name || "Anónimo"}</Text>
    
  </View>


  <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
    <Icon
      type="material-community"
      name="check-circle" 
      color="#2a6f31"    
    />
    <Text> Perfil Activo</Text>
  </View>

  <View style={styles.data}>

    <Text style={styles.dataTitle}>Datos del Perfil</Text>
    <View style={{ flexDirection: 'row',alignItems: 'center',marginTop:5}}>
      <Icon
        type="material-community"
        name="email-outline" 
        size={35}
        color="#000000" 
      />
      <Text style={styles.dataText}>{email}</Text>
    </View>
    <View style={{ flexDirection: 'row',alignItems: 'center',marginTop:5}}>
      <Icon
        type="material-community"
        name="phone-outline" 
        size={35}
        color="#000000" 
      />
      <Text style={styles.dataText}>{Data?.emergencyPhone
? Data.emergencyPhone
 : "Anónimo"}</Text>
    </View>
    <View style={{ flexDirection: 'row',alignItems: 'center',marginTop:5}}>
      <Icon
        type="material-community"
        name="calendar-month-outline" 
        size={35}
        color="#000000" 
      />
      <Text style={styles.dataText}>{Data?.birthday ? GetDate() : "No especificado"}</Text>
    </View>

    <View style={{ marginTop: 20, alignItems: 'center' }}>
      <Button
        title="MIS DATOS"
        onPress={() => console.log("temp")}
        buttonStyle={styles.btnMenu}           
        containerStyle={styles.btnContainer}   
        titleStyle={styles.btnTitle}           
        icon={
          <Icon
            name="chevron-right"
            type="material-community"
            size={30}
            color="#9500ff" 
          />
        }
        iconRight 
        iconContainerStyle={styles.iconContainer}
      />
      <Button
        title="NUMERO DE EMERGENCIA"
        onPress={() => console.log("temp")}
        buttonStyle={styles.btnMenu}           
        containerStyle={styles.btnContainer}   
        titleStyle={styles.btnTitle}           
        icon={
          <Icon
            name="chevron-right"
            type="material-community"
            size={30}
            color="#9500ff" 
          />
        }
        iconRight 
        iconContainerStyle={styles.iconContainer}
      />
    </View>
    
    

  </View>
  

  
  
</View>
</>
  );
}
