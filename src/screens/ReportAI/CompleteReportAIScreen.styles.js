// KoruApp/screens/ReportAIScreen/ReportAIScreen.styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7fc",
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#f7f7fc",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eeeef6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3a3a5c",
    letterSpacing: 0.3,
  },

  // ── Scroll ───────────────────────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },

  // ── Tarjeta de riesgo ────────────────────────────────────────────────────────
  riskCard: {
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 8,
    shadowColor: "#c0c0d8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 3,
  },
  riskIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  riskLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#8888aa",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  riskProbability: {
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: -1,
  },
  riskSubtitle: {
    fontSize: 13,
    color: "#9999bb",
    textAlign: "center",
  },

  // ── Secciones ────────────────────────────────────────────────────────────────
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7070a0",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  sectionBody: {
    fontSize: 15,
    color: "#4a4a6a",
    lineHeight: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#c0c0d8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },

  // ── Recomendación ─────────────────────────────────────────────────────────────
  recommendationBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#c0c0d8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: 15,
    color: "#4a4a6a",
    lineHeight: 24,
  },

  // ── Divisor ───────────────────────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: "#e8e8f0",
    marginVertical: 4,
  },

  // ── Footer ────────────────────────────────────────────────────────────────────
  footerNote: {
    fontSize: 12,
    color: "#aaaac0",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
    marginTop: 8,
  },

  // ── Empty state ───────────────────────────────────────────────────────────────
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 80,
    fontSize: 15,
  },
});
