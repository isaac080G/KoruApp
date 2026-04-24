import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fbff', // Un fondo azulado muy tenue como en tu foto
  },
  avatar: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTextContainer: {
    marginLeft: 15, // Espacio entre el avatar y el texto
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  recommendationCard: {
    backgroundColor: '#eee9f2', // El color lila tenue de tu imagen
    marginHorizontal: 30,
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  cardBody: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  startButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#6c5ce7',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
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
},floatingActionContainer: {
    position: 'absolute',
    bottom: 110, 
    right: 20,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 20, 
  },
  
  
  motivationBubble: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    maxWidth: 180, 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  motivationBubbleText: {
    fontSize: 13,
    color: '#444',
    fontStyle: 'italic',
    textAlign: 'center',
  },

  
  alertBtn: {
    margin: 0,
    borderWidth: 2,
    borderColor: '#ffffff', 
    borderRadius: 50,
  }

});