import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './output.css'
import { BrowserRouter } from "react-router";
import {AuthProvider} from "./context/useAuth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <AuthProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);
