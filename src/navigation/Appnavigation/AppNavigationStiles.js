import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    borderTopWidth: 0, 
    paddingBottom: 10,
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingLeft: 15,
    paddingRight:16

  },
  accessoryContainer: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  accessoryText: {
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  }
});