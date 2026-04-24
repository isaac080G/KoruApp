import { Text } from "@rneui/themed";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./Loading.styles";

export function Loading(props) {
  const { show, text } = props;

  if (!show) return null;
  return (
    <View style={styles.content}>
      <ActivityIndicator size="large" color="#96d8ff" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}
