import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import logo from "../../asserts/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    {
      id: 1,
      link: "#home",
      title: "Intro",
    },
    {
      id: 2,
      link: "#about",
      title: "About",
    },
    {
      id: 3,
      link: "#mortage",
      title: "Mortage",
    },
    {
      id: 4,
      link: "#contact",
      title: "Contact",
    },
  ];
  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        <img src={logo} alt="logo" />
        <span>Real Estate</span>
      </Link>

      <ul className={`navbar__list ${open && "open"}`}>
        {links.map(({ id, link, title }) => (
          <li key={id}>
            <Link to={link}>{title}</Link>
          </li>
        ))}
      </ul>

      <div className="navbar__main">
        <Link to="/login" className="navbar__log">
          Sign In
        </Link>
        <MenuIcon
          className="navbar__bx navbar__bx-menu"
          id="menu-icon"
          onClick={() => setOpen(!open)}
        />
      </div>
    </header>
  );
};
