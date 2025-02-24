// src/pages/ItemsPage.jsx
/*
  This component is designed to display all reported items in a grid layout.
  It fetches data from the backend on component mount, and conditionally shows a delete button
  only for items owned by the logged-in user to enforce ownership-based actions.
*/

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemsPage.module.css';

function ItemsPage() {
  // State to store the list of items retrieved from the backend.
  const [items, setItems] = useState([]);
  // Retrieve the current logged-in user's ID from localStorage.
  const loggedInUser = localStorage.getItem('userId');

  /* 
    On component mount, fetch all items from the backend.
    This approach decouples data fetching from the UI, ensuring the component remains data-driven.
  */
  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  /* 
    The deleteItem function allows a user to delete an item.
    It uses the stored token for authorization and updates the local state after successful deletion.
    This reinforces ownership-based control and provides immediate UI feedback.
  */
  const deleteItem = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        // Update the UI by filtering out the deleted item from state.
        setItems(items.filter(item => item._id !== id));
      } else {
        alert('Error deleting item');
      }
    } catch (err) {
      console.error(err);
    }
  };

  /*
    The render section provides a responsive grid view of items.
    Each card is clickable for detailed view, and conditional rendering is used for delete options.
    This design prioritizes a user-friendly interface with ownership-based actions.
  */
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Reported Items</h1>
      {items.length === 0 ? (
        <p className={styles.emptyText}>No items reported yet.</p>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item._id} className={styles.card}>
              <Link to={`/items/${item._id}`} className={styles.cardLink}>
                <h2 className={styles.cardTitle}>
                  {item.title} <span className={styles.cardType}>({item.type})</span>
                </h2>
                <p className={styles.cardText}>{item.description}</p>
                <p className={styles.cardInfo}><strong>Contact:</strong> {item.contact}</p>
                <p className={styles.cardInfo}><strong>Location:</strong> {item.location}</p>
              </Link>
              {loggedInUser === item.user && (
                <button onClick={() => deleteItem(item._id)} className={styles.deleteButton}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemsPage;
