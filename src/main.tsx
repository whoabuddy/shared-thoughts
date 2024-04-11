import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import theme from "./utils/theme.ts";
import { ColorModeScript } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>
);
