import { FlatList, Text, View } from "react-native";

import { Icon } from "@rneui/themed";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, screen } from "../../utils";
import { styles } from "./ActivitiesList.styles";

import { useNavigation } from "@react-navigation/native";
import { Loading } from "../shared";

//aqui tenemos todas las actividades

export function ActivitiesList() {
  const navigation = useNavigation();
  const [exercises, setexercises] = useState([]);
  const [loading, setloading] = useState(true);

  const getData = async () => {
    setloading(true);
    const snapshot = await getDocs(collection(db, "exercises"));

    const data = snapshot.docs.map((snap) => ({
      id: snap.id,
      title: snap.data().title,
      category: snap.data().category,
      tags: snap.data().tags,
      benefits: snap.data().benefits,
      difficulty: snap.data().difficulty,
      duration_min: snap.data().duration_min,
      intensity_level: snap.data().intensity_level,
      steps: snap.data().steps,
    }));
    setexercises(data);

    console.log("aqui estoy we ", exercises);
    setloading(false);
  };

  const goToExercise = (item, CategoryConfig) => {
    navigation.navigate(screen.Activities.activitie, {
      item,
      CategoryConfig,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      {loading ? (
        <Loading show={true} text={"cargando ejercicios"}></Loading>
      ) : (
        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={exercises}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListHeaderComponent={
            <Text style={styles.subTitle}>Todas las Actividades</Text>
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                { backgroundColor: CategoryConfig[item.category]?.color },
              ]}
            >
              <View style={styles.iconBox}>
                <Icon
                  onPress={() =>
                    goToExercise(item, CategoryConfig[item.category])
                  }
                  iconStyle={styles.icon}
                  size={36}
                  type="material"
                  name={CategoryConfig[item.category]?.icon}
                />
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={styles.cardTitle}
                  numberOfLines={1}
                  onPress={() =>
                    goToExercise(item, CategoryConfig[item.category])
                  }
                >
                  {item.title}
                </Text>
                <Text style={styles.cardSubtitle} numberOfLines={1}>
                  {item.category}
                </Text>
                <Text style={styles.cardDesc}>
                  {"⏱ " + item.duration_min + " min"}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
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
  movement: {
    color: "#fbb2ff",
    icon: "waves",
    label: "movement",
  },
  writing: {
    color: "#b2ffb7",
    icon: "edit",
    label: "Visualización",
  },
};
