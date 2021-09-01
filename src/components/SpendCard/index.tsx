import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import type { Spend } from "../../types";

type SpendCardProps = {
    spend: Spend;
    onPress: () => void;
};

const SpendCard: React.FC<SpendCardProps> = ({ spend, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text>{spend.forWhat}</Text>
        <Text>{spend.howMuch}</Text>
    </TouchableOpacity>
);

export default SpendCard;
