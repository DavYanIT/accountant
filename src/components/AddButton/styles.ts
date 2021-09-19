import { StyleSheet } from "react-native";
import type { ColorsType } from "../../types";

export const buttonSize = 56;

const lineWidth = 3;
const lineHeight = 35;

export const addButtonStyles = (themeColors: ColorsType) =>
    StyleSheet.create({
        positionStyle: {
            position: "absolute",
            right: 16,
            zIndex: 999,
        },
        viewStyle: {
            backgroundColor: themeColors.primary,
            borderTopStartRadius: 32,
            borderTopEndRadius: 32,
            borderBottomStartRadius: 32,
            borderBottomEndRadius: 32,
            height: buttonSize,
            width: buttonSize,
        },
        plusWrapper: {
            position: "relative",
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
    });
