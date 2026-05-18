import { Text, TouchableOpacity, View } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { AiGeminiHome } from "../../components/AI";
import { MoodSelector } from "../../components/Home";
import { Header } from "../../components/Home/Header";
import { screen } from "../../utils";
import { styles } from "./HomeScreen.styles";

import { useCallback, useState } from "react";

import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export function HomeScreen() {
  const navigation = useNavigation();
  const [showBanner, setShowBanner] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkProfile = async () => {
        const auth = getAuth();
        const db = getFirestore();
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await getDoc(doc(db, "usuarios", user.uid));
        setShowBanner(!userDoc.exists());
      };
      checkProfile();
    }, []),
  );

  const gotoAlert = () => {
    navigation.navigate(screen.Alert.tab, {
      screen: screen.Alert.Alert,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {showBanner && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(screen.Profile.tab, {
              screen: screen.Profile.profile,
            })
          }
          style={{
            backgroundColor: "#96d2fe",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 10,
            gap: 10,
          }}
        >
          <Icon
            type="material-community"
            name="account-alert"
            color="#fff"
            size={22}
          />
          <Text style={{ color: "#fff", fontWeight: "600", flex: 1 }}>
            Completa tu perfil para continuar
          </Text>
          <Icon
            type="material-community"
            name="chevron-right"
            color="#fff"
            size={22}
          />
        </TouchableOpacity>
      )}

      <Header />
      <MoodSelector />
      <AiGeminiHome />

      <View style={styles.floatingActionContainer}>
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
