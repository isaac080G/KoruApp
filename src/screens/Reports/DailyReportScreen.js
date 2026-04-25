import { Text, ScrollView,View} from 'react-native'
import { useState,useEffect } from 'react' 
import {Icon,Input,Button,ButtonGroup} from "@rneui/themed"

import React from 'react'
import {SafeAreaView } from 'react-native-safe-area-context'
import {styles} from "./DailyReport.styles"
import { Slider } from '@rneui/themed'
import CircularProgress from 'react-native-circular-progress-indicator';

import  Toast  from "react-native-toast-message"
import {useFormik} from "formik"
import {initialValues,validationSchema} from "./DailyReport.Data"
import {auth,db} from "../../utils/Firebase"
import { addDoc, collection} from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../././../utils/Screenname'


export function DailyReportScreen({route}) {
    const {selectedMood}=route.params 
    const navigation= useNavigation()



    // aqui esta el formik


    const formik = useFormik({
      initialValues:initialValues(),
      validationSchema:validationSchema(),
      onSubmit: async (formValue) => {
        console.log(formValue)
        try{
          const DocID = auth.currentUser.uid
          const reportRef = collection(db,"usuarios",DocID,"DailyReports")

          await addDoc(reportRef,{
            createdAt: new Date(),
            userID:DocID,
            anxietyLevel:anxietyLevel,
            worryLevel:worryLevel,
            restlessnessLevel:restlessnessLevel,
            muscleTension:muscleTension,
            sleepReport:{
              hours:formValue.horas,
              min: formValue.min
            },
            socialContext:socialContext,
            notes:notes
          })
          Toast.show({
            text:"Dia Capturado con exito :)",
            position:"top",
            duration:4000
          })
          //navigation.navigate{screen.}
         
        }catch(error){
          Toast.show({
            text:"el Documento no ha podido crearse con exito",
            position:"top",
            duration:4000
            
          })

        }
        
      }

    })


    //Data

    const [anxietyLevel, setAnxietyLevel] = useState(null);

    const [notes, setNotes] = useState('');

    const [worryLevel, setworryLevel] = useState(null)

    const [restlessnessLevel, setrestlessnessLevel] = useState(null)

    const [muscleTension, setmuscleTension] = useState(null)
    const [socialContext, setsocialContext] = useState(null)




    //Data


    //aux
  
  const moodConfig = {
    0: { emoji: '😢', label: 'muy mal' },
  1: { emoji: '😐',  label: 'neutral' },
  2: { emoji: '🙂',  label: 'bien' },
  3: { emoji: '😁',  label: 'excelente' },
  };

  const currentMood = moodConfig[selectedMood];

  const currentColor = {
  0:  { emoji: '😊', color: '#4ADE80' },
  1:  { emoji: '🙂', color: '#86EFAC' },
  2:  { emoji: '😐', color: '#BEF264' },
  3:  { emoji: '🤔', color: '#FDE047' },
  4:  { emoji: '🤨', color: '#FACC15' },
  5:  { emoji: '😟', color: '#FB923C' },
  6:  { emoji: '😥', color: '#F87171' },
  7:  { emoji: '😨', color: '#EF4444' },
  8:  { emoji: '😫', color: '#DC2626' },
  9: { emoji: '😱', color: '#991B1B' },
};
  const options=["solo","en publico" ]

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header con el resumen del estado previo */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Text style={{fontSize:90}}>
            {currentMood.emoji}
          </Text>
        </View>
        <Text style={styles.mainTitle}>Reporte Diario de Ansiedad</Text>
        <Text style={styles.subtitle}>Como te sientes {currentMood.label}, cuéntanos más:</Text>
      </View>


      <View style={styles.formCard}>
        
        <Text style={styles.label}>¿Cuál es tu nivel de ansiedad actual?</Text>
        <View style={styles.sliderContainer}>
            
            
            
        </View>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <CircularProgress
    
                value={anxietyLevel+1}
                radius={100}
                duration={500} 
                progressValueColor={currentColor[anxietyLevel]?.color}
                maxValue={10}
                title={'Nivel'+currentColor[anxietyLevel]?.emoji}
                titleColor={'#718096'}
                titleStyle={{ fontWeight: 'bold' }}
                activeStrokeColor={currentColor[anxietyLevel]?.color}
                inActiveStrokeColor={'#EDF2F7'}

      
            />
        </View>


        <View>
            <ButtonGroup  selectedButtonStyle={{ backgroundColor: currentColor[anxietyLevel]?.color }}  buttonContainerStyle={
                {
                    borderWidth: 0,
                }
                
            } 
            containerStyle={{backgroundColor: 'transparent', 
    borderWidth: 0,}}innerBorderStyle={{ width: 0 }} textStyle={{fontSize:10,fontWeight: 'bold'}}
                onPress={(value)=>{setAnxietyLevel(value)}}
                selectedIndex={anxietyLevel}
                buttons={['1', '2', '3', '4','5','6','7','8','9','10']}
                sele
            ></ButtonGroup>
        </View>


        <Text style={styles.helperText}>1 (Leve) - 10 (Extrema)</Text>


        {/* primer botonera de preocupacion */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text style={{flex:1}}>Preocupacion excesiva</Text>
            <ButtonGroup  selectedButtonStyle={styles.selectedButton} containerStyle={styles.buttonGroupContainer} buttonStyle={styles.individualButton} textStyle={{fontSize:20,fontWeight: 'bold'}}
                onPress={(value)=>{setworryLevel(value)}}
                selectedIndex={worryLevel}
                buttons={['1', '2', '3', '4']}
                sele
            ></ButtonGroup>
        </View>

        {/* segunda botonera */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text style={{flex:1}}>Inquietud fisica</Text>
            <ButtonGroup  selectedButtonStyle={styles.selectedButton} containerStyle={styles.buttonGroupContainer} buttonStyle={styles.individualButton} textStyle={{fontSize:20,fontWeight: 'bold'}}
                onPress={(value)=>{setrestlessnessLevel(value)}}
                selectedIndex={restlessnessLevel}
                buttons={['1', '2', '3', '4']}
                sele
            ></ButtonGroup>
        </View>
        {/* tercer botonera  */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text style={{flex:1}}>tension muscular</Text>
            <ButtonGroup  selectedButtonStyle={styles.selectedButton} containerStyle={styles.buttonGroupContainer} buttonStyle={styles.individualButton} textStyle={{fontSize:20,fontWeight: 'bold'}}
                onPress={(value)=>{setmuscleTension(value)}}
                selectedIndex={muscleTension}
                buttons={['1', '2', '3', '4']}
                
            ></ButtonGroup>
        </View>
        <Text style={styles.helperText}>1(nunca)  2(A menudo)  3(Frecuente)  4(simpre)</Text>

        {/* aqui capturamos la calidad del sueño */}
        <Text style={styles.label}>Calidad del sueño</Text>
        <View style={{flexDirection:"row"}}>
            <Input
              placeholder='Horas de sueño'
              containerStyle={{flex:1}}
              keyboardType='numeric'
              rightIcon={
                <Icon
                type='material-community'
                name="clock"
                >

                </Icon>
              }
              
              onChangeText={(text) => formik.setFieldValue("horas", text)}
              errorMessage={formik.errors.horas}
              >
            </Input>
            <Input
              placeholder='minutos'
              containerStyle={{flex:1}}
              keyboardType='numeric'
              rightIcon={
                <Icon
                type='material-community'
                name="clock"
                >
                </Icon>
              }
              onChangeText={(text) => formik.setFieldValue("min", text)}
              errorMessage={formik.errors.min}
              >
            </Input>
        </View>

        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text style={{flex:1}}>¿Cómo fue tu entorno social?</Text>
            <ButtonGroup  selectedButtonStyle={styles.selectedButton} containerStyle={styles.buttonGroupContainer} buttonStyle={styles.individualButton} textStyle={{fontSize:20,fontWeight: 'bold'}}
                onPress={(index) => {formik.setFieldValue("socialContext", options[index]);setsocialContext(index)}}
                buttons={["Solo","En Publico"]}
                selectedIndex={socialContext}
            ></ButtonGroup>
        </View>
          
          
        </View>
        




        {/* Notas Adicionales */}
        <Text style={[styles.label, { marginTop: 30 }]}>Notas adicionales (Opcional)</Text>
        
        <Input
          style={styles.textArea}
          placeholder="Si tuvieras que señalar un evento o pensamiento que inició esto, ¿cuál sería?"
          
          numberOfLines={2}
          value={notes}
          onChangeText={setNotes}
          placeholderTextColor="#A0AEC0"
        />

        {/* Botón de Envío */}
        <Button 
          style={styles.sendButton}
          activeOpacity={0.8}
          onPress={()=>{
            formik.handleSubmit(),
            console.log("Errores de Formik:", formik.errors);
          }
            
          }
          loading={formik.isSubmitting}
          
        >
          <Text style={styles.sendButtonText}>ENVIAR REPORTE</Text>
        </Button>
      </View>
    </ScrollView>
  );
}