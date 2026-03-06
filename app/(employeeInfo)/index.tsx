import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { employeeSchema } from "../../src/validation";

export default function EmployeeInfo() {
  const router = useRouter();
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

  type employeeValues = {
    name: string;
    email: string;
    phone: string;
    socialInsuranceNumber: string;
    position: string;
    salary: string;
  };

  const initialValues: employeeValues = {
    name: "",
    email: "",
    phone: "",
    socialInsuranceNumber: "",
    position: "",
    salary: "",
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Feather
              style={styles.icon}
              name="chevron-left"
              size={26}
              color="black"
            />
          </Pressable>
          <Text style={styles.title}>Employee Information Form</Text>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={employeeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              console.log(values);
              await new Promise((r) => setTimeout(r, 2000));
              await router.push("/successSubmit");
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
            <View>
              <View
                style={[
                  styles.field,
                  focusedField === "name" && styles.fieldFocused,
                ]}
              >
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="John Doe"
                  autoCapitalize="words"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={(e) => {
                    handleBlur("name")(e);
                    setFocusedField(null);
                  }}
                  onFocus={() => setFocusedField("name")}
                  style={styles.input}
                />
              </View>
              {touched.name && errors.name ? (
                <Text style={styles.errorStyle}>{errors.name}</Text>
              ) : null}

              <View
                style={[
                  styles.field,
                  focusedField === "email" && styles.fieldFocused,
                ]}
              >
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="johndoe@gmail.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={(e) => {
                    handleBlur("email")(e);
                    setFocusedField(null);
                  }}
                  onFocus={() => setFocusedField("email")}
                  style={styles.input}
                />
              </View>
              {touched.email && errors.email ? (
                <Text style={styles.errorStyle}>{errors.email}</Text>
              ) : null}

              <View
                style={[
                  styles.field,
                  focusedField === "phone" && styles.fieldFocused,
                ]}
              >
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  placeholder="000-000-0000"
                  autoCapitalize="none"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={(e) => {
                    handleBlur("phone")(e);
                    setFocusedField(null);
                  }}
                  onFocus={() => setFocusedField("phone")}
                  style={styles.input}
                />
              </View>
              {touched.phone && errors.phone ? (
                <Text style={styles.errorStyle}>{errors.phone}</Text>
              ) : null}

              <View
                style={[
                  styles.field,
                  focusedField === "socialInsuranceNumber" &&
                    styles.fieldFocused,
                ]}
              >
                <Text style={styles.label}>Social Insurance Number</Text>
                <TextInput
                  placeholder="xxx-xxx-xxx"
                  autoCapitalize="none"
                  value={values.socialInsuranceNumber}
                  onChangeText={handleChange("socialInsuranceNumber")}
                  onBlur={(e) => {
                    handleBlur("socialInsuranceNumber")(e);
                    setFocusedField(null);
                  }}
                  onFocus={() => setFocusedField("socialInsuranceNumber")}
                  style={styles.input}
                />
              </View>
              {touched.socialInsuranceNumber && errors.socialInsuranceNumber ? (
                <Text style={styles.errorStyle}>
                  {errors.socialInsuranceNumber}
                </Text>
              ) : null}

              <View
                style={[
                  styles.field,
                  focusedField === "position" && styles.fieldFocused,
                ]}
              >
                <Text style={styles.label}>Job Title</Text>
                <TextInput
                  placeholder="Marketing Manager"
                  autoCapitalize="words"
                  value={values.position}
                  onChangeText={handleChange("position")}
                  onBlur={(e) => {
                    handleBlur("position")(e);
                    setFocusedField(null);
                  }}
                  onFocus={() => setFocusedField("position")}
                  style={styles.input}
                />
              </View>
              {touched.position && errors.position ? (
                <Text style={styles.errorStyle}>{errors.position}</Text>
              ) : null}

              <View
                style={[
                  styles.field,
                  focusedField === "salary" && styles.fieldFocused,
                ]}
              >
                <Text style={styles.label}>Salary</Text>
                <TextInput
                  placeholder="$60,000"
                  autoCapitalize="none"
                  value={values.salary}
                  onChangeText={handleChange("salary")}
                  onBlur={(e) => {
                    handleBlur("salary")(e);
                    setFocusedField(null);
                  }}
                  onFocus={() => setFocusedField("salary")}
                  style={styles.input}
                />
              </View>
              {touched.salary && errors.salary ? (
                <Text style={styles.errorStyle}>{errors.salary}</Text>
              ) : null}

              <Pressable
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
        <Pressable onPress={() => router.replace("/(auth)/sign-in")}>
          <Text style={styles.backToLogin}>Back to Log in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    margin: 10,
  },
  field: {
    flexDirection: "row",
    backgroundColor: "#e8e3eb",
    marginHorizontal: 25,
    borderRadius: 7,
    marginVertical: 10,
    paddingVertical: 15,
    verticalAlign: "middle",
  },
  fieldFocused: {
    backgroundColor: "#e5dbe9",
    borderWidth: 1,
    borderColor: "#390c4d",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
    marginVertical: 15,
  },
  label: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "600",
    verticalAlign: "middle",
  },
  input: {
    flexGrow: 6,
    marginHorizontal: 15,
    fontSize: 16,
  },
  inputFocused: {
    backgroundColor: "rgba(174, 0, 255, 0.15)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#390c4d",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 25,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFF",
  },
  errorStyle: {
    color: "#390c4d",
    marginLeft: 25,
    marginBottom: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  backToLogin: {
    padding: 24,
    textAlign: "center",
    color: "#390c4d",
    textDecorationLine: "underline",
  },
});
