import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db, doc, setDoc } from './firebase/firebaseConfig'; // Se o arquivo firebaseConfig.ts estiver na mesma pasta


const PreparacaoTreinoScreen = ({ navigation }: any) => {
  const [nomeTreino, setNomeTreino] = useState('');
  const [exercicio, setExercicio] = useState('');
  const [serie, setSerie] = useState('');
  const [repeticao, setRepeticao] = useState('');
  const [descanso, setDescanso] = useState('');

  // Função para salvar treino no Firestore
  const handleSaveTreino = async () => {
    const user = auth.currentUser; // Obtém o usuário logado

    if (user) {
      try {
        const treinoData = {
          nome: nomeTreino,
          exercicios: [
            { exercicio, serie, repeticao, descanso },
          ],
          dataRegistro: new Date(),
        };

        // Correção na linha para salvar o treino no Firestore
        const treinoRef = doc(db, 'usuarios', user.uid, 'treinos', nomeTreino); // Usando o Firestore corretamente
        await setDoc(treinoRef, treinoData); // Salvando o treino

        alert('Treino salvo com sucesso!');
        navigation.navigate('ListaDeTreinosScreen'); // Vai para a tela de Lista de Treinos
      } catch (error) {
        console.error('Erro ao salvar o treino: ', error);
        alert('Erro ao salvar o treino');
      }
    } else {
      alert('Usuário não logado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Preparação do Treino</Text>

      {/* Campo para nome do treino */}
      <TextInput
        style={styles.input}
        placeholder="Nome do Treino (A, B, C, etc.)"
        value={nomeTreino}
        onChangeText={setNomeTreino}
      />

      {/* Formulário para adicionar exercícios */}
      <TextInput
        style={styles.input}
        placeholder="Exercício"
        value={exercicio}
        onChangeText={setExercicio}
      />
      <TextInput
        style={styles.input}
        placeholder="Séries"
        value={serie}
        keyboardType="numeric"
        onChangeText={setSerie}
      />
      <TextInput
        style={styles.input}
        placeholder="Repetições"
        value={repeticao}
        keyboardType="numeric"
        onChangeText={setRepeticao}
      />
      <TextInput
        style={styles.input}
        placeholder="Descanso (segundos)"
        value={descanso}
        keyboardType="numeric"
        onChangeText={setDescanso}
      />

      {/* Botão para salvar o treino */}
      <Button title="Salvar Treino" onPress={handleSaveTreino} />
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
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default PreparacaoTreinoScreen;
