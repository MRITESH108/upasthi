import React, { useState } from 'react';
import axios from 'axios';
import Input from '../card/Input';
import Button from '../card/btn';

const Signup = () => {
  const url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: '',
    collegeCode: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(`${url}/college/register`, formData);
      console.log('Signup success:', res.data);
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <Input
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Upasthi Institute of Technology"
        />
        <Input
          label="College Code"
          name="collegeCode"
          type="text"
          value={formData.collegeCode}
          onChange={handleChange}
          placeholder="college code 35645"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="abc@gmail.com"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
        />

        <Button label={'SignUp'} type={'submit'} />
      </form>
    </div>
  );
};

export default Signup;