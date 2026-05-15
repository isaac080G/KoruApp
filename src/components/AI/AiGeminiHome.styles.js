import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  recommendationCard: {
    backgroundColor: "#eee9f2", // El color lila tenue de tu imagen
    marginHorizontal: 30,
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
  cardBody: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  startButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  tartButtonText: {
    color: "#6c5ce7",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
});
