import { View, Text } from 'react-native'
import React from 'react'
import {styles} from "./NotificationScreenstyles"

import { Avatar } from '@rneui/base'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { Icon } from '@rneui/themed';

export function NotificationScreen() {
  const notifications = [
    { id: '1', title: '¡Felicidades!', msg: 'Completaste 3 días seguidos de meditación', color: '#8fb18c', icon: 'trophy-outline' },
    { id: '2', title: 'Conexión exitosa', msg: 'Ya puedes conectar tu Huawei Watch GT 3 Pro para medir tu ritmo cardíaco', color: '#f28b7d', icon: 'star-four-points-outline' },
    { id: '3', title: 'Meta cumplida', msg: 'Lograste tu meta de 8 horas de sueño anoche', color: '#f5b7b1', icon: 'moon-waning-crescent' },
    { id: '4', title: 'Meta de sueño', msg: 'Practicaste tu meta de 8 horas de sueño anoche', color: '#a3b18a', icon: 'pine-tree' },
    { id: '5', title: 'Bienestar', msg: 'Practicaste la respiración consciente hoy. ¡Sigue así!', color: '#a3b18a', icon: 'leaf-circle-outline' },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.cardContainer, { borderLeftColor: item.color }]}>
      <Avatar
        size={45}
        rounded
        icon={{ name: item.icon, type: 'material-community', color: '#fff' }}
        containerStyle={{ backgroundColor: item.color }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardMessage}>{item.msg}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Novedades</Text>
        <Icon type="material-community" name="bell-outline" size={28} color="#666" />
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}