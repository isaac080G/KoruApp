import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#FAF9F7', 
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  iconHeader: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#9562ed',
    padding: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  pickerCard: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 10,
    
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  androidDateBtn: {
    backgroundColor: '#9562ed',
    borderRadius: 10,
    margin: 20,
  },
  selectedDateContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  selectedDateLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9562ed',
    marginBottom: 5,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  btnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 15  },
  btn: {
    backgroundColor: '#9562ed',
    borderRadius: 30,
    height: 55,
  },
  emergencyPhoneContainer:{
   alignSelf: 'stretch'
  }
});