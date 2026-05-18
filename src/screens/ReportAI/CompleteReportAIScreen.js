// KoruApp/screens/ReportAIScreen/ReportAIScreen.js
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./CompleteReportAIScreen.styles";

const RISK_CONFIG = {
  Bajo: {
    color: "#a8d5b5",
    bg: "#f0faf3",
    icon: "shield-check",
    label: "Riesgo Bajo",
  },
  Medio: {
    color: "#f5c97a",
    bg: "#fffbf0",
    icon: "shield-alert",
    label: "Riesgo Medio",
  },
  Alto: {
    color: "#f5a0a0",
    bg: "#fff5f5",
    icon: "shield-off",
    label: "Riesgo Alto",
  },
};

export function CompleteReportAIScreen({ route }) {
  const navigation = useNavigation();
  const { data } = route.params ?? {};
  console.log("=== CompleteReportAIScreen ===");
  console.log("Datos recibidos:", data);

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>No hay datos disponibles.</Text>
      </SafeAreaView>
    );
  }

  const risk = RISK_CONFIG[data.nivel_riesgo] ?? RISK_CONFIG["Medio"];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color="#5a5a7a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resumen de Bienestar</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta de riesgo principal */}
        <View style={[styles.riskCard, { backgroundColor: risk.bg }]}>
          <View
            style={[
              styles.riskIconCircle,
              { backgroundColor: risk.color + "33" },
            ]}
          >
            <MaterialCommunityIcons
              name={risk.icon}
              size={38}
              color={risk.color}
            />
          </View>
          <Text style={styles.riskLabel}>{risk.label}</Text>
          <Text style={[styles.riskProbability, { color: risk.color }]}>
            {data.probabilidad_ataque}
          </Text>
          <Text style={styles.riskSubtitle}>
            probabilidad de pico de ansiedad
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionDot, { backgroundColor: "#b3c8f5" }]} />
            <Text style={styles.sectionTitle}>
              Análisis de los últimos días
            </Text>
          </View>
          <Text style={styles.sectionBody}>{data.analisis_tendencia}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionDot, { backgroundColor: "#a8d5b5" }]} />
            <Text style={styles.sectionTitle}>Recomendación preventiva</Text>
          </View>
          <View style={styles.recommendationBox}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={20}
              color="#a8d5b5"
              style={{ marginTop: 2 }}
            />
            <Text style={styles.recommendationText}>
              {data.recomendacion_preventiva}
            </Text>
          </View>
        </View>

        <Text style={styles.footerNote}>
          Este análisis está basado en tus registros recientes y es orientativo.
          No sustituye la opinión de un profesional de salud mental.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
