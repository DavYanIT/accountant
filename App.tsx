import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
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
