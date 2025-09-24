import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import Send_token from "./Send_token.jsx";
// import Request_airdrop from "./Request_airdrop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <Send_token />
    <Request_airdrop /> */}
  </StrictMode>
);
