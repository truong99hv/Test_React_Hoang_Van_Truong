import React, { memo } from "react";
import "./css/footer.css";

const Footer = memo(() => {
  return (
    <div className="footer container-fluid ">
      <div className="year">© 2021</div>
      <div className="version">Phiên bản 1.0.0</div>
    </div>
  );
});

export default Footer;
