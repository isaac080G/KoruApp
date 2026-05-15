import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 24, // Bajamos de 32 a 24 para que no rompa en dos líneas
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    color: "#333",
  },
  scrollContent: {
    paddingHorizontal: 16, // 16 es el estándar de oro en móviles
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    borderRadius: 16, // Un poco menos curvo para pantallas chicas
    padding: 16, // Reducimos de 20 a 16
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "#fff", // Asegúrate de tener un fondo para que se vea el shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconBox: {
    width: 50, // Antes 90 (muy grande para móvil)
    height: 50, // Antes 60
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    color: "#ffffff",
    textAlign: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  cardTitle: {
    color: "#303030",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 2,
    marginLeft: 4,
  },
  cardDesc: {
    color: "#666",
    fontSize: 12,
    textAlign: "left",
    lineHeight: 16,
  },
  cardSubtitle: {
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "left",

    marginBottom: 2,
  },
  alertBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: "#d32f2f", // Rojo de alerta
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 15,
    marginBottom: 10,
    color: "#838383",
  },
});
