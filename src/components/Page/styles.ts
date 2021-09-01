import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    pageContainer: {
        flexGrow: 1,
    },
    total: {
        fontSize: 18,
        padding: 8,
        marginLeft: 12,
    },
});

export const headerStyles = StyleSheet.create({
    container: {
        height: 88,
        backgroundColor: "rgba(200, 200, 200, 0.3)",
        width: "100%",
        justifyContent: "flex-end",
    },
    background: {
        height: 64,
        justifyContent: "center",
        backgroundColor: "rgba(200, 200, 200, 0.3)",
        width: "100%",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
    },
});
