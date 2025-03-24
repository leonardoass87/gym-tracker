// Importar os módulos necessários do Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Importar a função de autenticação

// Configuração do Firebase (substitua pelos seus dados)
const firebaseConfig = {
  apiKey: "AIzaSyDs6hIARXFadIyxQ2ENVRycaj9Go3fkl1A",
  authDomain: "gym-tracker-4f1f2.firebaseapp.com",
  projectId: "gym-tracker-4f1f2",
  storageBucket: "gym-tracker-4f1f2.firebasestorage.app",
  messagingSenderId: "139457682253",
  appId: "1:139457682253:web:43e4c4c1b446c9e7a93504",
  measurementId: "G-LMNY97C2BH"
};

// Inicializar o Firebase com a configuração
const app = initializeApp(firebaseConfig);

// Obter a instância de autenticação do Firebase
const auth = getAuth(app);

// Exportar a instância de auth para uso no app
export { auth };
