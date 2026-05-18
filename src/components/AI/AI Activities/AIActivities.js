import { Icon } from "@rneui/themed";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, model } from "../../../utils";
import { screen } from "../../../utils/Screenname";
import { GEMINI_CACHE_KEY } from "../../../utils/storageKeys";
import { AISuggest } from "../AISuggest/AISuggest";
import { styles } from "./AIActivities.styles";

export function AIActivities({ refreshKey }) {
  const navigation = useNavigation();
  const [ExercisesFinal, setExercisesFinal] = useState([]);

  useEffect(() => {
    verCache();
  }, [refreshKey]);

  async function verCache() {
    const cached = await AsyncStorage.getItem(GEMINI_CACHE_KEY);
    if (!cached) {
      console.log("Cache no listo, reintentando...");
      setTimeout(verCache, 3000);
      return;
    }
    if (cached) {
      const parsed = JSON.parse(cached);
      console.log("=== CACHE ===");
      console.log("Fecha:", new Date(parsed.timestamp).toLocaleString());
      console.log("Promedios:", parsed.average);
      console.log("Gemini respuesta:", parsed.geminiData.respuesta);
      console.log("Categorias:", parsed.geminiData.categorias);

      const q = query(
        collection(db, "exercises"),
        where("category", "in", parsed.geminiData.categorias),
      );
      const snapshot = await getDocs(q);

      const exercises = snapshot.docs.map((snap) => ({
        id: snap.id,
        title: snap.data().title,
        category: snap.data().category,
        tags: snap.data().tags,
      }));

      const prompt = `Analiza estos dos JSON: uno con los ejercicios y otro con el estado del paciente
        ${JSON.stringify(parsed.average)}
        Ejercicios disponibles:
        ${JSON.stringify(exercises)}
        Basándote en la categoría, los tags y el título de los ejercicios, y cruzando esa información con el estado del paciente, devuélveme solamente un array con los ID de los ejercicios que sean más recomendables.
        nada de texto extra solo un array trata de escoger al menos 4 ejercicios 2 de cada categoria
      `;
      const resp = (await model.generateContent(prompt)).response.text();
      console.log("aqui la respuesta de gemini", resp);

      console.log(exercises);
      const cleanResp = resp
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const recommendedIds = JSON.parse(cleanResp);

      const exerciseDetails = await Promise.all(
        recommendedIds.map((id) => getDoc(doc(db, "exercises", id))),
      );
      const finalData = exerciseDetails
        .filter((d) => d.exists())
        .map((d) => ({ id: d.id, ...d.data() }));

      //console.log("Ejercicios finales:", finalData);
      setExercisesFinal(finalData);
    } else {
      console.log("No hay cache guardado");
    }
  }

  const goToExercise = (item, CategoryConfig) => {
    navigation.navigate(screen.Activities.activitie, {
      item,
      CategoryConfig,
    });
  };

  //console.log("ExercisesFinal en render:", ExercisesFinal);
  return (
    <SafeAreaView>
      <Text style={styles.mainTitle}>Actividades</Text>
      <AISuggest refreshKey={refreshKey}></AISuggest>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subTitle}>Actividades Recomendadas por IA</Text>
        {ExercisesFinal.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              { backgroundColor: CategoryConfig[item.category].color },
            ]}
          >
            <View style={styles.iconBox}>
              <Icon
                onPress={() => {
                  goToExercise(item, CategoryConfig[item.category]);
                }}
                iconStyle={styles.icon}
                size={50}
                type="material"
                name={CategoryConfig[item.category].icon}
              ></Icon>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={styles.cardTitle}
                onPress={() => {
                  goToExercise(item, CategoryConfig[item.category]);
                }}
              >
                {item.title}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardSubtitle}>{item.category}</Text>
              <Text style={styles.cardDesc}>
                {"Duracion: " + item.duration_min + " min"}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const CategoryConfig = {
  breathing: {
    color: "#A2D2FF",
    icon: "air",
    label: "Respiración",
  },
  cognitive: {
    color: "#E9C46A",
    icon: "psychology",
    label: "Cognitivo",
  },
  mental_distraction: {
    color: "#CDB4DB",
    icon: "extension",
    label: "Distracción",
  },
  grounding: {
    color: "#B7B7A4",
    icon: "self-improvement",
    label: "Anclaje",
  },
  mindfulness: {
    color: "#B9FBC0",
    icon: "spa",
    label: "Mindfulness",
  },
  sensory: {
    color: "#FFCDB2",
    icon: "fingerprint",
    label: "Sensorial",
  },
  visualization: {
    color: "#FFB7B2",
    icon: "visibility",
    label: "Visualización",
  },
  writing: {
    color: "#b2ffb7",
    icon: "edit",
    label: "Visualización",
  },
  movement: {
    color: "#fbb2ff",
    icon: "waves",
    label: "movement",
  },
};
