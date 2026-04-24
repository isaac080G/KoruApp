import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 60, 
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: '300', 
    color: '#4A4A4A',
    letterSpacing: 4,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  btnContainer: {
    width: '100%',
    marginTop: 15,
  },
  btn: {
    backgroundColor: '#87B1A9', 
    borderRadius: 25,
    paddingVertical: 12,
  },
  btnRegister: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#87B1A9',
    borderRadius: 25,
    paddingVertical: 12,
  },
  btnTextRegister: {
    color: '#87B1A9',
  }
});
