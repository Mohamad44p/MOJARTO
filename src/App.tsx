import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Bottombar from "./components/shared/Bottombar";
import { Lamp } from "./components/shared/Lamp";
import Navbar from "./components/shared/Navbar";
import { Newest } from "./components/shared/Newest";
import Footer from "./components/shared/Footer";
import { HowitsWork } from "./components/shared/HowitsWork";

function App() {
  return (
    <Router basename="/"> 
      <>
        <Navbar />
        <Lamp />
        <Newest />
        <HowitsWork/>
        <Bottombar />
        <Footer />
      </>
    </Router>
  );
}

export default App;
