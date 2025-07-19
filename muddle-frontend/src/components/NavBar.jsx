import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../api/useAuth';


function NavBar() {
  const { isLoggedIn, logout } = useAuth();

  return (

    <nav style={{ padding: '1rem', backgroundColor: '#f3f3f3' }}>
      <Link to="/register" style={{ marginRight: '1rem' }}>Register</Link>
      <Link to="/users" style={{ marginRight: '1rem' }}>Users</Link>

    
      {isLoggedIn ? (
          <>
            <Link to="/stories" style={{ marginRight: '1rem' }}>Stories</Link>
            <button onClick={logout} style={{ marginRight: '1rem' }}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
    </nav>
  );
}

export default NavBar;
