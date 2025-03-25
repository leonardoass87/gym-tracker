import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';  // Importação correta
import { auth } from './firebase/firebaseConfig';


export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);  // Controle do estado de "Esqueci a Senha"

  // Função de login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home'); // Redireciona para a Home após login bem-sucedido
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Função para enviar o link de recuperação de senha
  const handleForgotPassword = async () => {
  try {
    if (email) {
      // Verifica se o email está preenchido
      await sendPasswordResetEmail(auth, email); // Envia o link de recuperação de senha
      alert('Email de recuperação enviado!');
      setIsForgotPassword(false);  // Retorna ao login após enviar o link
    } else {
      alert('Por favor, insira seu e-mail');
    }
  } catch (e: any) {
    console.log('Erro ao enviar email de recuperação:', e.message);  // Log do erro para facilitar o diagnóstico
    setError('Ocorreu um erro ao enviar o link de recuperação.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isForgotPassword ? 'Recuperação de Senha' : 'Login'}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!isForgotPassword ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotPassword} onPress={() => setIsForgotPassword(true)}>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchScreen} onPress={() => navigation.navigate('CadastroScreen')}>
            <Text style={styles.switchScreenText}>Não tem uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Insira seu e-mail"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Enviar Link de Recuperação</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchScreen} onPress={() => setIsForgotPassword(false)}>
            <Text style={styles.switchScreenText}>Voltar ao Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 28,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchScreen: {
    alignSelf: 'center',
    marginTop: 20,
  },
  switchScreenText: {
    color: '#007BFF',
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
});
