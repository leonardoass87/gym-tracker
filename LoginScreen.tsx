// LoginScreen.tsx
import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Funções do Firebase
import { useForm, Controller } from 'react-hook-form'; // Para validação do formulário
import { auth } from './firebase/firebaseConfig'; // Importando o auth do Firebase
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

const LoginScreen = ({ navigation }: any) => {
  const [error, setError] = useState('');
  const { control, handleSubmit } = useForm();

  // Função de login
  const handleLogin = async (data: any) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setError(''); // Limpa o erro em caso de sucesso
      alert('Login bem-sucedido!');
      
      // Salvar o estado de login no AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('Home'); // Navega para a Home após login bem-sucedido
    } catch (e: any) {
      setError(e.message); // Exibe o erro se falhar
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value || ''}
            onChangeText={onChange}
          />
        )}
        name="email"
        rules={{ required: 'Email é obrigatório' }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={value || ''}
            onChangeText={onChange}
          />
        )}
        name="password"
        rules={{ required: 'Senha é obrigatória' }}
      />

      <Button title="Login" onPress={handleSubmit(handleLogin)} />

      <TouchableOpacity onPress={() => navigation.navigate('CadastroScreen')}>
        <Text style={styles.switchText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenhaScreen')}>
        <Text style={styles.switchText}>Esqueci minha senha</Text>
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
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  switchText: {
    color: '#007BFF',
    marginTop: 15,
  },
});

export default LoginScreen;
