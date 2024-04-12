// import React, { createContext, useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const Data = createContext();

// export default function StoreProvider({ children }) {
//   const [isAuthenticated, setAuthenticated] = useState(true);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     // Load isAuthenticated state from AsyncStorage when component mounts
//     loadAuthenticatedState();
//   }, []);

//   useEffect(() => {
//     // Save isAuthenticated state to AsyncStorage whenever it changes
//     saveAuthenticatedState();
//   }, [isAuthenticated]);

//   const loadAuthenticatedState = async () => {
//     try {
//       const value = await AsyncStorage.getItem("isAuthenticated");
//       if (value !== null) {
//         setAuthenticated(JSON.parse(value));
//       }
//     } catch (error) {
//       console.error("Error loading isAuthenticated state:", error);
//     }
//   };

//   const saveAuthenticatedState = async () => {
//     try {
//       await AsyncStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
//     } catch (error) {
//       console.error("Error saving isAuthenticated state:", error);
//     }
//   };

//   const [text, onChangeText] = useState({
//     name: "",
//     email: "",
//     Phone: "",
//     password: "",
//     RePassword: "",
//     Role: "farmer",
//     business_name: "",
//     informal_name: "",
//     address: "",
//     city: "",
//     state: "New York",
//     zip_code: "",
//     registration_proof: "",
//     business_hours: {
//       mon: [],
//       tue: [],
//       wed: [],
//       thu: [],
//       fri: [],
//       sat: [],
//       sun: [],
//     },
//     type: "email/facebook/google/apple",
//     social_id: "",
//   });

//   return (
//     <Data.Provider value={{ text, onChangeText, isAuthenticated, setAuthenticated, username, setUsername }}>
//       {children}
//     </Data.Provider>
//   );
// }

import { React, createContext, useEffect, useState } from "react";

export const Data = createContext();

export default function StoreProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  const [text, onChangeText] = useState({
    name: "",
    email: "",
    Phone: "",
    password: "",
    RePassword: "",
    Role: "farmer",
    business_name: "",
    informal_name: "",
    address: "",
    city: "",
    state: "New York", // Default state
    zip_code: "",
    registration_proof: "",
    business_hours: {
      // Ensure 'business_hours' is initialized
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    },
    type: "email/facebook/google/apple",
    social_id: "",
  });

  return (
    <Data.Provider value={{ text, onChangeText, isAuthenticated, setAuthenticated, username, setUsername }}>
      {children}
    </Data.Provider>
  );
}
