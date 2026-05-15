import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ActivitiesScreen } from "../screens/Activities/";

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
        name={screen.Activities.activities}
        component={ActivitiesScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
