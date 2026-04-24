import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {DailyReportScreen} from  "../screens/Reports/DailyReportScreen"

import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function ReportStack() {
  return (
    <Stack.Navigator
    screenOptions={{ 
        headerShown: false
      }}>
      <Stack.Screen
        name={screen.Reports.DailyReport}
        component={DailyReportScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}