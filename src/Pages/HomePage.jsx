/*
  This component renders the home page for the Lost and Found Board.
  We structure the content to be clear and minimalistic so that users quickly understand
  the purpose of the application and can easily navigate to report or view items.
*/

import React from 'react';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.container} style={{ padding: "0px !important" }}>
      <h1 className={styles.title}>Lost and Found Board</h1>
      <p className={styles.description}>
        Welcome! Here you can report lost or found items. Use the navigation bar to report a new item or view existing reports.
      </p>
    </div>
  );
}

export default HomePage;
