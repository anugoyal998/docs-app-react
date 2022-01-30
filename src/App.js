import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Editor from "./components/Editor/Editor";
import Home from "./components/home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/:id" element={<Editor />} />
      </Routes>
    </Router>
  );
};

export default App;
