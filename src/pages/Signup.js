import { Button, Modal, Text } from "react-native";
import Form from "../components/form";
import { useState } from "react";
export default function Signup({ signupModelVisible, setSignupModelVisible }) {
  const [signupFilled, setSignupFilled] = useState(false);
  return (
    <Modal
      visible={signupModelVisible}
      onRequestClose={() => {
        setSignupModelVisible(false);
      }}
      animationType="slide"
    >
      <Text>Signup</Text>
      <Form />

      <Button
        title="Close"
        onPress={() => {
          setSignupModelVisible(false);
        }}
      />
    </Modal>
  );
}
