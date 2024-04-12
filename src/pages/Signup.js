import React from "react";
import { Button, Modal, Text } from "react-native";
import Signupform from "../components/Signup/Signupform";

export default function Signup({ signupModelVisible, setSignupModelVisible }) {
  return (
    <Modal
      visible={signupModelVisible}
      onRequestClose={() => {
        setSignupModelVisible(false);
      }}
      animationType="slide"
    >
      <Text>Signup</Text>
      <Signupform />

      <Button
        title="Close"
        onPress={() => {
          setSignupModelVisible(false);
        }}
      />
    </Modal>
  );
}
