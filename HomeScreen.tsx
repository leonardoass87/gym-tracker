import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig'; // Importando o auth
import { Ionicons } from '@expo/vector-icons'; // Para adicionar ícones

const HomeScreen = ({ navigation }: any) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Navega de volta para a tela de login após o logout
        navigation.replace('Login');  // Usando 'replace' para substituir a tela de login e evitar que o usuário volte com o botão "voltar"
      })
      .catch((error) => console.log("Erro no logout: ", error));
  };

  return (
    <View style={styles.container}>
      {/* Logo ou Imagem no topo */}
      <Image source={require('./assets/logo.png')} style={styles.logo} />

      {/* Saudação personalizada */}
      <Text style={styles.header}>Bem-vindo ao Gym Tracker!</Text>

      {/* Seção de navegação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navegação:</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroScreen')} // Redireciona para a tela de cadastro
        >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RegistroTreinoScreen')} // Redireciona para a tela de treino
        >
          <Text style={styles.buttonText}>Registre seu treino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('JiuJitsu')} // Redireciona para a tela de Jiu Jitsu
        >
          <Text style={styles.buttonText}>Jiu Jitsu</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Logout com ícone */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={20} color="#fff" style={styles.icon} />
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
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
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
  logoutButton: {
    backgroundColor: '#FF3B30', // Cor de destaque para o logout
  },
  icon: {
    marginRight: 10, // Espaço entre o ícone e o texto
  },
});

export default HomeScreen;
