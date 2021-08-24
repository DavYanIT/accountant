import React from "react";
import { View, Text } from "react-native";

import type { Spend } from "./types";

type SpendCardProps = {
    spend: Spend;
};

const SpendCard: React.FC<SpendCardProps> = ({ spend }) => {
    return (
        <View
            style={{
                height: 80,
                backgroundColor: "rgba(200, 100, 100, 0.2)",
                borderRadius: 16,
                padding: 16,
                margin: 8,
            }}
        >
            <Text>{spend.forWhat}</Text>
            <Text>{spend.howMuch}</Text>
        </View>
    );
};

export default SpendCard;
