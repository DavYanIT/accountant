import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../Themed";
import useThemedStyles from "../../hooks/useThemedStyles";
import moment from "moment";
import { styles } from "./styles";

import type { Spend } from "../../types";

type SpendCardProps = {
    spend: Spend;
    onPress: () => void;
};

const SpendCard: React.FC<SpendCardProps> = ({ spend, onPress }) => {
    const themedStyles = useThemedStyles(styles);
    return (
        <TouchableOpacity onPress={onPress} style={themedStyles.container}>
            <Text>{spend.forWhat}</Text>
            <Text>{spend.howMuch}</Text>
            <Text>{moment(spend.id).format("hh:mm A / DD MMM YYYY")}</Text>
        </TouchableOpacity>
    );
};

export default SpendCard;
