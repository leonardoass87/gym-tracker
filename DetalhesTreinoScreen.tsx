import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DetalhesTreinoScreen = ({ route }: any) => {
  const { treino, exercicios } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Detalhes do {treino}</Text>

      {exercicios.map((item: any, index: number) => (
        <View key={index} style={styles.exerciseItem}>
          <Text style={styles.exerciseText}>Exercício: {item.exercicio}</Text>
          <Text style={styles.exerciseText}>Séries: {item.serie}</Text>
          <Text style={styles.exerciseText}>Repetições: {item.repeticao}</Text>
          <Text style={styles.exerciseText}>Descanso: {item.descanso}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  exerciseItem: {
    padding: 10,
    backgroundColor: '#d3d3d3',
    marginBottom: 10,
    borderRadius: 5,
  },
  exerciseText: {
    fontSize: 16,
  },
});

export default DetalhesTreinoScreen;
