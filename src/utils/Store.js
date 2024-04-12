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
    state: "New York",
    zip_code: "",
    registration_proof: "",
    business_hours: {
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
