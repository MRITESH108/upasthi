import React from 'react';
import axios from 'axios'
import Input from './Input';
import Button from './btn';

const CreateStudent = ({ formData, handleChange }) => {
  const fields = [
    { label: "Name", name: "name", type: "text", placeholder: "Upasthi" },
    { label: "Email", name: "email", type: "email", placeholder: "student@example.com" },
    { label: "Address", name: "address", type: "text", placeholder: "123 Main Street" },
    { label: "Start Session Year", name: "startSessionYear", type: "number", placeholder: "2025" },
    { label: "Date of Birth", name: "dob", type: "date" }
  ];

  const url = import.meta.env.VITE_API_URL;

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(`${url}/student/register`, formData);
      console.log('Succesfully Registered :', res.data);
    } catch (err) {
      console.error('Registration  failed:', err);
    }
    
  };

  return (
    <div style={{ marginTop: 20, padding: 15, border: "1px solid #ccc", borderRadius: 8 }}>
      <h1>Create Student</h1>
      {fields.map(({ label, name, type, placeholder }) => (
        <Input
          key={name}
          label={label}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
        />
      ))}
      <Button label="Create Student" type="submit" onClick={handleSubmit} />
    </div>
  );
};

export default CreateStudent;