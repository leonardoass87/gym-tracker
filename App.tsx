import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import CadastroScreen from './CadastroScreen'; // Cadastro
import JiuJitsuScreen from './JiuJitsuScreen'; // Jiu Jitsu
import RegistroTreinoScreen from './RegistroTreinoScreen';  // Sua tela de treino
import { auth } from './firebase/firebaseConfig';
import SplashScreen from './SplashScreen'; // Importando o SplashScreen
import PreparacaoTreinoScreen from './PreparacaoTreinoScreen';
import ListaDeTreinosScreen from './ListaDeTreinosScreen';
import DetalhesTreinoScreen from './DetalhesTreinoScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false); // Defina o loading como false quando a verificação de autenticação terminar
    });

    return () => unsubscribe();
  }, []);

  // Se ainda estiver carregando, mostra a tela de Splash
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="JiuJitsu" component={JiuJitsuScreen} />
            <Stack.Screen name="RegistroTreinoScreen" component={RegistroTreinoScreen} />
            <Stack.Screen name="PreparacaoTreinoScreen" component={PreparacaoTreinoScreen} />
        <Stack.Screen name="ListaDeTreinosScreen" component={ListaDeTreinosScreen} />
        <Stack.Screen name="DetalhesTreinoScreen" component={DetalhesTreinoScreen} />
          </>
        )}
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
