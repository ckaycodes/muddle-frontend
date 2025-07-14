import React, { useEffect, useState } from 'react';
import api from '../api/api';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
  {users.map(user => (
          <li key={user.id}>
            {user.username} — {user.email}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default UsersPage;
