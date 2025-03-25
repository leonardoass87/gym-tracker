// Importando os módulos necessários do Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Para autenticação do Firebase
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Importando Firestore

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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Obter a instância de autenticação
const auth = getAuth(app);

// Obter a instância do Firestore
const db = getFirestore(app);

// Exportando as instâncias de auth e db para uso no app
export { auth, db, doc, setDoc };
