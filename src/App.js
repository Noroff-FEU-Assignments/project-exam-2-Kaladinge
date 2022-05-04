import "./sass/style.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import Accommodations from "./components/accommodations/Accommodations";
import Accommodation from "./components/accommodation/Accommodation";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";
import AuthProvider from "./context/AuthContext";
import NavMenu from "./components/layout/NavMenu";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="wrapper">
          <NavMenu />
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
        </div>
        <Footer className="footer bg-secondary" />
      </Router>
    </AuthProvider>
  );
}

export default App;
