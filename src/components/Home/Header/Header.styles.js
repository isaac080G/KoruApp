import { StyleSheet,Platform} from "react-native";

export const styles =  StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30, // Despega el avatar de la izquierda
        marginTop: Platform.OS === 'android' ? 40 : 10,
        marginBottom: 40,
      },
    avatar: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTextContainer: {
    marginLeft: 15, 
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

})