import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }: any) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => console.log("Erro no logout: ", error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo ao Gym Tracker!</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navegação:</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Perfil')} // ✅ Agora vai para "Perfil"
        >
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RegistroTreinoScreen')}
        >
          <Text style={styles.buttonText}>Registre seu treino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('JiuJitsu')}
        >
          <Text style={styles.buttonText}>Jiu Jitsu</Text>
        </TouchableOpacity>
      </View>

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
    padding: Platform.OS === 'web' ? 40 : 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    width: Platform.OS === 'web' ? '50%' : '100%',
    marginBottom: 20,
    alignItems: 'center',
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
    maxWidth: Platform.OS === 'web' ? 300 : '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  icon: {
    marginRight: 10,
  },
});

export default HomeScreen;
