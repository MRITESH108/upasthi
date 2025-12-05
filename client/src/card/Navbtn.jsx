import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Navbtn = ({ title, path }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        cursor: 'pointer',
        borderRadius: '20px',
        justifyContent: 'center',
        width: '80px',
        backgroundColor: isActive || hover ? 'rgba(249, 156, 63, 0.66)' : 'rgba(56, 55, 54, 1)',
        color: isActive || hover ? 'black' : 'white',
        transition: "0.2s",
        padding:'1px 6px'
      }}
    >
      {title}
    </div>
  );
};

export default Navbtn;