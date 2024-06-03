import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './regi.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      console.log('Registered with:', res.data);
      setUsername('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <p>Kindly fill in this form to register.</p>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <center><Link to='/'>Login</Link></center>
      </form>
    </div>
  );
};

export default Register;
