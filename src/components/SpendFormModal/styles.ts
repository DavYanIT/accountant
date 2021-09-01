import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
    container: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(130, 130, 130, 1)",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(230, 255, 255, 1)",
        padding: 16,
    },
});

export const formStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    formItem: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginTop: 4,
        marginBottom: 20,
        padding: 8,
        borderRadius: 2,
        borderWidth: 1,
        backgroundColor: "rgba(245, 253, 253, 1)",
        borderColor: "rgba(130, 130, 130, 0.75)",
    },
});
