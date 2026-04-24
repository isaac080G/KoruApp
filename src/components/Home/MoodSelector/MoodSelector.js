import { View, Text } from 'react-native'
import { Icon } from '@rneui/themed'
import React, { useState } from 'react'
import {styles} from "./MoodSelector.styles"

import { useNavigation } from '@react-navigation/native'
import {screen} from "../../../utils/Screenname"


export function MoodSelector() {

    const navigation = useNavigation()
    const handleMoodPress = (selectedMood) => {
        navigation.navigate(screen.Reports.tab,{
            screen:screen.Reports.DailyReport,
            params: { selectedMood: selectedMood }
        })
        
    }

  return (
    <View style={styles.moodContainer}>
        <Icon type="material-community" name="emoticon-outline" color="#8b80f9" size={50} onPress={() => handleMoodPress(3)} />
        <Icon type="material-community" name="emoticon-happy-outline" color="#5cb85c" size={50} onPress={() => handleMoodPress(2)} />
        <Icon type="material-community" name="emoticon-neutral-outline" color="#f0ad4e" size={50} onPress={() => handleMoodPress(1)} />
        <Icon type="material-community" name="emoticon-sad-outline" color="#d9534f" size={50} onPress={() => handleMoodPress(0)} />
      </View>
  )
}