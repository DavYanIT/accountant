import { useMemo } from "react";
import { colors } from "../styles";
import useColorScheme from "./useColorScheme";
import { ColorsType } from "../types";

type Generator<T extends {}> = (colors: ColorsType) => T;

const useThemedStyles = <T extends {}>(baseStyles: Generator<T>) => {
    const theme = useColorScheme();
    const styles = useMemo(() => baseStyles(colors[theme]), [theme]);

    return styles;
};

export default useThemedStyles;
