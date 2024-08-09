import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Memos from "./Memos.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="layout">
      <div className="sidebar">1</div>
      <div className="body">
        <Memos />
      </div>
    </div>
  </React.StrictMode>
);
