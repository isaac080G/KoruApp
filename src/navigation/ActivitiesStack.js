import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ActivitiesScreen } from "../screens/Activities/";
import { ActivitieSreen } from "../screens/ActivitieScreen/ActivitieSreen";

import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function ActivitiesStack() {
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
      <Stack.Screen
        name={screen.Activities.activitie}
        component={ActivitieSreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
