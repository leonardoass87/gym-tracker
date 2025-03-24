import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // A tela de Home
import LoginScreen from './LoginScreen'; // Tela de login
import CadastroScreen from './CadastroScreen'; // Tela de cadastro
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Controle de login

  // Verificar o estado de login ao carregar o aplicativo
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('isLoggedIn');
        if (user === 'true') {
          setIsLoggedIn(true); // O usuário está logado
        } else {
          setIsLoggedIn(false); // O usuário não está logado
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginStatus();
  }, []); // Executar apenas uma vez ao montar o componente

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}

        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
