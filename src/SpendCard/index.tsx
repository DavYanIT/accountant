import React from "react";
import { Text, TouchableOpacity } from "react-native";

import type { Spend } from "../types";
import { styles } from "./styles";

type SpendCardProps = {
    spend: Spend;
    onPress: () => void;
};

const SpendCard: React.FC<SpendCardProps> = ({ spend, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text>{spend.forWhat}</Text>
            <Text>{spend.howMuch}</Text>
        </TouchableOpacity>
    );
};

export default SpendCard;
