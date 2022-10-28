import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks";
import logo from "../../asserts/images/logo.png";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import LogoutIcon from "@mui/icons-material/Logout";

export const Sidebar = () => {
  const { setLogout } = useLogout();

  const links = [
    {
      id: 1,
      link: "/",
      icon: <BusinessCenterIcon className="icon" />,
      title: "Company",
    },
    {
      id: 2,
      link: "/complex",
      icon: <BusinessIcon className="icon" />,
      title: "Complex",
    },
    {
      id: 3,
      link: "/room",
      icon: <WorkspacesIcon className="icon" />,
      title: "Room",
    },
  ];

  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/" className="sidebar__logo">
            <img src={logo} alt="logo" />
            <span>Real Estate</span>
          </Link>
        </li>
        {links.map(({ id, link, icon, title }) => (
          <li key={id}>
            <Link to={link}>
              {icon}
              <span className="sidebar__nav-item">{title}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link className="sidebar__logout" onClick={() => setLogout(true)}>
            <LogoutIcon className="icon" />
            <span className="sidebar__nav-item">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
