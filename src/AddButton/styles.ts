import { StyleSheet } from "react-native";

const buttonSize = 56;

const lineWidth = 3;
const lineHeight = 35;

export const styles = StyleSheet.create({
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
