import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";

import { ThemeProvider } from "./context/theme.context";
// import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
