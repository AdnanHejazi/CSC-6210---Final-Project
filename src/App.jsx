// src/App.jsx
/*
  This is the main application component that sets up routing and navigation.
  
  - It uses React Router to define client-side navigation between different pages.
  - The authentication state is managed with localStorage to persist user sessions.
  - A logout function is included to clear authentication data and reset the state.
  - The navigation menu dynamically updates based on authentication status, ensuring
    that only logged-in users can see certain options like "Report Item" and "Logout".
*/

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ReportPage from './Pages/ReportPage';
import ItemsPage from './Pages/ItemsPage';
import ItemDetailsPage from './Pages/ItemDetailsPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import navStyles from './components/NavBar.module.css';

function App() {
  // Initialize authentication state using localStorage to persist user session
  const [authData, setAuthData] = useState({
    token: localStorage.getItem('token'),
    user: { id: localStorage.getItem('userId') }
  });

  // Logout function to remove authentication data and reset user state
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setAuthData({ token: null, user: {} });
  };

  return (
    <Router>
      {/* Navigation Bar: Dynamically updates based on authentication status */}
      <nav className={navStyles.navbar}>
        <div className={navStyles.navContainer}>
          <div className={navStyles.navBrand}>lostNfound</div>
          <ul className={navStyles.navList}>
            <li>
              <Link className={navStyles.navItem} to="/">Home</Link>
            </li>
            <li>
              <Link className={navStyles.navItem} to="/report">Report Item</Link>
            </li>
            <li>
              <Link className={navStyles.navItem} to="/items">View Items</Link>
            </li>
            {authData.token ? (
              // If user is logged in, show logout button
              <li>
                <button className={navStyles.navItem} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              // If user is not logged in, show login and register links
              <>
                <li>
                  <Link className={navStyles.navItem} to="/login">Login</Link>
                </li>
                <li>
                  <Link className={navStyles.navItem} to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Page Content: Uses React Router to switch between different views */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          <Route path="/login" element={<LoginPage setAuthData={setAuthData} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
