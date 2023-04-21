import React from "react";

const NavBar = () => {
  return (
    <nav className="w-screen flex j justify-between p-8 shadow-md">
      <h1 className="font-bold text-3xl">
        Where in the world you want to see ?
      </h1>
      <div>
        <p>DarkMode</p>
      </div>
    </nav>
  );
};

export default NavBar;
