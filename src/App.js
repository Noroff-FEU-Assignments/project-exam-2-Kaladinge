import "./App.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import Accommodations from "./components/accommodations/Accommodations";
import Accommodation from "./components/accommodation/Accommodation";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";

function App() {
  return (
    <Router>
      <Navbar expand="lg" className="p-4 bg-dark navbar-dark">
        <Container>
          <NavLink to="/" className="text-decoration-none">
            <Navbar.Brand>My logo</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-5">
              <NavLink to="/accommodations" className="nav-link">
                Accommodations
              </NavLink>
            </Nav>
            <Nav className="mx-5">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </Nav>
            <Nav className="mx-5">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/accommodation/:title" element={<Accommodation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
