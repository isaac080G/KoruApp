import { Icon } from "@rneui/base";
import { Button, Input } from "@rneui/themed";
import { useFormik } from "formik";

import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { View } from 'react-native';
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { styles } from './RegisterForm.Styles';

import { screen } from "../../../utils";


export function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigation=useNavigation();

  const formik = useFormik(
  {
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async(formValue) => {
      try{
        const auth=getAuth();
        await createUserWithEmailAndPassword(
          auth, formValue.email, formValue.password);
        navigation.navigate(navigation.navigate(screen.Profile.Name));
      }catch(error){
        Toast.show({
          type:"error",
          position:"bottom",
          text1:"Error al registrar el usuario, intente de nuevo mas tarde"
        });
        console.log("Error al registrar el usuario", error);
      }

    }
  }
  );
  const showHidePassword = () => {
    setShowPassword(!showPassword);
  }
  const showHideRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  }
  return (
    <View style={styles.content}>
      <Input placeholder='Correo Electronico' containerStyle={styles.input} rightIcon={<Icon type="material-community" name="at" iconStyle={styles.Icon} />}
      onChangeText={text=> formik.setFieldValue("email", text)}
      errorMessage={formik.errors.email}
      ></Input>
      
      <Input placeholder="Contraseña"
      containerStyle={styles.input}
      secureTextEntry={showPassword? false :true}
      rightIcon={<Icon type="material-community" name={showPassword? "eye-off-outline" : "eye-outline"} iconStyle={styles.Icon}
      onPress={showHidePassword}
      />}
      onChangeText={text=> formik.setFieldValue("password", text)}
      errorMessage={formik.errors.password}
      >
      </Input>
      <Input placeholder=" Repetir Contraseña"
      containerStyle={styles.input}
      secureTextEntry={showRepeatPassword? false :true}
      rightIcon={<Icon type="material-community" name={showRepeatPassword? "eye-off-outline" : "eye-outline"} iconStyle={styles.Icon} 
      onPress={showHideRepeatPassword}
      />}
      onChangeText={text=> formik.setFieldValue("repeatPassword", text)}
      errorMessage={formik.errors.repeatPassword}
      >
      </Input>
      <Button title={"Registrarse"} containerStyle={styles.btnContainer} buttonStyle={styles.btn}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      >
      
      </Button>
    </View>
  )
}