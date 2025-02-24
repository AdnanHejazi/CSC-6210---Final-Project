/*
  This component renders a detailed view of a single item.
  It retrieves the item ID from the URL parameters, fetches the corresponding item data from the backend,
  and displays the details. This separation of concerns helps in providing a focused view for each item,
  improving overall user experience and navigation.
*/

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ItemDetailsPage.module.css';

function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!item) {
    return <p>Loading item details...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{item.title}</h1>
      <p className={styles.type}>Type: {item.type}</p>
      <p className={styles.description}>{item.description}</p>
      <p className={styles.contact}><strong>Contact:</strong> {item.contact}</p>
      <p className={styles.location}><strong>Location:</strong> {item.location}</p>
      <Link to="/items" className={styles.backLink}>Back to Items</Link>
    </div>
  );
}

export default ItemDetailsPage;
