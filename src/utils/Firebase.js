
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

import { getReactNativePersistence, initializeAuth, } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";

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