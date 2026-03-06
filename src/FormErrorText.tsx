import { StyleSheet, Text } from "react-native";

type Props = {
  message?: string;
};

export function FormErrorText({ message }: Props) {
  if (!message) return null;
  return <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "#390c4d",
    fontSize: 12,
    marginLeft: 4,
  },
});