import { useNavigation } from "@react-navigation/native";
import { Icon, Image } from "@rneui/themed";
import { Platform, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LoginForm } from "../../../components/auth/LoginForm";
import { screen } from "../../../utils/Screenname";
import { styles } from "./LoginScreen.styles";


export function LoginScreen() {
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate(screen.Profile.register);
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === "android" ? 150 : 0}
      extraHeight={Platform.OS === "android" ? 150 : 0}
      keyboardOpeningTime={0}
      viewIsInsideTabBar={true}
    >
      <ScrollView>
        <Icon
          type="material-community"
          name="arrow-left"
          size={30}
          containerStyle={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1,
            marginTop: 20,
          }}
          onPress={goBack}
        ></Icon>

        <Image
          source={require("../../../../assets/images/koruApp.png")}
          style={styles.Image}
        ></Image>
        <View style={styles.content}>
          <LoginForm></LoginForm>
          <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?
            <Text style={styles.btnRegister} onPress={goToRegister}>
              resgistrarse
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
