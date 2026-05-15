import { Text, View } from "react-native";
import { styles } from "./AISuggest.styles";

import { Icon } from "@rneui/themed";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db, model } from "../../../utils";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { meanBy } from "lodash";
import { GEMINI_CACHE_KEY } from "../../../utils/storageKeys";

export function AISuggest({ refreshKey }) {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    run();
  }, [refreshKey]);

  async function run() {
    try {
      setLoading(true);

      const cached = await AsyncStorage.getItem(GEMINI_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        const now = Date.now();
        const diff = now - parsed.timestamp;
        //aqui para cambiar el tiempo del cache
        const hours24 = 10 * 1000; //24 * 60 * 60 * 1000;

        if (diff < hours24) {
          console.log(
            "Cache válido, faltan:",
            ((hours24 - diff) / 3600000).toFixed(1),
            "horas",
          );
          setAdvice(parsed.geminiData.respuesta);
          setLoading(false);
          return;
        }
        console.log("Cache expirado, actualizando...");
      }
      const q = query(
        collection(db, "usuarios", auth.currentUser.uid, "DailyReports"),
        orderBy("createdAt", "desc"),
        limit(5),
      );

      const snapshot = await getDocs(q);
      const summary = snapshot.docs.map((doc) => {
        const data = doc.data();
        const hours = parseFloat(data.sleepReport.hours) || 0;
        const min = parseFloat(data.sleepReport.min) || 0;
        const totalHours = hours + min / 60;

        return {
          ...data,
          sleepTotal: totalHours,
        };
      });
      const notes = summary.map((item) => item.notes).filter(Boolean);

      //process data//

      const average = {
        anxietyLevel: meanBy(summary, "anxietyLevel"),
        muscleTension: meanBy(summary, "muscleTension"),
        restlessnessLevel: meanBy(summary, "restlessnessLevel"),
        sleepReport: meanBy(summary, "sleepTotal"),
        socialContext: meanBy(summary, "socialContext"),
        worryLevel: meanBy(summary, "worryLevel"),
      };

      //process data//
      console.log("aqui el summary", summary);

      setLoading(true);
      const prompt = `Actúa como un experto en bienestar emocional. Analiza los siguientes indicadores promedio de los últimos días:
    - Nivel de Ansiedad: ${average.anxietyLevel.toFixed(1)}/10
    - Tensión Muscular: ${average.muscleTension.toFixed(1)}/4
    - Inquietud: ${average.restlessnessLevel.toFixed(1)}/4
    - Calidad de Sueño: ${average.sleepReport.toFixed(1)}/10
    - Contexto Social: ${average.socialContext.toFixed(1)}/10
    - Nivel de Preocupación: ${average.worryLevel.toFixed(1)}/10

    ademas trata de personalizar un poco con estas notas que te doy, de los reportes del usuario
    -notes: ${notes}

    Instrucciones:
    1. Da una recomendación breve, empática y directa (máximo 3 frases).
    2. No menciones que eres una IA o profesional, solo da el consejo.
    3. Invita al usuario a usar los ejercicios que se listan enseguida.
    4. RESPONDE ÚNICAMENTE CON EL OBJETO JSON, SIN NADA MÁS.
    5. NO uses bloques de código, NO uses backticks, NO uses markdown.
    6. El primer carácter de tu respuesta debe ser { y el último }.
    7. explica un poco porque escogiste esas categorias
    y recuerda !RESPONDE ÚNICAMENTE CON EL OBJETO JSON, SIN NADA MÁS.!
    
    {
      "respuesta": "string",
      "categorias": ["solo 2 strings de: breathing, cognitive, mental_distraction, grounding, mindfulness, movement, sensory, visualization"],
    }`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const cleanText = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsedGemini = JSON.parse(cleanText);

      await AsyncStorage.setItem(
        GEMINI_CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          average,
          geminiData: parsedGemini,
          recommendedIds: [],
        }),
      );

      setAdvice(parsedGemini.respuesta);
    } catch (error) {
      console.error("Error en el proceso:", error);
      setAdvice("No pude cargar tus recomendaciones hoy.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.recommendationCard}>
      <Icon
        type="material-community"
        name="emoticon-happy"
        size={30}
        color="#333"
      />
      <Text style={styles.cardTitle}>Basado en tu Semana:</Text>
      <Text style={styles.cardBody}>
        {loading ? "Generando recomendación..." : advice || ""}
      </Text>

      <Text style={styles.startButtonText}>{loading ? "Cargando..." : ""}</Text>
    </View>
  );
}
