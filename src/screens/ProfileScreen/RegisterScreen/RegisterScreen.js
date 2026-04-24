import { Image,Icon } from "@rneui/themed";
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { RegisterForm } from "../../../components/auth/RegisterForm";
import { styles } from './RegisterScreen.styles';
import { useNavigation } from "@react-navigation/native";
    

export function RegisterScreen() {
  const navigation = useNavigation();

  const goBack=()=>{
    navigation.goBack()
  }
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === 'android' ? 150 : 0} 
      extraHeight={Platform.OS === 'android' ? 150 : 0}
      keyboardOpeningTime={0}
      viewIsInsideTabBar={true} 
    >
      <Icon
        type="material-design"
        name="arrow-left"
        size={30}
        containerStyle={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
        onPress={goBack}
      >

      </Icon>
      <Image
        source={require('../../../../assets/images/koruApp.png')}
        style ={styles.Image}>
      </Image>
      <View
        style ={styles.content}>
        <RegisterForm/>
      </View>
    </KeyboardAwareScrollView>
  )
}
