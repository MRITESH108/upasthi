import React, { useState } from 'react';
import axios from 'axios'
import Input from './Input';
import Button from './btn';

const CreateAdmin = () => {
  const fields = [
    { label: "Name", name: "name", type: "text", placeholder: "Upasthi" },
    { label: "Email", name: "email", type: "email", placeholder: "student@example.com" },
    { label: "Address", name: "address", type: "text", placeholder: "123 Main Street" },
    { label: "Password", name: "password", type: "password", placeholder: "Enter Password" },
    { label: "Date of join", name: "doj", type: "date" }
  ];

  const [formData, setFormData] = useState({
      name: '',
      email: '',
      address: '',
      password: '',
      doj: ''
    });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const url = import.meta.env.VITE_API_URL;

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(`${url}/admin/register`, formData);
      console.log('Succesfully Registered :', res.data);
    } catch (err) {
      console.error('Registration  failed:', err);
    }
    
  };

  return (
    <div style={{ marginTop: 20, padding: 15, border: "1px solid #ccc", borderRadius: 8 }}>
      <h1>Create Admin</h1>
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
      <Button label="Create Admin" type="submit" onClick={handleSubmit} />
    </div>
  );
}

export default CreateAdmin;