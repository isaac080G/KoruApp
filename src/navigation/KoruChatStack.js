import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { KoruChatScreen } from "../screens/KoruChatScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function KoruChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={screen.KoruChat.KoruChat}
        component={KoruChatScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
