import React from "react";
import Header from "../../pages/header/Header";
import Footer from "../../pages/footer/Footer";
import RareSpecies from "./RareSpecies/RareSpecies";

const System = () => {
  return (
    <div className="system">
      <div className="system">
        <Header />
        <RareSpecies />
        <Footer />
      </div>
    </div>
  );
};

export default System;
