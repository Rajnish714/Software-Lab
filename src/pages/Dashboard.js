import React, { useContext } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { Data } from "../utils/Store";

export default function Dashboard() {
  const { setAuthenticated } = useContext(Data);

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Button title="Logout" onPress={handleLogout} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
