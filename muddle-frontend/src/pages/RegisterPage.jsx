import React, { useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

function RegisterPage() {
  const navigate = useNavigate();
  const { handleSubmit, isSubmitting } = useFormSubmitHandler();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const usernameRegex = /^[A-Za-z]+$/;

  const onSubmit = async () => {
    const trimmedFormData = {
      username: formData.username.trim().toLowerCase(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    if (!usernameRegex.test(trimmedFormData.username)) {
      toast.error("Username can only contain letters (A-Z, a-z)");
      return;
    }

    if (trimmedFormData.username.length < 3) {
      toast.error("No one's name at Philz is that short.");
      return;
    }

    if (trimmedFormData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    await api.post('/auth/register', trimmedFormData);
    toast.success('What up ' + capitalizeFirstLetter(trimmedFormData.username) + '!');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-emerald-600">
        Register User
      </h1>
      <form onSubmit={handleSubmit(onSubmit, '', 'Username or Email taken. Identity theft is not a joke!')}>
        <div className="mb-4">
          <FormInput
            name="username"
            type="text"
            placeholder="First Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
