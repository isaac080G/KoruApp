import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading } from "../../components/shared/Loading";
import { auth, db, screen } from "../../utils";
import { styles } from "./MyDiaryStyles";

export function MyDiary() {
  const navigate = useNavigation();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "usuarios", auth.currentUser.uid, "DailyReports"),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((snap) => ({
        id: snap.id,
        ...snap.data(),
        createdAt: snap.data().createdAt?.toDate().toLocaleDateString("es-MX", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }),
      }));
      setEntries(data);
    } catch (error) {
      console.error("Error cargando diario:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const gotoAlert = () => {
    navigate.navigate(screen.Alert.Alert);
  };

  const renderItem = ({ item }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryDay}>{item.createdAt}</Text>
      <View style={styles.cardContent}>
        <Icon
          type="material-community"
          name="emoticon-happy-outline"
          size={50}
          color="#333"
        />
        <Text style={styles.entryText}>{item.notes || "Sin notas"}</Text>
      </View>
    </View>
  );

  if (loading) return <Loading show={true} text="Cargando diario..." />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Diario</Text>
        <View style={styles.dateSelector}>
          <Text style={styles.dateLabel}>
            {new Date().toLocaleDateString("es-MX", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Icon
            type="material-community"
            name="calendar-month-outline"
            size={24}
            color="#333"
          />
        </View>
      </View>

      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#aaa", marginTop: 40 }}>
            No hay registros aún
          </Text>
        }
      />

      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.newRecordButton}>
          <Icon type="material-community" name="plus" color="#fff" size={24} />
          <Text style={styles.newRecordText}>New Record</Text>
        </TouchableOpacity>

        <Icon
          reverse
          type="material-community"
          name="alarm-light"
          color="#FFA318"
          size={35}
          containerStyle={styles.alertBtn}
          onPress={gotoAlert}
        />
      </View>
    </SafeAreaView>
  );
}
