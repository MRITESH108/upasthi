import React from 'react';

const Button = ({ label, type , onClick,  }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
        fontSize: '18px',
        borderRadius: '20px',
        backgroundColor: 'mediumslateblue',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        // margin: '',
      }}
    >
      {label}
    </button>
  );
};

export default Button;