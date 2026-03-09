//when user signs up, redirects to sign in after login
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { loginUser } from "../../../src/auth";
import { FormErrorText } from "../../../src/FormErrorText";

type signInValues = {
  email: string;
  password: string;
};

const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email is required.")
    .email("Enter a valid email."),
  password: Yup.string()
    .required("Password is required.")
});

export default function SignUpScreen() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const initialValues: signInValues = {
    email: "",
    password: "",
  };
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={async (values, {setSubmitting }) => {
        try{
          const success = await loginUser(values.email, values.password);
          if (success) {
            setLoginError(null);
            await new Promise((r) => setTimeout(r, 2000));
            router.push("/(auth)/success");
          } else {
            setLoginError("Invalid email or password.");
          }
          } finally {
            setSubmitting(false);
          }
        }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <TextInput
              style={[
                styles.input,
                focusedInput === "email" && styles.focusedInput,
              ]}
              placeholder="Email"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange("email")}
              onFocus={() => setFocusedInput("email")}
              onBlur={(e) => {
                handleBlur("email")(e);
                setFocusedInput(null);
              }}
            />
            <FormErrorText message={touched.email ? errors.email : undefined} />

            <TextInput
              style={[
                styles.input,
                focusedInput === "password" && styles.focusedInput,
              ]}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onFocus={() => setFocusedInput("password")}
              onBlur={(e) => {
                handleBlur("password")(e);
                setFocusedInput(null);
              }}
            />
            <FormErrorText
              message={touched.password ? errors.password : undefined}
            />

            {loginError && <FormErrorText message={loginError} />}

            <Pressable
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>Log in</Text>
              )}
            </Pressable>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text> Don't have an account yet? </Text>
              <Pressable onPress={() => router.replace("/(auth)/sign-up")}>
                <Text
                  style={{ color: "#390c4d", textDecorationLine: "underline" }}
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
    marginHorizontal: 18,
    marginTop: "30%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#390c4d",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  focusedInput: {
    backgroundColor: "#e5dbe9",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#390c4d",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
});
