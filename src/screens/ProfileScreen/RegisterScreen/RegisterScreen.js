import { useNavigation } from "@react-navigation/native";
import { Icon, Image } from "@rneui/themed";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { RegisterForm } from "../../../components/auth/RegisterForm";
import { styles } from "./RegisterScreen.styles";


export function RegisterScreen() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === "android" ? 150 : 0}
      extraHeight={Platform.OS === "android" ? 150 : 0}
      keyboardOpeningTime={0}
      viewIsInsideTabBar={true}
    >
      <Icon
        type="material-design"
        name="arrow-left"
        size={30}
        containerStyle={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
        onPress={goBack}
      ></Icon>
      <Image
        source={require("../../../../assets/images/koruApp.png")}
        style={styles.Image}
      ></Image>
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAvoidingView>
  );
}
