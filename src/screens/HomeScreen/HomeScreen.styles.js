import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fbff", // Un fondo azulado muy tenue como en tu foto
  },
  avatar: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTextContainer: {
    marginLeft: 15, // Espacio entre el avatar y el texto
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  btnContainer: {
    position: "absolute",
    bottom: 100,
    right: 20,
    elevation: 10,
    zIndex: 10,
  },
  content: {
    flex: 1,
  },
  floatingActionContainer: {
    position: "absolute",
    bottom: 110,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 20,
  },

  motivationBubble: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    maxWidth: 180,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  motivationBubbleText: {
    fontSize: 13,
    color: "#444",
    fontStyle: "italic",
    textAlign: "center",
  },

  alertBtn: {
    margin: 0,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 50,
  },
});
