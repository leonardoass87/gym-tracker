import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegistreSeuTreinoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tela para Registrar Treino</Text>
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

export default RegistreSeuTreinoScreen;
