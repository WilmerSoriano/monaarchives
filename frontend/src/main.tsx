import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// @ts-ignore CSS is loaded by the bundler; TypeScript has no declaration for it.
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>
);