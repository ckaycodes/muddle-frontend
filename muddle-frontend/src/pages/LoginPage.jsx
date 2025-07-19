import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    const res = await api.post('/auth/login', credentials);
    login(res.data.token);
    navigate('/profile');
    toast.success('Hey ' + capitalizeFirstLetter(credentials.username) + '!');
  };

  const { handleSubmit, isSubmitting } = useFormSubmitHandler();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit, '', 'Invalid username or password')}>
        <input
          type="text"
          name="username"
          placeholder="First name"
          value={credentials.username}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
