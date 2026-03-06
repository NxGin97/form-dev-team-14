import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { logoutUser } from "../../src/auth";

export default function LoginSuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/(employeeInfo)")}
      >
        <Text style={styles.buttonText}>Employee Information Form</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/(auth)/sign-in")}>
        <Text style={{ color: "#390c4d", textDecorationLine: "underline" }}>
          Back to Log in
        </Text>
      </Pressable>
      <Pressable
        style={styles.removeButton}
        onPress={async () => {
          await logoutUser();
          router.replace("/(auth)/sign-in");
        }}
      >
        <Text style={styles.buttonText}>Remove User</Text>
      </Pressable>
      <Text style={{ fontWeight: "600" }}>
        This will delete your account without confirmation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#390c4d",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    fontWeight: "700",
  },

  removeButton: {
    marginTop: 50,
    backgroundColor: "#9e2222",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
  },
  remove: {
    color: "#ca1c1c",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
