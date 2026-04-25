
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth, } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";
//import { getVertexAI, getGenerativeModel } from "firebase/ai";
import { getAI, getGenerativeModel } from "firebase/ai";
import appCheck from '@react-native-firebase/app-check';
import { Platform } from 'react-native';



const firebaseConfig = {
  apiKey: "AIzaSyDlTii4425veVA0C-NTOjYLtKfcE6b5F98",
  authDomain: "koruapp-cfcd4.firebaseapp.com",
  projectId: "koruapp-cfcd4",
  storageBucket: "koruapp-cfcd4.firebasestorage.app",
  messagingSenderId: "79285172899",
  appId: "1:79285172899:web:fe793b1026d3be311c5d16",
  measurementId: "G-39MVN6WQT0"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);

export const auth=initializeAuth(initFirebase,{
 persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(initFirebase);

export const storage = getStorage(initFirebase)


const ai = getAI(initFirebase);
const model = getGenerativeModel(ai, { model: 'gemini-1.5-flash' });
const result = model.generateContent('¿Qué es 2 + 2?');
console.log(result.response.text());

async function setupFirebaseServices() {
  console.log("Inicializando App Check...");
  // Activa App Check para la aplicación Firebase por defecto (initFirebase)
  // El segundo argumento 'true' habilita el modo de depuración (debug mode),
  // ¡asegúrate de quitarlo en producción!
  appCheck().activate(
    Platform.OS === 'android' ? 'PlayIntegrity' : 'Debug', // O tu proveedor para iOS/Web
    true // DEBUG MODE - ¡QUITAR EN PRODUCCIÓN!
  );
  console.log("App Check activado.");

  // Ahora puedes inicializar y usar tus servicios de AI Logic
  // de manera segura después de que App Check haya sido activado.
  try {
    const ai = getAI(initFirebase);
    const model = getGenerativeModel(ai, { model: 'gemini-1.5-flash' });
    const result = await model.generateContent('¿Qué es 2 + 2?');
    console.log("Resultado de AI Logic:", result.response.text());
  } catch (error) {
    console.error("Error al usar Firebase AI Logic:", error);
  }
}

// 4. Llama a la función de configuración de servicios, preferiblemente al inicio de tu aplicación.
setupFirebaseServices();
