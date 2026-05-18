import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DailyReportScreen } from "../screens/Reports/DailyReportScreen";
import { ReportAIScreen } from "../screens/Reports/ReportAIScreen/ReportAIScreen";

import { CompleteReportAIScreen } from "../screens/ReportAI/CompleteReportAIScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function ReportStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={screen.Reports.DailyReport}
        component={DailyReportScreen}
      ></Stack.Screen>
      <Stack.Screen
        name={screen.Reports.ReportAIScreen}
        component={ReportAIScreen}
      ></Stack.Screen>
      <Stack.Screen
        name={screen.Reports.completeReportAIScreen}
        component={CompleteReportAIScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
