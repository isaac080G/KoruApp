import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./AiGeminiHome.styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@rneui/themed";
import RNSpeedometer from "react-native-speedometer";
import { Loading } from "../../components/shared/Loading";
import { auth } from "../../utils/Firebase";

export function AiGeminiHome() {
  const PREDICTION_KEY = "koru-prediction";
  const [prediccion, setPrediccion] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    obtenerAnalisisIA();
  }, []);

  const obtenerAnalisisIA = async (userId) => {
    setloading(true);
    try {
      const cached = await AsyncStorage.getItem(PREDICTION_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        const diff = Date.now() - parsed.timestamp;
        //aqui para cambiar el tiempo del cache
        const hours24 = 10 * 1000; //24 * 60 * 60 * 1000;
        if (diff < hours24) {
          console.log("Predicción desde cache");
          setPrediccion(parsed.data);
          setloading(false);
          return;
        }
      }
      const userId = auth.currentUser.uid;
      const url = `https://us-central1-koruapp-cfcd4.cloudfunctions.net/obtenerPrediccion?userId=${userId}`;

      const respuesta = await fetch(url);

      if (!respuesta.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const datos = await respuesta.json();

      //console.log("Resultado de Gemini:", datos);
      await AsyncStorage.setItem(
        PREDICTION_KEY,
        JSON.stringify({ timestamp: Date.now(), datos }),
      );
      setPrediccion(datos);
      setloading(false);
    } catch (error) {
      console.error("Error al llamar a la función:", error);
    } finally {
      setloading(false);
    }
  };
  console.log("prediccion:", prediccion);

  const valor = prediccion?.probabilidad_ataque
    ? parseInt(prediccion.probabilidad_ataque)
    : 0;

  return (
    <>
      {loading && <Loading show={true} text={"cargando..."}></Loading>}
      {!loading && (
        <View style={styles.recommendationCard}>
          <Text style={{ fontSize: 12, color: "#c6c6c6" }}>
            Probabilidad de padecer ansiedad a lo largo del dia
          </Text>
          <RNSpeedometer
            value={valor}
            size={150}
            minValue={0}
            maxValue={100}
            allowedDecimals={0}
            needleImage={require("../../../assets/images/pngwing.com (30).png")}
            labels={[
              {
                name: "Bajo",
                labelColor: "#22c55e",
                activeBarColor: "#22c55e",
              },
              {
                name: "Medio",
                labelColor: "#eab308",
                activeBarColor: "#eab308",
              },
              {
                name: "Alto",
                labelColor: "#f97316",
                activeBarColor: "#f97316",
              },
              {
                name: "Crítico",
                labelColor: "#ef4444",
                activeBarColor: "#ef4444",
              },
            ]}
          />
          <Text style={styles.cardTitle}>Basado en tu historial:</Text>
          <Text style={styles.cardBody} numberOfLines={5}>
            {prediccion.analisis_tendencia}
          </Text>

          <TouchableOpacity style={styles.startButton}>
            <Icon
              type="material-community"
              name="login"
              color="#8b80f9"
              size={20}
            />
            <Text style={styles.startButtonText}>Todo el resumen</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
