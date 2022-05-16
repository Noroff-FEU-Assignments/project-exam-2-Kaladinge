import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import SearchBar2 from "./SearchBar2";
import logo from "../../images/primary-logo.png";

function NavMenu() {
  const [token, setToken] = useContext(AuthContext);
  const [backgroundColor, setBackgroundColor] = useState("bg-light");
  const [navColor, setNavColor] = useState("navbar-light");
  const [logoColor, setLogoColor] = useState("");

  const navigate = useNavigate();

  function logOut() {
    navigate("/");
    setToken(null);
  }

  document.onscroll = function() {
    if (document.documentElement.scrollTop > 10) {
      setBackgroundColor("bg-dark")
      setLogoColor("text-white")
      setNavColor("navbar-dark")} 
    else {
      setBackgroundColor("bg-light")
      setNavColor("navbar-light")
      setLogoColor("")
    }
  } 
  

  return (
    <Navbar expand="lg" className={`${backgroundColor} ${navColor} position-fixed w-100`}>
      <NavLink to="/" className="d-lg-none border">
        <Navbar.Brand>
          <img src={logo} alt="desktop-logo" className="desktop-logo--image" />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="d-flex flex-column flex-lg-row justify-content-around w-100 align-items-center">
          <NavLink to="/" className="text-decoration-none d-none d-lg-block">
            <Navbar.Brand className="d-block text-center">
              <img
                src={logo}
                alt="desktop-logo"
                className="desktop-logo--image"
              />
              <h1 className={`text-uppercase desktop-logo--text ${logoColor}`}>Holidaze</h1>
            </Navbar.Brand>
          </NavLink>
          <Nav className="">
            <NavLink to="/accommodations" className="nav-link">
              Accommodations
            </NavLink>
          </Nav>

          <SearchBar2 />

          <Nav className="">
            {token ? (
              <NavLink to="/admin" className="nav-link">
                Admin
              </NavLink>
            ) : (
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            )}
          </Nav>
          <Nav className="">
            {token ? (
              <Button onClick={logOut}>Log out</Button>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavMenu;
