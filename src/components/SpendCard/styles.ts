import { StyleSheet } from "react-native";
import type { ColorsType } from "../../types";

export const styles = (themeColors: ColorsType) =>
    StyleSheet.create({
        container: {
            height: 80,
            backgroundColor: themeColors.primary3,
            borderRadius: 8,
            padding: 16,
            marginHorizontal: 16,
            marginVertical: 8,
        },
    });
