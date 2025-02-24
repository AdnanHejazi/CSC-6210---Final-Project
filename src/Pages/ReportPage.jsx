/*
  This component enables users to report a lost or found item.
  
  We use a local state (via useState) to manage the form data so that the component is controlled and can
  reflect user input changes immediately. This makes it easier to validate and process the input later.
  
  The handleSubmit function gathers the data, retrieves the user's token from localStorage (ensuring that
  only authenticated users can submit reports), and sends a POST request to the backend API. If the request 
  is successful, the user is notified and redirected to the home page, providing a smooth user experience.
  
  Using useNavigate from react-router-dom allows us to programmatically redirect the user after form submission.
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReportPage.module.css';

function ReportPage() {
  const [formData, setFormData] = useState({
    type: 'lost',
    title: '',
    description: '',
    contact: '',
    location: '',
  });
  const navigate = useNavigate();

  // Update formData state as the user types in the form fields
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission by sending a POST request with the user input and auth token
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Item reported successfully!');
        navigate('/'); // Redirect user to home page upon successful submission
      } else {
        alert('Error reporting item.');
      }
    } catch (error) {
      console.error(error);
      alert('Error reporting item.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Report Lost/Found Item</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} className={styles.input}>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className={styles.input}></textarea>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className={styles.input} required />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default ReportPage;
