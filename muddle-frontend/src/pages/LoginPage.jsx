import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';
import FormInput from '../components/FormInput'; 
import Button from '../components/Button';

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
    <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-emerald-600">Login</h2>
      <form onSubmit={handleSubmit(onSubmit, '', 'Invalid username or password')} className="space-y-4">
        <FormInput
          type="text"
          name="username"
          placeholder="First name"
          value={credentials.username}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
