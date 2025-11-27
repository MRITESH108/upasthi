import React, { useState } from 'react';
import axios from 'axios';
import Input from '../card/Input';
import Button from '../card/btn';

const Login = () => {
  const url = import.meta.env.VITE_API_URL;


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/college/login`, formData);
      console.log('Login success:', res.data);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        <Button label={'Login'} type={'submit'} />
      </form>
    </div>
  );
};

export default Login;