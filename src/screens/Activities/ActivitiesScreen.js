import { View, Text } from 'react-native'
import { Icon } from '@rneui/themed';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import {styles} from "./ActivitiesScreen.styles"
import {useNavigation} from "@react-navigation/native"
import {screen} from "../../utils/Screenname"

export function ActivitiesScreen() {
    const navigation = useNavigation()
  const activities = [
    { id: 1, title: 'Especialmente para ti hoy', desc: 'loremnipsusiddvgvwiuegvyugv ygauydvgaivgyyadgvssdvasd dvasdvdsvsasdvv', color: '#a3b18a', icon: 'tailwind' },
    { id: 2, title: 'Especialmente para ti hoy', desc: 'loremnipsusiddvgvwiuegvyugv ygauydvgaivgyyadgvssdvasd dvasdvdsvsasdvv', color: '#a2d2ff', icon: 'tailwind' },
    { id: 3, title: 'Especialmente para ti hoy', desc: 'loremnipsusiddvgvwiuegvyugv ygauydvgaivgyyadgvssdvasd dvasdvdsvsasdvv', color: '#ffafcc', icon: 'tailwind' },
  ];
  const gotoAlert=()=>{
    navigation.navigate(screen.Alert.tab)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Actividades</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activities.map((item) => (
          <View key={item.id} style={[styles.card, { backgroundColor: item.color }]}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.fabContainer}>
        <Icon
          reverse
          type="material-community"
          name="alarm-light"
          color="#FFA318"
          size={35}
          containerStyle={styles.alertBtn}
          onPress={gotoAlert}
        />
      </View>
    </SafeAreaView>
  );
}