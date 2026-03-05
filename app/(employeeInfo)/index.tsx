import { Formik } from "formik";
import React from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { employeeSchema } from "./validation";

export default function EmployeeInfo() {

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
    <View>
      <Text style={styles.title}>Employee Information Form</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={employeeSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
        }) => (
          <View>

            <View style={[styles.field, focusedField === "name" && styles.fieldFocused]}>
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
                <Text style={{ color: "red", marginLeft: 10, marginTop: 4 }}>
                  {errors.name}
                </Text>
            ) : null}

            <View style={[styles.field, focusedField === "email" && styles.fieldFocused]}>
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
                <Text style={{ color: "red", marginLeft: 10, marginTop: 4 }}>
                  {errors.email}
                </Text>
            ) : null}

            <View style={[styles.field, focusedField === "phone" && styles.fieldFocused]}>
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
                <Text style={{ color: "red", marginLeft: 10, marginTop: 4 }}>
                  {errors.phone}
                </Text>
            ) : null}

            <View style={[styles.field, focusedField === "socialInsuranceNumber" && styles.fieldFocused]}>
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
                <Text style={{ color: "red", marginLeft: 10, marginTop: 4 }}>
                  {errors.socialInsuranceNumber}
                </Text>
            ) : null}

            <View style={[styles.field, focusedField === "position" && styles.fieldFocused]}>
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
                <Text style={{ color: "red", marginLeft: 10, marginTop: 4 }}>
                  {errors.position}
                </Text>
            ) : null}

            <View style={[styles.field, focusedField === "salary" && styles.fieldFocused]}>
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
                <Text style={{ color: "red", marginLeft: 10, marginTop: 4 }}>
                  {errors.salary}
                </Text>
            ) : null}

            <Pressable style = {styles.button} onPress={handleSubmit as any}><Text style = {styles.buttonText}>Submit</Text></Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  field:{
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgb(211, 211, 211, 0.5)",
    marginHorizontal: 10,
    borderRadius: 7,
    marginVertical: 10,
    paddingVertical: 5,
    verticalAlign: "middle"
  },
  fieldFocused: {
  backgroundColor: "rgba(174, 0, 255, 0.15)",
  borderWidth: 1,
  borderColor: "rgba(174, 0, 255, 1)",
  },
  title:{
    fontFamily: 'Montserrat',
    fontSize: 24,
    textAlign: "center",
    fontWeight: '700',
    marginVertical: 15,
  },
  label:{
    marginLeft: 13,
    fontSize: 17,
    fontWeight: "bold",
    verticalAlign: "middle"
  },
  input:{
    flexGrow: 6,
    marginHorizontal: 5,
    fontSize: 16
  },
  inputFocused: {
    backgroundColor: "rgba(174, 0, 255, 0.15)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  button:{
    alignSelf: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: "rgb(88, 3, 127)",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgb(88, 3, 127)",
    marginVertical: 20,
    borderRadius: 30,
  },
  buttonText:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFF"
  }
})