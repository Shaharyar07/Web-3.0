import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TransactionProvider } from "./Context/TransactionContext";

ReactDOM.render(
  <BrowserRouter>
    <TransactionProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TransactionProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
