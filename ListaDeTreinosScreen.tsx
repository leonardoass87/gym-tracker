import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ListaDeTreinosScreen = ({ route, navigation }: any) => {
  const [treinos, setTreinos] = useState<any[]>([]); // Lista de treinos

  useEffect(() => {
    // Verifica se os parâmetros foram passados
    if (route.params?.treinos) {
      setTreinos(route.params.treinos);
    } else {
      console.log('Nenhum treino passado na navegação');
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Treinos</Text>

      {/* Verifique se há treinos para exibir */}
      {treinos.length > 0 ? (
        <FlatList
          data={treinos}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('DetalhesTreinoScreen', { treinoId: item.id })}
            >
              <Text style={styles.buttonText}>{item.nome}</Text> {/* Exibe o nome do treino */}
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>Nenhum treino encontrado.</Text>
      )}
    </View>
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
  noDataText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ListaDeTreinosScreen;
