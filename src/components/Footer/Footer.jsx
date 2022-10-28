import React from "react";
import "./Footer.scss";
import { Link } from "react-scroll";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

export const Footer = () => {
  const links = [
    {
      id: 1,
      link: "/",
      title: "Intro",
    },
    {
      id: 2,
      link: "/",
      title: "About",
    },
    {
      id: 3,
      link: "/",
      title: "Mortage",
    },
    {
      id: 4,
      link: "/",
      title: "Contact",
    },
  ];

  const socials = [
    {
      id: 1,
      link: "https://www.instagram.com/",
      icon: <InstagramIcon className="icon" color="#4b4c4d" />,
    },
    {
      id: 2,
      link: "https://www.facebook.com/",
      icon: <FacebookIcon className="icon" color="#4b4c4d" />,
    },
    {
      id: 3,
      link: "https://twitter.com/",
      icon: <TwitterIcon className="icon" color="#4b4c4d" />,
    },
    {
      id: 4,
      link: "https://telegram.org/",
      icon: <TelegramIcon className="icon" color="#4b4c4d" />,
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__social">
        {socials.map(({ id, link, icon }) => (
          <a href={link} key={id}>
            {icon}
          </a>
        ))}
      </div>

      <ul className="footer__list">
        {links.map(({ id, link, title }) => (
          <li key={id}>
            <Link to={link}>{title}</Link>
          </li>
        ))}
      </ul>
      <p className="footer__copyright">&copy; All Rights Reserved.</p>
    </footer>
  );
};
