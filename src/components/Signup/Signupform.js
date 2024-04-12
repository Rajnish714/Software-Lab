import React, { useState, useContext } from "react";
import { StyleSheet, TextInput, Text, View, Button } from "react-native";
import { Data } from "../../utils/Store";
import Infoform from "./Infoform";

export default function Signupform() {
  const { text, onChangeText } = useContext(Data);
  const [visibleForminfo, setVisibleForminfo] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    Phone: "",
    Password: "",
    RePassword: "",
  });

  const handlePhoneChange = (value) => {
    if (value.length <= 10) {
      onChangeText({ ...text, Phone: value.replace(/[^0-9]/g, "") });
    }
  };

  const handleContinue = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    let errors = {};

    if (!text.name) {
      errors.name = "Name is required";
    }
    if (!text.email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(text.email)) {
      errors.email = "Invalid email address";
    }
    if (!text.Phone) {
      errors.Phone = "Phone number is required";
    } else if (!phonePattern.test(text.Phone)) {
      errors.Phone = "Phone number must be 10 digits";
    }
    if (!text.Password) {
      errors.Password = "Password is required";
    }
    if (!text.RePassword) {
      errors.RePassword = "Re-enter password is required";
    } else if (text.Password !== text.RePassword) {
      errors.RePassword = "Passwords do not match";
    }
    if (Object.keys(errors).length === 0) {
      setVisibleForminfo(true);
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Form</Text>
      <TextInput
        style={[styles.input, validationErrors.name && styles.errorBorder]}
        onChangeText={(value) => onChangeText({ ...text, name: value })}
        value={text.name || ""}
        placeholder="Name"
      />
      {!!validationErrors.name && <Text style={styles.error}>{validationErrors.name}</Text>}
      <TextInput
        style={[styles.input, validationErrors.email && styles.errorBorder]}
        onChangeText={(value) => onChangeText({ ...text, email: value })}
        value={text.email || ""}
        type="email"
        placeholder="Email"
      />
      {!!validationErrors.email && <Text style={styles.error}>{validationErrors.email}</Text>}
      <TextInput
        style={[styles.input, validationErrors.Phone && styles.errorBorder]}
        onChangeText={handlePhoneChange}
        value={text.Phone || ""}
        placeholder="Phone Number"
        keyboardType="numeric"
        maxLength={10}
      />
      {!!validationErrors.Phone && <Text style={styles.error}>{validationErrors.Phone}</Text>}
      <TextInput
        style={[styles.input, validationErrors.Password && styles.errorBorder]}
        onChangeText={(value) => onChangeText({ ...text, Password: value })}
        value={text.Password || ""}
        placeholder="Password"
        secureTextEntry={true}
      />
      {!!validationErrors.Password && <Text style={styles.error}>{validationErrors.Password}</Text>}
      <TextInput
        style={[styles.input, validationErrors.RePassword && styles.errorBorder]}
        onChangeText={(value) => onChangeText({ ...text, RePassword: value })}
        value={text.RePassword || ""}
        placeholder="Re-Enter Password"
        secureTextEntry={true}
      />
      {!!validationErrors.RePassword && <Text style={styles.error}>{validationErrors.RePassword}</Text>}
      <Button title="Continue" onPress={handleContinue} />
      <Infoform visibleForminfo={visibleForminfo} setVisibleForminfo={setVisibleForminfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  errorBorder: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 12,
  },
});
