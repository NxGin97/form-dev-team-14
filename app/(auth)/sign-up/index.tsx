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
import { saveUserAccount } from "../../../src/auth";
import { FormErrorText } from "../../../src/FormErrorText";

type signUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = Yup.object({
  firstName: Yup.string()
    .required("Enter your first name.")
    .min(3, "Minimum 3 characters."),
  lastName: Yup.string().required("Enter your last name."),
  email: Yup.string()
    .required("Email is required.")
    .email("Enter a valid email."),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Minimum 6 characters"),
  confirmPassword: Yup.string()
    .required("Password is required.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});

export default function SignUpScreen() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const initialValues: signUpValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={async (values, {setSubmitting }) => {
        try{
          const account = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          };
          await saveUserAccount(account);
          await new Promise((r) => setTimeout(r, 2000));
          router.push("/sign-in");
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
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === "firstName" && styles.focusedInput,
              ]}
              placeholder="First Name"
              autoCapitalize="words"
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={(e) => {
                handleBlur("firstName")(e);
                setFocusedInput(null);
              }}
              onFocus={() => setFocusedInput("firstName")}
            />
            <FormErrorText
              message={touched.firstName ? errors.firstName : undefined}
            />
            <TextInput
              style={[
                styles.input,
                focusedInput === "lastName" && styles.focusedInput,
              ]}
              placeholder="Last Name"
              autoCapitalize="words"
              value={values.lastName}
              onChangeText={handleChange("lastName")}
              onFocus={() => setFocusedInput("lastName")}
              onBlur={(e) => {
                handleBlur("lastName")(e);
                setFocusedInput(null);
              }}
            />
            <FormErrorText
              message={touched.lastName ? errors.lastName : undefined}
            />

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

            <TextInput
              style={[
                styles.input,
                focusedInput === "confirmPassword" && styles.focusedInput,
              ]}
              placeholder="Confirm Password"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onFocus={() => setFocusedInput("confirmPassword")}
              onBlur={(e) => {
                handleBlur("confirmPassword")(e);
                setFocusedInput(null);
              }}
            />
            <FormErrorText
              message={touched.confirmPassword ? errors.confirmPassword : undefined}
            />

            <Pressable
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Text style={[styles.buttonText, {opacity: 0.4}]}>Creating account...</Text>
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </Pressable>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text> Already have an account? </Text>
              <Pressable onPress={() => router.replace("/(auth)/sign-in")}>
                <Text
                  style={{ color: "#390c4d", textDecorationLine: "underline" }}
                >
                  Log In
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
    marginTop: "10%",
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
  errorStyle: {
    color: "#390c4d",
    marginLeft: 25,
    marginBottom: 5,
  },
});
