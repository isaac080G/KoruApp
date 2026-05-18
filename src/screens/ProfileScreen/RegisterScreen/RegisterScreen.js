import { useNavigation } from "@react-navigation/native";
import { Icon, Image } from "@rneui/themed";
import { Platform, ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { RegisterForm } from "../../../components/auth/RegisterForm";
import { styles } from "./RegisterScreen.styles";

export function RegisterScreen() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.OS === "android" ? 150 : 0}
        extraHeight={Platform.OS === "android" ? 150 : 0}
        keyboardOpeningTime={0}
        viewIsInsideTabBar={true}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <Icon
            type="material-design"
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              zIndex: 1,
              color: "#000000",
            }}
            name="arrow-left"
            size={30}
            onPress={goBack}
          ></Icon>
          <Image
            source={require("../../../../assets/images/koruApp.png")}
            style={styles.Image}
          ></Image>
          <View style={styles.content}>
            <RegisterForm />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}
