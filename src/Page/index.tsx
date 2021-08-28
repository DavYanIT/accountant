import React from "react";
import { Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Header from "./Header";
import SpendCard from "../SpendCard";
import { styles } from "./styles";

import type { DaySpends, Spend } from "../types";

type PageProps = {
    item: DaySpends;
    index?: number;
    onCardPress: (spend: Spend, day: string) => void;
};

const Page = ({ item, onCardPress }: PageProps) => {
    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SafeAreaView style={styles.safeArea}>
                <Header>{item.day}</Header>
                <ScrollView contentContainerStyle={styles.pageContainer}>
                    <Text style={styles.total}>Total: {item.dayTotal}</Text>
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
