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
        <div className="logo-group">
          <img src="/images/book-icon-ed.png" alt="logo-bookify" />
          <p>bookify</p>
        </div>
      </div>
      <div className="navbar-panel">
        <Link to="/">Home</Link>
        {props.user && <p>Hello {props.user.username}</p>}
        {props.user ? (
          <>
            <Link to="/profile">My profile</Link>
            <Link to="/" onClick={() => handleLogout(props)}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
