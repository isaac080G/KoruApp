
import { screen } from '../utils/Screenname' 
import {AlertScreen} from "../screens/Alert/alertScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export function AlertStack() {
  return (
    <Stack.Navigator screenOptions={{ 
            headerShown: false
          }}>
      <Stack.Screen
        name={screen.Alert.Alert}
        component={AlertScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}