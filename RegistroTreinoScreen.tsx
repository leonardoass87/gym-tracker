import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TreinoScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecione a Ação de Treino</Text>

      {/* Botão para acessar Preparação de Treino */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PreparacaoTreinoScreen')} // Navega para a tela de Preparação de Treino
      >
        <Text style={styles.buttonText}>Preparação de Treino</Text>
      </TouchableOpacity>

      {/* Botão para acessar Lista de Treinos */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListaDeTreinosScreen')} // Navega para a tela de Lista de Treinos
      >
        <Text style={styles.buttonText}>Lista de Treinos</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TreinoScreen;
