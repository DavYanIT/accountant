import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from './src/components/Themed';
import FlashMessage from "react-native-flash-message";
import Layout from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <Layout />
      <StatusBar style="auto" />
      <FlashMessage position="center" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
