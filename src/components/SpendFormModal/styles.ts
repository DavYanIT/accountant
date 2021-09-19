import { StyleSheet } from "react-native";

import type { ColorsType } from "../../types";

export const modalStyles = (themeColors: ColorsType) =>
    StyleSheet.create({
        container: {
            borderRadius: 16,
            borderWidth: 1,
            borderColor: themeColors.border,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: themeColors.secondary3,
            padding: 16,
        },
    });

export const formStyles = (themeColors: ColorsType) =>
    StyleSheet.create({
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
            borderColor: themeColors.border,
        },
    });
