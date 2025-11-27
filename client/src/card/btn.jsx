import React from 'react';

const Button = ({ label, type , onClick,  }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: '150px',
        height: '40px',
        fontSize: '18px',
        borderRadius: '20px',
        backgroundColor: 'mediumslateblue',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        margin: '10px',
      }}
    >
      {label}
    </button>
  );
};

export default Button;