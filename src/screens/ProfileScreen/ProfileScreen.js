import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { LoadingModals } from "../../components/shared/LoadingModals/LoadingModals";
import { screen } from "../../utils";
import { auth, db } from "../../utils/Firebase";
import { UserGestScreen } from "./UserGestScreen";
import { UserLoggedScreen } from "./UserLoggedScreen";



export function ProfileScreen() {
  const [hasLogged, sethasLogged] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDocRef = doc(db, "usuarios", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            navigation.navigate(screen.Profile.Name);
          } else {
            sethasLogged(true);
          }
        } else {
          sethasLogged(false);
        }
      });

      return () => unsub();
    }, []),
  );

  if (hasLogged === null) {
    return <LoadingModals show={true} text="Cargando..." />;
  }

  return hasLogged ? <UserLoggedScreen /> : <UserGestScreen />;
}
