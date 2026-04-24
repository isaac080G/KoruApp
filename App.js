import { NavigationContainer } from "@react-navigation/native";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import {AppNavigation
} from "./src/navigation/Appnavigation/AppNavigation"
import {initFirebase} from "./src/utils"

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}