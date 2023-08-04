import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Player } from "./Player/Player.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Player />
  </React.StrictMode>
);
