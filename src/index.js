// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );



import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
