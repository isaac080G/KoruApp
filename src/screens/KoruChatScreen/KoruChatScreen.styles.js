import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    maxWidth: Dimensions.get("window").width,
    maxHeight: Dimensions.get("window").height,
    marginBottom: 100,
  },
  centerContainer: {
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  mainLogoAnimated: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    shadowColor: "#96d2fe",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  statusText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "300",
    color: "#4a4a4a",
    letterSpacing: 1,
  },
  controlsContainer: {
    width: "100%",
    alignItems: "center",
  },
  micButton: {
    backgroundColor: "#96d2fe",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  micButtonActive: {
    backgroundColor: "#ff6b6b",
    transform: [{ scale: 1.1 }],
  },
  connectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    margin: 12,
    gap: 6,
  },
  connectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotConnected: { backgroundColor: "#4ade80" },
  dotError: { backgroundColor: "#f87171" },
  dotConnecting: { backgroundColor: "#facc15" },
  connectionLabel: { fontSize: 12, color: "#888" },

  messagesContainer: { flex: 7, width: "100%", height: "100%" },
  messagesContent: { padding: 16, gap: 8 },

  messageBubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 12,
  },
  bubbleUser: { alignSelf: "flex-end", backgroundColor: "#your-brand-color" },
  bubbleAssistant: { alignSelf: "flex-start", backgroundColor: "#2a2a2a" },

  messageText: { fontSize: 15, lineHeight: 22 },
  messageTextUser: { color: "#7fcaad" },
  messageTextAssistant: { color: "#f0f0f0" },

  streamingCursor: { color: "#aaa" },
  micButtonDisabled: { opacity: 0.4 },
});
