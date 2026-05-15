import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },
  alertBtn: {
    margin: 0,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 50,
    position: "absolute", // ✅ posición absoluta
    bottom: 110, // ✅ distancia desde abajo
    right: 30,
  },
});
