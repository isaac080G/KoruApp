import { useNavigation } from "@react-navigation/native"
import { Button, Icon, Input } from "@rneui/themed"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useFormik } from "formik"
import { useState } from "react"
import { View } from 'react-native'
import Toast from "react-native-toast-message"
import { screen } from "../../../utils"
import { initialValues, validationSchema } from "../LoginForm/LoginForm.data"
import { styles } from './LoginForm.Styles'
export function LoginForm() {
  const navigation= useNavigation()

  const [showPassword, setShowPassword] =useState(false)
  const showHidenPassword =()=>{
    setShowPassword(!showPassword)

  }


  const formik=useFormik(
    {
      initialValues:initialValues(),
      validationSchema:validationSchema(),
      onSubmit: async(formValue)=>{
        try{
          const auth= getAuth()
          await signInWithEmailAndPassword(auth,formValue.email,formValue.password)
          navigation.navigate(screen.Home.tab,{screen: screen.Home.home})
        }
        catch(error){
          Toast.show({
            type:"error",
            position:"bottom",
            text1:"Error al iniciar sesion, intente de nuevo mas tarde"
          })
          console.log("error al registral el usuario",error)

        }
      }
    },
    
    

  )
  
  return (
    <View style={styles.content}>
      <Input
      placeholder='Correo Electronico'containerStyle={styles.Input}
      rightIcon={<Icon type="material-design" name={"at"} style={styles.icon}></Icon>}
      errorMessage={formik.errors.email}
      onChangeText={text=>formik.setFieldValue("email",text)}
      ></Input>
      <Input
      placeholder="Contraseña" containerStyle={styles.iconnput} secureTextEntry={showPassword? true:false}
      rightIcon={<Icon type="material-design" name={showPassword? "eye-off-outline" : "eye-outline"} onPress={showHidenPassword}></Icon>}
      errorMessage={formik.errors.password}
      onChangeText={text=>formik.setFieldValue("password",text)}
      >
      </Input>
      <Button
      title={"Iniciar Sesion"}
      containerStyle={styles.btnContainer} buttonStyle={styles.btn}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      ></Button>
      
    </View>
  )
}