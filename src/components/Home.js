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
    backgroundColor: "rgba(0,0,0,0.5)", // Overlay color for the content
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12, // Adjust the vertical padding
    paddingHorizontal: 24, // Adjust the horizontal padding
    marginBottom: 10, // Add margin to the bottom
  },
  signupText: {
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

// import React, { useContext, useState, useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { Button, Text, View, ImageBackground, StyleSheet } from "react-native";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import { Data } from "../utils/Store";
// import Dashboard from "../pages/Dashboard";

// const Stack = createStackNavigator();

// const images = [
//   require("../assets/background1.jpg"),
//   require("../assets/background2.jpg"),
//   require("../assets/background3.jpg"),
// ];

// export default function Home() {
//   const { isAuthenticated } = useContext(Data);
//   const [isModelVisible, setModelVisible] = useState(true);
//   const [signupModelVisible, setSignupModelVisible] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {isAuthenticated ? (
//           <Stack.Screen name="Dashboard" component={Dashboard} />
//         ) : (
//           <Stack.Screen name="Login">
//             {() => (
//               <View style={styles.container}>
//                 <ImageBackground source={images[activeIndex]} style={styles.image}>
//                   <View style={styles.content}>
//                     <Button
//                       title="Press"
//                       onPress={() => {
//                         setModelVisible(true);
//                       }}
//                     />
//                     <Login
//                       isModelVisible={isModelVisible}
//                       setModelVisible={setModelVisible}
//                       signupModelVisible={signupModelVisible}
//                       setSignupModelVisible={setSignupModelVisible}
//                     />
//                     <Text
//                       onPress={() => {
//                         setSignupModelVisible(true);
//                       }}
//                       style={styles.signupText}
//                     >
//                       Create a new account
//                     </Text>
//                     <Signup signupModelVisible={signupModelVisible} setSignupModelVisible={setSignupModelVisible} />
//                   </View>
//                 </ImageBackground>
//               </View>
//             )}
//           </Stack.Screen>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   signupText: {
//     marginTop: 20,
//     color: "#007BFF",
//     fontSize: 16,
//     textDecorationLine: "underline",
//   },
// });

// import React, { useContext, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { Button, Text, View } from "react-native";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import { Data } from "../utils/Store";
// import Dashboard from "../pages/Dashboard";

// const Stack = createStackNavigator();

// export default function Home() {
//   // Retrieve isAuthenticated from Data context
//   const { isAuthenticated } = useContext(Data);
//   const [isModelVisible, setModelVisible] = useState(true);
//   const [signupModelVisible, setSignupModelVisible] = useState(false);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {isAuthenticated ? (
//           <Stack.Screen name="Dashboard" component={Dashboard} />
//         ) : (
//           <Stack.Screen name="Login">
//             {() => (
//               <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <Button
//                   title="Press"
//                   onPress={() => {
//                     setModelVisible(true);
//                   }}
//                 />
//                 <Login
//                   isModelVisible={isModelVisible}
//                   setModelVisible={setModelVisible}
//                   signupModelVisible={signupModelVisible}
//                   setSignupModelVisible={setSignupModelVisible}
//                 />
//                 <Text
//                   onPress={() => {
//                     setSignupModelVisible(true);
//                   }}
//                 >
//                   Create a new account
//                 </Text>
//                 <Signup signupModelVisible={signupModelVisible} setSignupModelVisible={setSignupModelVisible} />
//               </View>
//             )}
//           </Stack.Screen>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
