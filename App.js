// App.js
import Home from "./src/components/Home";
import StoreProvider from "./src/utils/Store";
import "./i";

export default function App() {
  return (
    <StoreProvider>
      <Home />
    </StoreProvider>
  );
}
