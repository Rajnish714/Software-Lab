import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View, ImageBackground, StyleSheet } from "react-native";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Data } from "../utils/Store";
import Dashboard from "../pages/Dashboard";

const Stack = createStackNavigator();

const images = [
  require("../assets/background1.jpg"),
  require("../assets/background2.jpg"),
  require("../assets/background3.jpg"),
];

export default function Home() {
  const { isAuthenticated } = useContext(Data);
  const [isModelVisible, setModelVisible] = useState(true);
  const [signupModelVisible, setSignupModelVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Dashboard" component={Dashboard} />
        ) : (
          <Stack.Screen name="Login">
            {() => (
              <View style={styles.container}>
                <ImageBackground source={images[activeIndex]} style={styles.image}>
                  <View style={styles.overlay}>
                    <Button
                      title="LOGIN"
                      onPress={() => {
                        setModelVisible(true);
                      }}
                      color="#007BFF"
                      style={styles.button}
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
                      style={styles.signupText}
                    >
                      Create a new account
                    </Text>
                    <Signup signupModelVisible={signupModelVisible} setSignupModelVisible={setSignupModelVisible} />
                  </View>
                </ImageBackground>
              </View>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  signupText: {
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
