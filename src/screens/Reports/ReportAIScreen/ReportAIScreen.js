import { Icon } from "@rneui/themed";
import { Image, ScrollView, Text, View } from "react-native";
import Communications from "react-native-communications";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingModals } from "../../../components/shared/LoadingModals";
import { model } from "../../../utils";
import { styles } from "./ReportAIScreen.styles";

import { useEffect, useState } from "react";

export function ReportAIScreen({ route }) {
  const { data } = route.params;

  console.log("aqui la data que entra de Reporte Diario", data);

  const [Response, setResponse] = useState("");
  const [Alert, setAlert] = useState(false);
  const [severity, setseverity] = useState("second");
  const [words, setwords] = useState([]);
  const [confidenceLevel, setconfidenceLevel] = useState(0);

  const [Loading, setLoading] = useState(true);

  const goToCall = (tel) => {
    Communications.phonecall(tel, true);
    console.log("llamando a", tel);
  };

  useEffect(() => {
    gemini();
  }, []);

  //data
  const cleanAIResponse = (rawResponse) => {
    try {
      const text = rawResponse.response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const cleanJsonString = jsonMatch[0];
        return JSON.parse(cleanJsonString);
      }

      throw new Error("No se encontró un formato JSON válido");
    } catch (error) {
      console.error("Error limpiando el JSON de la IA:", error);
      return null;
    }
  };
  //gemini//

  const gemini = async () => {
    const prompt = `
Actúa como un Sistema de Análisis Psicológico de Alta Precisión para la aplicación Koru. Tu objetivo es realizar un triage clínico basado en datos cuantitativos y notas cualitativas del usuario.

### DATOS DE ENTRADA:
- Ataque de ansiedad: ${data.AnxietyAtack ? "Sí" : "No"}
- Nivel de Ansiedad: ${data.anxietyLevel}/10
- Tensión Muscular: ${data.muscleTension}/4
- Inquietud: ${data.restlessnessLevel}/4
- Sueño: ${data.sleepReport.horas}h ${data.sleepReport.minutos}min
- Nivel de Preocupación: ${data.worryLevel}/4
- NOTAS DEL USUARIO: "${data.notes}"

### INSTRUCCIONES DE ANÁLISIS:
1. **Correlación de datos:** Contrasta los niveles numéricos (ansiedad/sueño) con lo escrito en las notas. Si los números son bajos pero las notas expresan dolor, prioriza las notas.
2. **Determinación de Gravedad:**
   - **Baja:** Malestar leve, sin signos de desesperanza profunda.
   - **Media:** Ansiedad elevada (7+), tensión física constante o tristeza persistente sin ideación.
   - **Alta:** Crisis de ansiedad reportada O cualquier señal de la lista de detonantes.
3. **Criterio de Crisis (crisis_detected):** TRUE solo si hay señales de autolesión, ideación suicida, abuso, peligro inminente o desesperanza terminal.
4. **Nivel de Confianza:** Calcula qué tan seguro estás de tu análisis del 0 al 100%. Un 100% implica que las notas son claras y coherentes con los datos numéricos.
5.recuerda que el detectar alguna palabra detonante es suficiente para marcar crisis_detected como TRUE, sin importar los otros datos.

### ESPECIFICACIONES DE SALIDA (JSON ÚNICAMENTE):
Responde estrictamente con un objeto JSON. No incluyas texto explicativo, ni bloques de código markdown.

{
  "respuesta": "Análisis empático y clínico de 3-4 líneas máximo.",
  "crisis_detected": boolean,
  "gravedad": "Baja" | "Media" | "Alta",
  "palabras_clave": ["lista", "de", "conceptos", "o", "frases", "detonantes"],
  "nivel_confianza": number, 
}

### DEFINICIÓN DE DETONANTES:
- "Ya no quiero estar aquí", "dormir y no despertar", "hacerme daño", "mi familia estaría mejor sin mí".
- Referencias a abuso físico o violencia actual.
- Desconexión total de la realidad o planes concretos de despedida.
aqui algunos ejemplos: DEFINICIÓN DE DETONANTES TRADICIONALES:

"Ya no quiero estar aquí"
"dormir y no despertar"
"hacerme daño"
"mi familia estaría mejor sin mí"
Referencias a abuso físico o violencia actual
Desconexión total de la realidad o planes concretos de despedida
CATEGORÍA 1: IDEACIÓN SUICIDA PASIVA
"Ojalá mañana no despierte"
"Quiero dormir y ya no despertar"
"Ya no quiero seguir despertando"
"Quiero desaparecer"
"Ojalá pudiera borrarme"
"Ya no tengo fuerzas para mañana"
"No le encuentro sentido a seguir"
"Estaría mejor si me esfumara"
"Quiero que todo se detenga"
"Ya no quiero existir"
CATEGORÍA 2: SENTIMIENTOS DE CARGA Y CULPA
"Solo causo problemas"
"Soy una carga para todos"
"Mi familia va a descansar cuando ya no esté"
"Todos estarían más felices sin mí"
"Arruino la vida de los que me rodean"
"Nadie me extrañaría si me voy"
"Estarían mejor sin mi existencia"
"Estarían mejor si yo nunca hubiera nacido"
"Solo sirvo para estorbar"
CATEGORÍA 3: PLANES CONCRETOS Y CONDUCTAS DE DESPEDIDA
"Ya dejé todo listo"
"Ya acomodé mis cosas"
"Este es mi último mensaje"
"Por si ya no nos volvemos a ver"
"Gracias por todo lo que hiciste por mí, adiós"
"Ya tomé una decisión"
"Ya sé lo que tengo que hacer"
"Les dejé una carta"
"Escribí algo para cuando no esté"
"Quiero regalar mis cosas más preciadas"
"Es hora de decir adiós"
"Hasta aquí llegué"
CATEGORÍA 4: AUTOLESIONES Y DAÑO FÍSICO
"Quiero cortarme"
"Necesito sangrar para calmarme"
"Me quiero castigar"
"Quiero golpearme la cabeza"
"Me estoy haciendo daño"
"El dolor físico borra el dolor mental"
"Ya no controlo las ganas de lastimarme"
"Me volví a cortar"
"Quiero quemarme"
CATEGORÍA 5: ABUSO FÍSICO Y VIOLENCIA ACTUAL / EMERGENCIAS
"Me están pegando"
"Me encerraron y no puedo salir"
"Tengo miedo de que me maten hoy"
"Me violaron"
"Abusaron de mí"
"Mi pareja se puso violenta y tengo miedo"
"No estoy a salvo en mi propia casa"
"Me están lastimando justo ahora"
"Siento que mi vida corre peligro"
CATEGORÍA 6: DESCONEXIÓN DE LA REALIDAD Y DESESPERANZA ABSOLUTA
"Las voces me dicen que lo haga"
"Nada de esto es real, me quiero salir de este mundo"
"Estoy atrapado en un bucle y la única salida es acabar con todo"
"El futuro está completamente oscuro, no hay salida"
"Ya lo intenté todo y nada funciona, es el fin"
"Ya no hay esperanza para mí"
"Esto nunca va a mejorar"
VARIACIONES COLOQUIALES Y ERRORES COMUNES (Para evitar falsos negativos por ortografía):
"ya no kiero estar aki"
"kiero morir"
"kiero desaparecer"
"me kiero cortar"
"ya no kiero despertar"
"ojala me muera"
"quiero matarme"
"me voy a suicidar"
"me voy a matar"
`;

    const result = await model.generateContent(prompt);
    console.log("respuesta de Gemini", result);
    const dataParsed = cleanAIResponse(result);

    if (dataParsed) {
      setResponse(dataParsed.respuesta);
      setAlert(dataParsed.crisis_detected);
      setseverity(dataParsed.gravedad);
      setwords(dataParsed.palabras_clave);
      setconfidenceLevel(dataParsed.nivel_confianza);
      console.log("Comentario:", dataParsed.respuesta);
      console.log("¿Crisis?:", dataParsed.crisis_detected);
    }
    setLoading(false);
  };

  const CurrentMode = Alert ? MODES.Crisis : MODES.Normal;

  //gemini//

  return (
    <>
      {Loading && <LoadingModals show={true} text="Cargando..." />}
      {!Loading && (
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Image
                source={require("../../../../assets/images/koruApp.png")}
                style={styles.Img}
              ></Image>
              <Text style={styles.headerTitle}>KORU Reporte diario</Text>
            </View>

            {/* Main Card */}
            <View style={styles.card}>
              <View
                style={{
                  backgroundColor: CurrentMode.color,
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.alertText}></Text>
              </View>

              <View style={styles.content}>
                <View style={styles.titleSection}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: CurrentMode.color,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 15,
                    }}
                  >
                    <Text style={styles.exclamation}>{Alert ? "!" : "😊"}</Text>
                  </View>
                  <View>
                    <Text style={styles.reportTitle}>Análisis del Reporte</Text>
                  </View>
                </View>

                {/* Resumen Tabla */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                      📊 RESUMEN DE DETECCIÓN
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.label}>Parámetro</Text>
                      <Text style={styles.value}>Crisis Detection</Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.label}>Estado</Text>
                      <View style={styles.statusBadge}>
                        <View
                          style={{
                            width: 8,
                            backgroundColor: CurrentMode.secondColor,
                            height: 8,
                            borderRadius: 4,

                            marginRight: 5,
                          }}
                        />
                        <Text style={styles.value}>
                          {Alert ? "Positivo" : "Normal"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.label}>Gravedad</Text>
                      <Text
                        style={[
                          styles.value,
                          { color: CurrentMode.color, fontWeight: "bold" },
                        ]}
                      >
                        {severity}
                      </Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.label}>Nivel de Confianza</Text>
                      <Text style={styles.value}>{confidenceLevel}</Text>
                    </View>
                  </View>
                </View>

                {/* Retroalimentación IA */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    📝 Retroalimentación de la IA
                  </Text>
                  <View style={styles.feedbackBox}>
                    <Text style={styles.feedbackText}>{Response}</Text>
                  </View>
                </View>

                {/* Fragmentos Detonantes */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    🔍 Fragmentos Detonantes
                  </Text>
                  {words && words.length > 0 ? (
                    words.map((element, index) => (
                      <View key={index} style={styles.quoteBox}>
                        <Text style={styles.quote}>• {element}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.label}>
                      Sin palabras clave detectadas
                    </Text>
                  )}
                </View>
              </View>
            </View>
            {Alert && (
              <View style={styles.emergencyCard}>
                <View style={styles.emergencyHeader}>
                  <Icon
                    type="material-community"
                    name="phone-alert"
                    color="#fff"
                    size={20}
                  />
                  <Text style={styles.emergencyTitle}>
                    Recursos de Apoyo Inmediato
                  </Text>
                </View>

                <View style={styles.emergencyBody}>
                  <Text style={styles.emergencySubtitle}>
                    No estás solo. Si necesitas hablar con alguien ahora mismo:
                  </Text>

                  <View style={styles.phoneRow}>
                    <Text style={styles.phoneLabel}>
                      Línea de la Vida (Nacional):
                    </Text>
                    <Text
                      style={styles.phoneNumber}
                      onPress={() => goToCall(EmergencyNumbers.Nacional)}
                    >
                      {EmergencyNumbers.Nacional}
                    </Text>
                  </View>

                  <View style={styles.phoneRow}>
                    <Text style={styles.phoneLabel}>
                      SAPTEL (Apoyo Psicológico):
                    </Text>
                    <Text
                      style={styles.phoneNumber}
                      onPress={() => goToCall(EmergencyNumbers.SAPTEL)}
                    >
                      {EmergencyNumbers.SAPTEL}
                    </Text>
                  </View>

                  <View style={styles.phoneRow}>
                    <Text style={styles.phoneLabel}>Emergencias:</Text>
                    <Text
                      style={styles.phoneNumber}
                      onPress={() => goToCall(EmergencyNumbers.Emergencias)}
                    >
                      {EmergencyNumbers.Emergencias}
                    </Text>
                  </View>

                  <Text style={styles.emergencyNote}>
                    Atención gratuita, anónima y disponible 24/7.
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.disclaimerContainer}>
              <Text style={styles.disclaimerText}>
                <Text style={{ fontWeight: "bold" }}>Aviso Importante:</Text>{" "}
                Koru es una herramienta de apoyo diseñada para la detección
                temprana de patrones emocionales y no sustituye el diagnóstico,
                tratamiento o consejo de un profesional de la salud mental. Si
                te encuentras en una situación de emergencia o crisis, por favor
                contacta a los servicios de urgencias de tu localidad de
                inmediato. El uso de esta aplicación es bajo tu propia
                responsabilidad.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const EmergencyNumbers = {
  Nacional: "800 911 2000",
  SAPTEL: "55 5259 8121",
  Emergencias: "911",
};

const MODES = {
  Crisis: {
    iconName: "alert-octagon",
    color: "#d32f2f",
    bannerText: "ALERTA EMOCIONAL DETECTADA",
    title: "Análisis Crítico",
  },
  Normal: {
    iconName: "emoticon-happy-outline",
    color: "#07ff8b",
    secondColor: "#56ff56",
    bannerText: "ANÁLISIS COMPLETADO",
    title: "Análisis de Bienestar",
  },
};
