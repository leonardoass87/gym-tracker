import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import CadastroScreen from './CadastroScreen';
import JiuJitsuScreen from './JiuJitsuScreen';
import RegistroTreinoScreen from './RegistroTreinoScreen';
import PreparacaoTreinoScreen from './PreparacaoTreinoScreen';
import ListaDeTreinosScreen from './ListaDeTreinosScreen';
import DetalhesTreinoScreen from './DetalhesTreinoScreen';
import SplashScreen from './SplashScreen';
import PerfilScreen from './PerfilScreen';
import { auth } from './firebase/firebaseConfig';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="JiuJitsu" component={JiuJitsuScreen} />
            <Stack.Screen name="RegistroTreinoScreen" component={RegistroTreinoScreen} />
            <Stack.Screen name="PreparacaoTreinoScreen" component={PreparacaoTreinoScreen} />
            <Stack.Screen name="ListaDeTreinosScreen" component={ListaDeTreinosScreen} />
            <Stack.Screen name="DetalhesTreinoScreen" component={DetalhesTreinoScreen} />
            <Stack.Screen name="Perfil" component={PerfilScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
