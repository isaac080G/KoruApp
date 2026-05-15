import { Text } from "@rneui/base";
import { Overlay } from "@rneui/themed";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./LoadingModals.Styles";

//import {styles} from "./LoadingModals.Styles"
export function LoadingModals(props) {
  const { show, text } = props;
  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
      <View style={styles.View}>
        {text && <Text style={styles.text}>{text}</Text>}
        <ActivityIndicator size="large" color="rgb(236, 159, 255)" />
      </View>
    </Overlay>
  );
}

LoadingModals.defaultProps = {
  show: false,
};
