import React from "react";
import logo from "../../images/secondary-logo.png";
import instagram from "../../images/instagram-icon.png";
import youtube from "../../images/youtube-icon.png";
import facebook from "../../images/facebook-icon.png";

function Footer() {
  return (
    <div className="footer bg-secondary mt-4">
      <img src={logo} alt="footer-logo" className="footer--logo" />
      <div>Holidaze 2022</div>
      <div>
        <img src={instagram} alt="footer-instagram" className="footer--icon" />
        <img src={youtube} alt="footer-youtube" className="footer--icon" />
        <img src={facebook} alt="footer-facebook" className="footer--icon" />
      </div>
    </div>
  );
}

export default Footer;
