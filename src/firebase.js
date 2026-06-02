import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 1. Usa las variables de entorno para mayor seguridad
const firebaseConfig = {
  apiKey: "AIzaSyCthG_ButZOp3xsqaABSwpjBB9NaDNLD-Y",
  authDomain: "jotitas-app.firebaseapp.com",
  projectId: "jotitas-app",
  storageBucket: "jotitas-app.firebasestorage.app",
  messagingSenderId: "317294816412",
  appId: "1:317294816412:web:606c4d80d33bf093e95159"
};

// 2. Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();