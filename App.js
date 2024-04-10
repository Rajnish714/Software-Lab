import { useState } from "react";
import { View, Button, Text } from "react-native";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import StoreProvider from "./src/utils/Store";

export default function App() {
  const [isModelVisible, setModelVisible] = useState(false);
  const [signupModelVisible, setSignupModelVisible] = useState(false);

  return (
    <StoreProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text></Text>
        <Button
          title="Press"
          onPress={() => {
            setModelVisible(true);
          }}
        />
        <Login
          isModelVisible={isModelVisible}
          setModelVisible={setModelVisible}
          signupModelVisible={signupModelVisible}
          setSignupModelVisible={setSignupModelVisible}
        />

        <Text
          onPress={() => {
            setSignupModelVisible(true);
          }}
        >
          Create a new account
        </Text>
        <Signup signupModelVisible={signupModelVisible} setSignupModelVisible={setSignupModelVisible} />
      </View>
    </StoreProvider>
  );
}
