import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Programs from "../../components/Programs/Programs";
import Title from "../../components/Title/Title";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container">
        <Title subTitle="Our Program" title="What we offer" />
        <Programs />
        <About />
        <Footer />
      </div>
    </div>
  );
};

export default App;