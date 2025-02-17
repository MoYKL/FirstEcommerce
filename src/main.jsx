import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "flowbite";
import "./index.css";
import App from "./App.jsx";
import TokenContextProvider from "./components/Context/TokenContext.jsx";
import CartContextProvider from "./components/Context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <TokenContextProvider>
    <CartContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartContextProvider>
  </TokenContextProvider>
);
