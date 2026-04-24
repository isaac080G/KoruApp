import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {ProfileScreen} from "../screens/ProfileScreen"
import {LoginScreen} from "../screens/ProfileScreen/LoginScreen"

import { RegisterScreen } from "../screens/ProfileScreen/RegisterScreen";
import { BirthdayScreen } from "../components/auth/completeRegister/BirthdayScreen";
import { screen } from "../utils";
import {NameScreen} from "../components/auth/completeRegister/NameScreen"

const Stack = createNativeStackNavigator();

export function ProfileStack() {
  return (
    <Stack.Navigator
    screenOptions={{ 
        headerShown: false
      }}>
      <Stack.Screen
        name={screen.Profile.profile}
        component={ProfileScreen}
      ></Stack.Screen>
      <Stack.Screen
        name={screen.Profile.login}
        component={LoginScreen}
        
      ></Stack.Screen>
      <Stack.Screen
        name={screen.Profile.register}
        component={RegisterScreen}
        
      ></Stack.Screen>
      <Stack.Screen
        name={screen.Profile.Birthday}
        component={BirthdayScreen}
        
      ></Stack.Screen>
      <Stack.Screen
        name={screen.Profile.Name}
        component={NameScreen}
        
      ></Stack.Screen>
    </Stack.Navigator>
  );
}