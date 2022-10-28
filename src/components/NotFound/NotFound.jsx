import React from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";
import notfound from "../../asserts/images/404.webp";

export const NotFound = () => {
  return (
    <section className="notfound">
      <div className="notfound__container">
        <img src={notfound} alt="notfound" />
        <h1>Page Not Found</h1>
        <p>
          Sorry can't find the page you are looking for click{" "}
          <Link to="/">here</Link> to come back to home page.
        </p>
      </div>
    </section>
  );
};
