import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
        position: "absolute",
        height: "100%",
        width: "100%",
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalView: {
        margin: 20,
        marginTop: "40%",
        backgroundColor: "rgba(240,240,240,0.9)",
        borderRadius: 20,
        paddingTop: 24,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        padding: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 0,
        textAlign: "center",
        fontSize: 13,
        color: "#737A82"
    },
    input: {
        height: 40,
        margin: 8,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        backgroundColor: "white",
        padding: 8,
        width: 300
    },
})