import { Icon } from "@rneui/themed";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ActivitieSreen.styles";

export function ActivitieSreen({ route }) {
  const { item, CategoryConfig } = route.params;

  const exercise = {
    title: item.title,
    category: item.category,
    difficulty: item.difficulty,
    duration_min: item.duration_min,
    benefits: item.benefits,
    steps: item.steps,
  };

  const categoryColor = CategoryConfig.color;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: categoryColor }]}>
          <Icon
            name={CategoryConfig.icon}
            type="material"
            size={60}
            color="white"
          />
          <Text style={styles.title}>{exercise.title}</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Visualización</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{exercise.difficulty}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{exercise.duration_min} min</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Beneficios</Text>
          <Text style={styles.benefitsText}>{exercise.benefits}</Text>

          <Text style={styles.sectionTitle}>Pasos a seguir</Text>
          {exercise.steps.map((step, index) => (
            <View key={index} style={styles.stepCard}>
              <View
                style={[styles.stepNumber, { backgroundColor: categoryColor }]}
              >
                <Text style={styles.stepNumberText}>{index + 1}.</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>COMENZAR AHORA</Text>
      </TouchableOpacity>
    </View>
  );
}
