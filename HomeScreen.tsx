import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig'; // Importando o auth

const HomeScreen = ({ navigation }: any) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login'); // Navega de volta para a tela de login após logout
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo à Home!</Text>

      {/* Botão para Cadastro */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CadastroScreen')} // Redireciona para a tela de cadastro
      >
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>

      {/* Botão para Registrar Treino */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegistreSeuTreino')} // Redireciona para a tela de treino
      >
        <Text style={styles.buttonText}>Registre seu treino</Text>
      </TouchableOpacity>

      {/* Botão para Jiu Jitsu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('JiuJitsu')} // Redireciona para a tela de Jiu Jitsu
      >
        <Text style={styles.buttonText}>Jiu Jitsu</Text>
      </TouchableOpacity>

      {/* Botão de Logout */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
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
    backgroundColor: '#f5f5f5', // Fundo claro para a tela
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333', // Cor do texto do cabeçalho
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF', // Cor de fundo do botão
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20, // Aumentei o espaçamento entre os botões
    borderRadius: 8,
    width: '80%', // Definindo a largura do botão
    justifyContent: 'center', // Centralizando ícones e texto
    height: 50, // Ajustando a altura do botão
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10, // Espaço entre o ícone e o texto
  },
  buttonText: {
    color: '#fff', // Cor do texto (branco)
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
