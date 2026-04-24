import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { styles } from './NameScreen.styles'; 

import { useNavigation } from '@react-navigation/native';

import { screen } from "../../../utils/Screenname";

export const NameScreen = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const ContinueToBirthday = () =>{
    navigation.navigate(screen.Profile.Birthday,{
        userName:name
    })
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.inner}>
        <View style={styles.iconContainer}>
          <Text style={styles.emoji}>👋</Text>
        </View>

        <Text style={styles.title}>¡Hola! ¿Cómo te llamas?</Text>
        <Text style={styles.subtitle}>
          Queremos personalizar tu experiencia de bienestar para que sea única.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu nombre..."
            placeholderTextColor="#A0AEC0"
            value={name}
            onChangeText={setName}
            autoFocus={true}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, !name && styles.buttonDisabled]}
          activeOpacity={0.8}
          disabled={!name}
          onPress={ContinueToBirthday}
        >
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

