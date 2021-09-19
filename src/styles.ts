import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

const rgbWithAlpha = (rgb: number[], alpha: number) => {
    const rgba = [];
    for (const c of rgb) {
        rgba.push(Math.round(255 - (255 - c) * alpha));
    }
    return `rgb(${rgba})`;
};

const primaryColorRgb = [40, 40, 120];
const secondaryColorRgb = [160, 96, 128];
const borderColorRgb = [130, 130, 130];

const inverse = (rgb: number[]) => rgb.map((c) => 255 - c);

const primaryWithAlpha = (alpha: number = 1) => rgbWithAlpha(primaryColorRgb, alpha);
const secondaryWithAlpha = (alpha: number = 1) => rgbWithAlpha(secondaryColorRgb, alpha);
const borderWithAlpha = (alpha: number = 1) => rgbWithAlpha(borderColorRgb, alpha);

const primaryWithAlphaDark = (alpha: number = 1) =>
    rgbWithAlpha(inverse(primaryColorRgb), alpha);
const secondaryWithAlphaDark = (alpha: number = 1) =>
    rgbWithAlpha(inverse(secondaryColorRgb), alpha);
const borderWithAlphaDark = (alpha: number = 1) => rgbWithAlpha(inverse(borderColorRgb), alpha);

export const colors = {
    light: {
        text: "#000",
        background: "#fff",
        primary: primaryWithAlpha(),
        primary3: primaryWithAlpha(0.3),
        primary6: primaryWithAlpha(0.6),
        border: borderWithAlpha(),
        secondary3: secondaryWithAlpha(0.3),
    },
    dark: {
        text: "#fff",
        background: "#003944",
        primary: primaryWithAlphaDark(),
        primary3: primaryWithAlphaDark(0.3),
        primary6: primaryWithAlphaDark(0.6),
        border: borderWithAlphaDark(),
        secondary3: secondaryWithAlphaDark(0.3),
    },
};
