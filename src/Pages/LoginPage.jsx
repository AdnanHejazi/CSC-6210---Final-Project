/*
  This component manages user login by capturing the email and password.
  Upon a successful response from the backend, it securely stores authentication
  details (token and user ID) in localStorage and updates the auth state, allowing
  the application to manage user sessions and protect routes based on login status.
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

function LoginPage({ setAuthData }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        // Persist authentication data for session management and secure route protection
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        setAuthData({ token: data.token, user: data.user });
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Login failed.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
