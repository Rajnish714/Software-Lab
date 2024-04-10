import { Button, Modal, Text } from "react-native";
import Signup from "./Signup";

export default function Login({ isModelVisible, setModelVisible, signupModelVisible, setSignupModelVisible }) {
  return (
    <Modal
      visible={isModelVisible}
      onRequestClose={() => {
        setModelVisible(false);
      }}
      animationType="slide"
    >
      <Text onPress={() => console.log("ye hai hero")}>Login</Text>

      <Button
        title="Close"
        onPress={() => {
          setModelVisible(false);
        }}
      />
      <Text
        onPress={() => {
          setSignupModelVisible(true);
        }}
      >
        Create a new account h
      </Text>
      <Signup signupModelVisible={signupModelVisible} setSignupModelVisible={setSignupModelVisible} />
    </Modal>
  );
}
