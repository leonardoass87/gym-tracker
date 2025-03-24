import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from './firebase/firebaseConfig';  // Importando o auth do Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Funções do Firebase
import { useForm, Controller } from 'react-hook-form'; // Para validação do formulário
import InputMask from 'react-input-mask'; // Para aplicar a máscara no campo de celular
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // A tela de Home
import CadastroScreen from './CadastroScreen'; // A tela de Cadastro
import RegistreSeuTreinoScreen from './RegistroTreinoScreen'; // Tela para registrar treino
import JiuJitsuScreen from './JiuJitsuScreen'; // Tela de Jiu Jitsu
import Icon from 'react-native-vector-icons/FontAwesome'; // Ícones

const Stack = createStackNavigator();

export default function App() {
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Alterna entre login e signup
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Controle da tela "Esqueci a Senha"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Controle de login
  const { control, handleSubmit, getValues } = useForm();

  // Função de login
  const handleLogin = async (data: any) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsLoggedIn(true); // Usuário logado, vamos redirecionar para a Home
      alert('Login successful!');
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Função de cadastro
  const handleSignup = async (data: any) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert('Cadastro bem-sucedido!');
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Função de recuperação de senha
  const handleForgotPassword = async () => {
    try {
      const email = getValues('email');
      if (email) {
        await sendPasswordResetEmail(auth, email);
        alert('Email de recuperação enviado!');
      } else {
        alert('Por favor, insira seu e-mail');
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Alterna entre tela de login e cadastro
  const toggleSignup = () => setIsSignup(!isSignup);

  // Alterna para a tela de "Esqueci a Senha"
  const toggleForgotPassword = () => setIsForgotPassword(!isForgotPassword);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          // Tela de Login
          <Stack.Screen name="Login">
            {() => (
              <View style={styles.container}>
                <Text style={styles.header}>{isSignup ? 'Cadastro' : isForgotPassword ? 'Esqueci a Senha' : 'Login'}</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                {isForgotPassword ? (
                  <>
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
                      rules={{ required: true }}
                      defaultValue=""
                    />

                    <Button title="Enviar link de recuperação" onPress={handleForgotPassword} />

                    <TouchableOpacity onPress={toggleForgotPassword}>
                      <Text style={styles.switchText}>Voltar para login</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
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
                      rules={{ required: true }}
                      defaultValue=""
                    />

                    {!isForgotPassword && (
                      <>
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
                          rules={{ required: true }}
                          defaultValue=""
                        />

                        {isSignup && (
                          <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <InputMask
                                mask="(99) 9 9999-9999"
                                value={value || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                              >
                                {(inputProps: any) => (
                                  <TextInput
                                    {...inputProps}
                                    style={styles.input}
                                    placeholder="Celular"
                                  />
                                )}
                              </InputMask>
                            )}
                            name="phone"
                            rules={{ required: true }}
                            defaultValue=""
                          />
                        )}
                      </>
                    )}

                    <Button
                      title={isSignup ? 'Cadastrar' : 'Login'}
                      onPress={handleSubmit(isSignup ? handleSignup : handleLogin)}
                    />

                    <TouchableOpacity onPress={toggleSignup}>
                      <Text style={styles.switchText}>
                        {isSignup ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Cadastre-se'}
                      </Text>
                    </TouchableOpacity>

                    {!isSignup && (
                      <TouchableOpacity onPress={toggleForgotPassword}>
                        <Text style={styles.switchText}>Esqueci minha senha</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            )}
          </Stack.Screen>
        ) : (
          // Tela Home
          <Stack.Screen name="Home">
            {({ navigation }) => (
              <HomeScreen navigation={navigation} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
