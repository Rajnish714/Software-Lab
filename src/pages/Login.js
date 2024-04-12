// import React, { useContext, useState } from "react";
// import { Button, Modal, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
// import { FontAwesome5, Ionicons } from "@expo/vector-icons"; // Import icons from FontAwesome5 and Ionicons
// import Signup from "./Signup";
// import { Data } from "../utils/Store";

// export default function Login({ isModelVisible, setModelVisible, signupModelVisible, setSignupModelVisible }) {
//   const { text, onChangeText } = useContext(Data);

//   const handleEmailChange = (value) => {
//     onChangeText({ ...text, email: value });
//   };

//   const handlePasswordChange = (value) => {
//     onChangeText({ ...text, password: value });
//   };

//   const handleLogin = () => {
//     // Add your login logic here

//     console.log(text);
//   };

//   return (
//     <Modal
//       visible={isModelVisible}
//       onRequestClose={() => {
//         setModelVisible(false);
//       }}
//       animationType="slide"
//     >
//       <View style={styles.container}>
//         <Text style={styles.title}>Login</Text>
//         <TextInput
//           style={styles.input}
//           onChangeText={handleEmailChange}
//           value={text.email || ""}
//           placeholder="Enter Email"
//         />

//         <TextInput
//           style={styles.input}
//           onChangeText={handlePasswordChange}
//           value={text.password}
//           placeholder="Enter Password"
//           secureTextEntry={true}
//         />

//         <Button title="Login" onPress={handleLogin} />

//         <Button
//           title="Close"
//           onPress={() => {
//             setModelVisible(false);
//           }}
//         />

//         {/* Google Login */}
//         <TouchableOpacity style={styles.iconContainer}>
//           <FontAwesome5 name="google" size={24} color="red" />
//           <Text style={styles.iconText}>Login with Google</Text>
//         </TouchableOpacity>

//         {/* Facebook Login */}
//         <TouchableOpacity style={styles.iconContainer}>
//           <Ionicons name="logo-facebook" size={24} color="blue" />
//           <Text style={styles.iconText}>Login with Facebook</Text>
//         </TouchableOpacity>

//         <Text
//           style={styles.signupText}
//           onPress={() => {
//             setSignupModelVisible(true);
//           }}
//         >
//           Create a new account
//         </Text>
//         <Signup signupModelVisible={signupModelVisible} setSignupModelVisible={setSignupModelVisible} />
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//   },
//   signupText: {
//     marginTop: 20,
//     color: "blue",
//     textDecorationLine: "underline",
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   iconText: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
// });

import React, { useContext, useState } from "react";
import { Button, Modal, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons"; // Import icons from FontAwesome5 and Ionicons
import Signup from "./Signup";
import { Data } from "../utils/Store";
import axios from "axios";

export default function Login({ isModelVisible, setModelVisible, signupModelVisible, setSignupModelVisible }) {
  const { text, onChangeText, setAuthenticated } = useContext(Data);

  const handleEmailChange = (value) => {
    onChangeText({ ...text, email: value });
  };

  const handlePasswordChange = (value) => {
    onChangeText({ ...text, password: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.13:3000/user/login", text);
      console.log("Response:", response.data);
      if (response.data.islogin == false) {
        setAuthenticated(false);
      } else {
        setAuthenticated(response.data.islogin);
      }
    } catch (err) {
      console.log("Error:", err);
      if (err.response) {
        console.log("Response data:", err.response.data);
        console.log("Response status:", err.response.status);
        console.log("Response headers:", err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.log("No response received:", err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error setting up the request:", err.message);
      }
    }
  };

  return (
    <Modal
      visible={isModelVisible}
      onRequestClose={() => {
        setModelVisible(false);
      }}
      animationType="slide"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login Form</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleEmailChange}
          value={text.email || ""}
          placeholder="Enter Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={handlePasswordChange}
          value={text.password}
          placeholder="Enter Password"
          secureTextEntry={true}
        />
        <Button style={styles.button} title="Login" onPress={handleLogin} />
        <Button
          style={styles.button}
          title="Close"
          onPress={() => {
            setModelVisible(false);
          }}
        />

        <TouchableOpacity style={styles.iconContainer}>
          <FontAwesome5 name="google" size={24} color="red" />
          <Text style={styles.iconText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="logo-facebook" size={24} color="blue" />
          <Text style={styles.iconText}>Login with Facebook</Text>
        </TouchableOpacity>
        <Text
          style={styles.signupText}
          onPress={() => {
            setSignupModelVisible(true);
          }}
        >
          Create a new account
        </Text>
        <Signup signupModelVisible={signupModelVisible} setSignupModelVisible={setSignupModelVisible} />
      </View>
    </Modal>
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
    textAlign: "center",
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
  signupText: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconText: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    marginVertical: 100,
  },
});
