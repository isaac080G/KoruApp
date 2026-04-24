import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import {styles} from "./MyDiaryStyles"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../utils';

export  function MyDiary() {
  const navigate= useNavigation()
  const entries = [
    { id: '1', day: 'Hoy', text: 'lorenipsusiddvgvwiuegvyugvygauydvgaivgyyadgvssdvasddvasdvds vsasdvv' },
    { id: '2', day: 'Jueves', text: 'lorenipsusiddvgvwiuegvyugvygauydvgaivgyyadgvssdvasddvasdvds vsasdvv' },
    { id: '3', day: 'Miercoles', text: 'lorenipsusiddvgvwiuegvyugvygauydvgaivgyyadgvssdvasddvasdvds vsasdvv' },
  ];

  const gotoAlert=()=>{
    navigate.navigate(screen.Alert.Alert)
  }

  const renderItem = ({ item }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryDay}>{item.day}</Text>
      <View style={styles.cardContent}>
        <Icon type="material-community" name="emoticon-happy-outline" size={50} color="#333" />
        <Text style={styles.entryText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Diario</Text>
        <View style={styles.dateSelector}>
          <Text style={styles.dateLabel}>date</Text>
          <Icon type="material-community" name="calendar-month-outline" size={24} color="#333" />
        </View>
      </View>

      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.newRecordButton}>
          <Icon type="material-community" name="plus" color="#fff" size={24} />
          <Text style={styles.newRecordText}>New Record</Text>
        </TouchableOpacity>

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