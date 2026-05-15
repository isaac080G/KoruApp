import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AIActivities } from "../../components/AI/AI Activities";
import { screen } from "../../utils/Screenname";
import { styles } from "./ActivitiesScreen.styles";

import { ScrollView } from "react-native";
import { ActivitiesList } from "../../components/activitiesList/ActivitiesList";

import { useCallback, useState } from "react";

export function ActivitiesScreen() {
  const navigation = useNavigation();
  const [refreshKey, setRefreshKey] = useState(0);

  const gotoAlert = () => {
    navigation.navigate(screen.Alert.tab, {
      screen: screen.Alert.Alert,
    });
  };
  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prev) => prev + 1);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AIActivities refreshKey={refreshKey}></AIActivities>
        <ActivitiesList></ActivitiesList>
      </ScrollView>
      <Icon
        reverse
        type="material-community"
        name="alarm-light"
        color="#FFA318"
        size={35}
        containerStyle={styles.alertBtn}
        onPress={gotoAlert}
      />
    </SafeAreaView>
  );
}
