import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import "../components/Navbar.css";

const handleLogout = (props) => {
  logout().then(() => {
    props.setUser(null);
  });
};

const Navbar = (props) => {
  return (
    <nav className="navbar-dummy">
      <div className="navbar-logo">
        <div className="logo-home">
          <img src="/images/book-icon-ed.png" alt="logo-bookify" />
          <p>Bookify</p>
        </div>
      </div>
      <div className="navbar-panel">
        {props.user && <p>Hello {props.user.username}</p>}
        {props.user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/" onClick={() => handleLogout(props)}>
              Logout
            </Link>
          </>
        ) : (
          <>{false}</>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
