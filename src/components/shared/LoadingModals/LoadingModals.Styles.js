import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "rgba(4, 255, 0, 1)",
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    View:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    text:{
        color: "rgba(4, 255, 0, 1)",
        textTransform: "uppercase",
        marginTop: 10,
    }

});