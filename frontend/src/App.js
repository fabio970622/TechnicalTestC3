import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRecord from "./Component/AddRecord";
import Home from "./pages/Home";
import "./App.css";
import Bar from "./Layout/Bar";

function App() {
  return (
    <div className="App">
      <Router>
        <Bar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addrecord" element={<AddRecord />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
