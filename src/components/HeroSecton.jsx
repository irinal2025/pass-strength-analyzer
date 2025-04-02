import React, { useRef } from "react";
import "./HeroSection.css"; // Luo erillinen CSS-tiedosto

const HeroSection = ({ scrollToTest }) => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="overlay"></div>
      </div>

      <div className="hero-content">
        <h1>Test Your Password Strength</h1>
        <p>Check if your passwords are secure and get tips on creating stronger ones.</p>
        <button className="hero-button" onClick={scrollToTest}>Try Now</button>
      </div>
    </section>
  );
};

export default HeroSection;
