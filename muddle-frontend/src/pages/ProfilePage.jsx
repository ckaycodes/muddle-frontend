import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import CoffeeRoastSelect from '../context/CoffeeRoastSelect';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';
import api from '../api/api';

function ProfilePage() {
  const [favoriteRoast, setFavoriteRoast] = useState('');
  const [bio, setBio] = useState('');
  const [equippedBadge, setBadge] = useState('');
  const { handleSubmit, isSubmitting } = useFormSubmitHandler();

  const token = localStorage.getItem('token');
  let username = '';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub || decoded.username || 'User';
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  const submitProfile = async () => {
    await api.put('/profile', { bio, equippedBadge, favoriteRoast });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center text-emerald-600">Profile Page</h1>

      {token ? (
        <p className="text-center mb-4">Hello, <strong>{capitalizeFirstLetter(username)}</strong> 👋</p>
      ) : (
        <p className="text-red-500 text-center mb-4">You are not logged in.</p>
      )}

      <form 
        onSubmit={handleSubmit(submitProfile, 'Profile updated!', 'Failed to update profile')} 
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Coffee Roast</label>
          <CoffeeRoastSelect
            selectedRoast={favoriteRoast}
            onSelect={setFavoriteRoast}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
          />
        </div>

          {/* TODO: Make badges that users can select, instead of inputs!!! */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
          <input 
            type="text"
            value={equippedBadge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="Your badge (e.g. 'Coffee Enthusiast')"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
