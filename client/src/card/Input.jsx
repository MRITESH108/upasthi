import React from 'react';

const Input = ({ label, name, type, value, onChange, placeholder }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
        padding: '5px'
      }}
    >
      <label
        htmlFor={name}
        style={{
          marginLeft: '10px',
          marginBottom: '5px',
          fontWeight: 'bold'
        }}
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '400px',
          height: '30px',
          fontSize: '20px',
          borderRadius: '20px',
          backgroundColor: 'plum',
          border: '1px solid #ccc',
          padding: '5px 10px'
        }}
      />
    </div>
  );
};

export default Input;