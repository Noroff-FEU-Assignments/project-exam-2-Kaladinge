import "./sass/style.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./components/home/HomePage";
import AdminPage from "./components/admin/AdminPage";
import AccommodationsPage from "./components/accommodations/AccommodationsPage";
import AccommodationPage from "./components/accommodation/AccommodationPage";
import ContactPage from "./components/contact/ContactPage";
import LoginPage from "./components/login/LoginPage";
import AuthProvider from "./context/AuthContext";
import NavMenu from "./components/layout/NavMenu";
import Footer from "./components/layout/Footer";
import EditPostPage from "./components/admin/authActions/EditPostPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="wrapper">
          <NavMenu />
          <Container className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/accommodations" element={<AccommodationsPage />} />
              <Route
                path="/accommodation/:id"
                element={<AccommodationPage />}
              />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/edit/:id" element={<EditPostPage />} />
            </Routes>
          </Container>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
