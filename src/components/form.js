import { React, useContext } from "react";
import { StyleSheet, TextInput, Text, View, Button } from "react-native";
import { Data } from "../utils/Store";

export default function Form() {
  const { text, onChangeText } = useContext(Data);
  const handleSubmit = () => {
    console.log(text);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeText({ ...text, name: value })}
        value={text.name}
        placeholder="Name"
        Required
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeText({ ...text, email: value })}
        value={text.email}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeText({ ...text, Phone: value.replace(/[^0-9]/g, "") })}
        value={text.Phone}
        placeholder="Phone Number"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeText({ ...text, Password: value })}
        value={text.Password}
        placeholder="Password"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeText({ ...text, RePassword: value })}
        value={text.RePassword}
        placeholder="Re-Enter Password"
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text>{text.name}</Text>
      <Text>{text.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
