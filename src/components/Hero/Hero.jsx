import React from "react";
import "./Hero.scss";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="hero hero__container" id="home">
      <div className="hero__txt">
        <h1>
          Find Your Next <br /> Perfect Place to <br /> Live.
        </h1>

        <Link to="#contact">Contact Us</Link>
      </div>
    </section>
  );
};
