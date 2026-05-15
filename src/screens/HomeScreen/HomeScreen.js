import { Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { AiGeminiHome } from "../../components/AI";
import { MoodSelector } from "../../components/Home";
import { Header } from "../../components/Home/Header";
import { screen } from "../../utils";
import { styles } from "./HomeScreen.styles";

export function HomeScreen() {
  const navigation = useNavigation();

  const gotoAlert = () => {
    navigation.navigate(screen.Alert.tab, {
      screen: screen.Alert.Alert,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header></Header>

      <MoodSelector></MoodSelector>

      <AiGeminiHome></AiGeminiHome>

      <View style={styles.floatingActionContainer}>
        {/* Label Motivador a la izquierda */}
        <View style={styles.motivationBubble}>
          <Text style={styles.motivationBubbleText} numberOfLines={2}>
            Tu salud mental es prioridad
          </Text>
        </View>
        <Icon
          reverse
          type="material-community"
          name="alarm-light"
          color="#FFA318"
          size={35}
          containerStyle={styles.alertBtn}
          onPress={gotoAlert}
        />
      </View>
    </SafeAreaView>
  );
}
