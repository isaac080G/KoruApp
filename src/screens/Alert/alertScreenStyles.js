import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a', // Fondo oscuro para el efecto neón
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  warningTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ff4d4d', // Rojo vibrante
    marginBottom: 50,
    letterSpacing: 3,
    textShadowColor: 'rgba(255, 77, 77, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  timerOuterCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: '#ff4d4d',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    // Brillo exterior (Glow)
    shadowColor: "#ff4d4d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
  },
  timerInnerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    borderColor: '#ff4d4d',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 77, 77, 0.1)',
  },
  timerText: {
    fontSize: 90,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#ff4d4d',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 20,
  },
  cancelButton: {
    backgroundColor: '#333',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 35,
    marginBottom: 25,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  callNowButton: {
    flexDirection: 'row',
    backgroundColor: '#2ecc71', // Verde para "Llamar ahora"
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  callNowText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '700',
    fontSize: 16,
  }
});