import React from 'react';
import { jwtDecode } from 'jwt-decode';
import LogoutButton from '../components/LogoutButton';
import { capitalizeFirstLetter } from '../utils/stringHelpers';

function ProfilePage() {
  
  const token = localStorage.getItem('token');
  let username = '';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub || decoded.username || 'User'; // 'sub' is often used for username
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile Page</h1>
      {token ? (
        <p>Hello, <strong>{capitalizeFirstLetter(username)}</strong> 👋</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default ProfilePage;
