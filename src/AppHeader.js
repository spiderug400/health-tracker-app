import React from "react";
import logo from "./NHTapp_logo.png";

const AppHeader = () => (
  <header className="text-center py-4 bg-blue-600 text-white text-xl font-bold rounded-lg shadow-md mb-4 flex flex-col items-center">
    <img src={logo} alt="NHT App Logo" className="w-16 h-16 mb-2" />
    NHTapp
  </header>
);

export default AppHeader;
