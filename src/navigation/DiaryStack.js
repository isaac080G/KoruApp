

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyDiary } from "../screens/Mydiary/MyDiary"
import { screen } from "../utils";



const Stack=createNativeStackNavigator();

export function DiaryStack() {
  return (
    <Stack.Navigator
        screenOptions={{ 
            headerShown: false
          }}>
          <Stack.Screen
            name={screen.Diary.diary}
            component={MyDiary}
          ></Stack.Screen>
        </Stack.Navigator>
  )
}
