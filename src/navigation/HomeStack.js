import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {HomeScreen} from "../screens/HomeScreen/HomeScreen"

import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
    screenOptions={{ 
        headerShown: false
      }}>
      <Stack.Screen
        name={screen.Home.home}
        component={HomeScreen}
    
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
