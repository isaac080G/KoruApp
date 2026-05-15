import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { getVertexAI, getGenerativeModel } from "firebase/ai";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

const firebaseConfig = {
  apiKey: "AIzaSyDlTii4425veVA0C-NTOjYLtKfcE6b5F98",
  authDomain: "koruapp-cfcd4.firebaseapp.com",
  projectId: "koruapp-cfcd4",
  storageBucket: "koruapp-cfcd4.firebasestorage.app",
  messagingSenderId: "79285172899",
  appId: "1:79285172899:web:fe793b1026d3be311c5d16",
  measurementId: "G-39MVN6WQT0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);

const ai = getAI(app, { backend: new GoogleAIBackend() });
export const model = getGenerativeModel(ai, {
  model: "gemini-2.5-flash-lite",
});

//ejemplo de uso
//async function run() {
//  // Provide a prompt that contains text
//  const prompt = "Write a story about a magic backpack."
//
//  // To generate text output, call generateContent with the text input
//  const result = await model.generateContent(prompt);
//
//  const response = result.response;
//  const text = response.text();
//  console.log(text);
//}
//
//run();
