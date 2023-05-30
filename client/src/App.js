import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import Output from "./components/Output";
import Navbar from "./components/Navbar";
import AllData from "./components/AllData";
import "./App.css";

function App() {
  // const data = [5, 8, 12, 6, 10];

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
            <div className="App">
              <Index />
            </div>
          }
        />
        <Route path="/Graph" element={<Output />} />
        <Route path="/alldata" element={<AllData />} />
      </Routes>
    </Router>
  );
}

export default App;
