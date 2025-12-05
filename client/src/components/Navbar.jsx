import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbtn from '../card/Navbtn';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Service", path: "/service" },
    { title: "College", path: "/colleges" },
    { title: "Student", path: "/students" },
    { title: "Login", path: "/login" },
    { title: "SignUp", path: "/signup" }
  ];

  const filteredItems = location.pathname === "/"
    ? navItems.filter(item => item.title !== "Home")
    : navItems;

  return (
    <div
      style={{
        display: 'flex',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5%',
        margin: '15px',
        height: '50px'
      }}
    >
      {filteredItems.map((item, index) => (
        <Navbtn  key={index} title={item.title} path={item.path} />
      ))}
    </div>
  );
};

export default Navbar;


