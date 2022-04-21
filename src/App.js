import "./sass/style.scss";
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
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function App() {
  return (
    <Router>
      <Navbar expand="lg" className="bg-dark navbar-dark position-relative">
        <NavLink to="/" className="d-lg-none">
          <Navbar.Brand>mobile</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex flex-column flex-lg-row justify-content-around w-100">
            <NavLink to="/" className="text-decoration-none d-none d-lg-block">
              <Navbar.Brand>desktop</Navbar.Brand>
            </NavLink>
            <Nav className="">
              <NavLink to="/accommodations" className="nav-link">
                Accommodations
              </NavLink>
            </Nav>
            <Form action="/action_page.php" className="w-50">
              <FormControl
                type="text"
                placeholder="Search accommodation"
                name="search"
              />
            </Form>
            <Nav className="">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </Nav>
            <Nav className="">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/accommodation/:id" element={<Accommodation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
