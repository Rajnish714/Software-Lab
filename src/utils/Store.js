import { React, createContext, useState } from "react";

export const Data = createContext();

export default function StoreProvider({ children }) {
  const [text, onChangeText] = useState({ name: "", email: "", Phone: "", Password: "", RePassword: "" });

  return <Data.Provider value={{ text, onChangeText }}>{children}</Data.Provider>;
}
