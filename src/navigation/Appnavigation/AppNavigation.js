import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { screen } from "../../utils";
import { ActivitiesStack } from "../ActivitiesStack";
import { AlertStack } from "../AlertStack";
import { DiaryStack } from "../DiaryStack";
import { HomeStack } from "../HomeStack";
import { NotificationStack } from "../NotificationStack";
import { styles } from "./AppNavigationStiles";

import { Icon } from "@rneui/themed";

import { ProfileStack } from "../ProfileStack";
import { ReportStack } from "../ReportStack";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../../components/auth/useAuth";
import { Loading } from "../../components/shared";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  const { user, loading } = useAuth();
  const Stack = createNativeStackNavigator();

  if (loading) return <Loading show={true} />;

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileStack" component={ProfileStack} />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#96d2fe",
        tabBarInactiveTintColor: "#a6a6a6",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),

        tabBarStyle: styles.tabBar,

        bottomAccessory: () => (
          <View style={styles.accessoryContainer}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#eee",
                borderRadius: 20,
              }}
            />
            <Text style={styles.accessoryText} numberOfLines={1}></Text>
            <Icon type="material-community" name="play" size={28} />
            <Icon type="material-community" name="fast-forward" size={28} />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name={screen.Home.tab}
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name={screen.Activities.tab}
        component={ActivitiesStack}
        options={{ title: "Activities" }}
      />
      <Tab.Screen
        name={screen.Diary.tab}
        component={DiaryStack}
        options={{ title: "My diary" }}
      />

      <Tab.Screen
        name={screen.Notifications.tab}
        component={NotificationStack}
        options={{ title: "Updates" }}
      />
      <Tab.Screen
        name={screen.Alert.tab}
        component={AlertStack}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={screen.Profile.tab}
        component={ProfileStack}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={screen.Reports.tab}
        component={ReportStack}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === screen.Home.tab) {
    iconName = "emoticon-happy-outline";
  }
  if (route.name === screen.Diary.tab) {
    iconName = "book-open-variant";
  }
  if (route.name === screen.Activities.tab) {
    iconName = "tailwind";
  }
  if (route.name === screen.Notifications.tab) {
    iconName = "bell-outline";
  }
  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}
