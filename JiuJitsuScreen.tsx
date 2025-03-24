import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JiuJitsuScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tela de Jiu Jitsu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default JiuJitsuScreen;
