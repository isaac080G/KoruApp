import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  headerContent: {
    alignItems: 'center', 
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#FAF9F7', 
    width: '100%',
  },
  
  
  avatarMarco: {
    width: 140, 
    height: 140,
    borderRadius: 70, 
    borderWidth: 6, 
    borderColor: '#C0C0C0', 
    backgroundColor: '#fff', 
    overflow: 'hidden', 
    alignSelf: 'center',
    
    
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.15, 
        shadowRadius: 5,
      },
      android: {
        elevation: 8, 
      },
    }),
  },
  
  avatarImage: {
    borderRadius: 70, 
    resizeMode: 'cover', 
  },
  identityContainer: {
    alignItems: 'center',
    marginTop: 15, 
    gap: 3, 
  },
  displayName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4A4A', 
    textTransform: 'uppercase', 
    letterSpacing: 1,
    textAlign: 'center',
  },
  data:{
    padding: 35,

  },
  dataTitle:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
    dataText:{
        marginLeft: 15,
        
        fontSize: 18,
    },


    btnContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  btnMenu: {
    backgroundColor: "#fff",
    borderRadius: 25,          
    borderWidth: 1,
    borderColor: "#C0C0C0",    
    height: 60,
    justifyContent: "space-between", 
    paddingHorizontal: 20,
  },
  btnTitle: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",         
    flex: 1,                   
  },
  iconContainer: {
    marginLeft: 10,
  },
  
});