import React from "react";
import Icon from "../Icon";
import useColorScheme from "../../hooks/useColorScheme";
import { colors } from "../../styles";
import { styles } from "./styles";

type BackTodayIconProps = {
    onPress(): void;
};

const BackTodayIcon: React.FC<BackTodayIconProps> = ({ onPress }) => {
    const theme = useColorScheme();

    return (
        <Icon
            size={28}
            iconSet="Feather"
            name="arrow-right-circle"
            color={colors[theme].primary6}
            style={styles.icon}
            onPress={onPress}
        />
    );
};

export default BackTodayIcon;
