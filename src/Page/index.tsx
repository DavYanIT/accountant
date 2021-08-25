import React from "react";
import { Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import SpendCard from "../SpendCard";

import type { DaySpends, Spend } from "../types";

type PageProps = {
    item: DaySpends;
    index?: number;
    onCardPress: (spend: Spend, day: string) => void;
};

const Page = ({ item, onCardPress }: PageProps) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <SafeAreaView
                style={{
                    height: "100%",
                }}
            >
                <View
                    style={{
                        height: 88,
                        backgroundColor: "rgba(200, 200, 200, 0.3)",
                        width: "100%",
                        justifyContent: "flex-end",
                    }}
                >
                    <View
                        style={{
                            height: 64,
                            justifyContent: "center",
                            backgroundColor: "rgba(200, 200, 200, 0.3)",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: 24 }}>{item.day}</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text style={{ fontSize: 18, padding: 8, marginLeft: 12 }}>
                        Total: {item.dayTotal}
                    </Text>
                    {item.spends.map((spend) => (
                        <SpendCard
                            key={spend.id}
                            spend={spend}
                            onPress={() => onCardPress(spend, item.day)}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Page;
