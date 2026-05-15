//import { NavigationContainer } from "@react-navigation/native";
//import { useEffect } from "react";
//import "react-native-get-random-values";
//import Toast from "react-native-toast-message";
//import { AppNavigation } from "./src/navigation/Appnavigation/AppNavigation";
//import { initFirebase, setupFirebaseServices } from "./src/utils";
//
//import { LogBox } from "react-native";
//LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
//initFirebase();
////setupFirebaseServices();
//export default function App() {
//  useEffect(() => {
//    // Ejecutar la configuración de servicios al arrancar
//    setupFirebaseServices();
//  }, []);
//  return (
//    <>
//      <NavigationContainer>
//        <AppNavigation />
//      </NavigationContainer>
//      <Toast />
//    </>
//  );
//}
import { NavigationContainer } from "@react-navigation/native";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import { AppNavigation } from "./src/navigation/Appnavigation/AppNavigation";

import { LogBox } from "react-native";

if (typeof DOMException === "undefined") {
  global.DOMException = class DOMException extends Error {
    constructor(message, name) {
      super(message);
      this.name = name || "DOMException";
    }
  };
}

if (typeof AbortSignal.any === "undefined") {
  AbortSignal.any = function (signals) {
    const controller = new AbortController();
    signals.forEach((signal) => {
      if (signal.aborted) {
        controller.abort(signal.reason);
      } else {
        signal.addEventListener("abort", () => controller.abort(signal.reason));
      }
    });
    return controller.signal;
  };
}
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}
