import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import {NotificationScreen} from "../screens/Notifications"

const Stack = createNativeStackNavigator();

export function NotificationStack() {
  return (
    <Stack.Navigator screenOptions={{ 
            headerShown: false
          }}>
      <Stack.Screen
        name={screen.Notifications.notification}
        component={NotificationScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}