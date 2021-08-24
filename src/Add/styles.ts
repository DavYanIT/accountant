import { StyleSheet } from "react-native";

const buttonSize = 56;

const lineWidth = 3;
const lineHeight = 35;

// const buttonSize = 64;

// const lineWidth = 4;
// const lineHeight = 40;

export const modalStyles = StyleSheet.create({
    container: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(130, 130, 130, 1)",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(230, 255, 255, 1)",
        padding: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        margin: 8,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "rgba(245, 253, 253, 1)",
        borderColor: "rgba(130, 130, 130, 0.75)",
    },
});

export const buttonStyles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 16,
        bottom: 16,
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
