import { StyleSheet } from "react-native";
import type { ColorsType } from "../../types";

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

export const headerStyles = (themeColors: ColorsType) =>
    StyleSheet.create({
        container: {
            height: 88,
            backgroundColor: themeColors.primary3,
            width: "100%",
            justifyContent: "flex-end",
        },
        background: {
            height: 64,
            justifyContent: "center",
            backgroundColor: themeColors.primary6,
            width: "100%",
            alignItems: "center",
        },
        text: {
            fontSize: 24,
        },
    });
