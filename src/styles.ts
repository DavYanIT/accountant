import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

const buttonSize = 64;

const lineWidth = 4;
const lineHeight = 40;

export const addStyles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 24,
        bottom: 24,
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        borderBottomStartRadius: 32,
        borderBottomEndRadius: 32,
        height: buttonSize,
        width: buttonSize,
        backgroundColor: "#f44336",
        zIndex: 999,
    },
    plusWrapper: {
        position: "relative",
        width: buttonSize,
        height: buttonSize,
    },
    plus: {
        position: "absolute",
        backgroundColor: "white",
        width: lineWidth,
        height: lineHeight,
        left: (buttonSize - lineWidth) / 2,
        top: (buttonSize - lineHeight) / 2,
        borderRadius: lineWidth / 2,
    },
    plusTransform: {
        transform: [{ rotate: "90deg" }],
    },
});
