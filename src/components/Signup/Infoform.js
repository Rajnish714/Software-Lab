import React, { useContext, useState } from "react";
import { Text, Button, Modal, TextInput, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Data } from "../../utils/Store";
import BusinessHour from "./BusinessHour";

function Infoform({ visibleForminfo, setVisibleForminfo }) {
  const { text, onChangeText } = useContext(Data);
  const [visibleBusinessHour, setVisibleBusinessHour] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    business_name: "",
    informal_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const handleContinue = () => {
    let errors = {};

    if (!text.business_name) {
      errors.business_name = "Business Name is required";
    }
    if (!text.informal_name) {
      errors.informal_name = "Informal Name is required";
    }
    if (!text.address) {
      errors.address = "Address is required";
    }
    if (!text.city) {
      errors.city = "City is required";
    }
    if (!text.state) {
      errors.state = "State is required";
    }
    if (!text.zip_code) {
      errors.zip_code = "Zip Code is required";
    }

    if (Object.keys(errors).length === 0) {
      setVisibleBusinessHour(true);
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <Modal
      visible={visibleForminfo}
      onRequestClose={() => {
        setVisibleForminfo(false);
      }}
      animationType="slide"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Business Information Form</Text>
        <TextInput
          style={[styles.input, validationErrors.business_name && styles.errorBorder]}
          onChangeText={(value) => onChangeText({ ...text, business_name: value })}
          value={text.business_name}
          placeholder="Business Name"
        />
        {!!validationErrors.business_name && <Text style={styles.error}>{validationErrors.business_name}</Text>}
        <TextInput
          style={[styles.input, validationErrors.informal_name && styles.errorBorder]}
          onChangeText={(value) => onChangeText({ ...text, informal_name: value })}
          value={text.informal_name}
          placeholder="Informal Name"
        />
        {!!validationErrors.informal_name && <Text style={styles.error}>{validationErrors.informal_name}</Text>}
        <TextInput
          style={[styles.input, validationErrors.address && styles.errorBorder]}
          onChangeText={(value) => onChangeText({ ...text, address: value })}
          value={text.address}
          placeholder="Address"
        />
        {!!validationErrors.address && <Text style={styles.error}>{validationErrors.address}</Text>}
        <TextInput
          style={[styles.input, validationErrors.city && styles.errorBorder]}
          onChangeText={(value) => onChangeText({ ...text, city: value })}
          value={text.city}
          placeholder="City"
        />
        {!!validationErrors.city && <Text style={styles.error}>{validationErrors.city}</Text>}
        <Picker
          style={[styles.input, validationErrors.state && styles.errorBorder]}
          selectedValue={text.state}
          onValueChange={(itemValue, itemIndex) => onChangeText({ ...text, state: itemValue })}
        >
          <Picker.Item label="New York" value="New York" />
        </Picker>
        {!!validationErrors.state && <Text style={styles.error}>{validationErrors.state}</Text>}
        <TextInput
          style={[styles.input, validationErrors.zip_code && styles.errorBorder]}
          onChangeText={(value) => onChangeText({ ...text, zip_code: value })}
          value={text.zip_code}
          placeholder="Zip Code"
        />
        {!!validationErrors.zip_code && <Text style={styles.error}>{validationErrors.zip_code}</Text>}
        <Button title="Continue" onPress={handleContinue} />

        <BusinessHour visibleBusinessHour={visibleBusinessHour} setVisibleBusinessHour={setVisibleBusinessHour} />

        <Button
          title="Close"
          onPress={() => {
            setVisibleForminfo(false);
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  errorBorder: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
  },
});

export default Infoform;
