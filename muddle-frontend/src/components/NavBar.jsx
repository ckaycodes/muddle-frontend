import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f3f3f3' }}>
      <Link to="/register" style={{ marginRight: '1rem' }}>Register</Link>
      <Link to="/users" style={{ marginRight: '1rem' }}>Users</Link>
      <Link to="/stories" style={{ marginRight: '1rem' }}>Stories</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default NavBar;
