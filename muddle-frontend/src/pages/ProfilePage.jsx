import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import CoffeeRoastSelect from '../context/CoffeeRoastSelect';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';
import api from '../api/api';
import { useAuth } from '../hooks/useAuth';

function ProfilePage() {
  const [favoriteRoast, setFavoriteRoast] = useState('');
  const [bio, setBio] = useState('');
  const [equippedBadge, setBadge] = useState('');
  const [dateHired, setDateHired] = useState('');
  const [birthday, setBirthday] = useState('');
  const { handleSubmit, isSubmitting } = useFormSubmitHandler();

  const {isLoggedIn, user} = useAuth();
  const username = user?.sub || user?.username || 'User';

  const submitProfile = async () => {
    await api.put('/profile', { bio, equippedBadge, favoriteRoast, dateHired, birthday });
  };


  const badgeOptions = [
  'Brings Vibes',
  'Comedian',
  'Tasking Master',
  'Clumsy',
  'Tired',
  'Overthinker',
  'Day One OG', 
  'Workaholic',
  'Running Off Caffeine',
  'Meow',
  'Oblivious',
  'Pastry Pirate'
  ];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center text-emerald-600">Profile Page</h1>

      {isLoggedIn ? (
        <p className="text-center mb-4">Hello, <strong>{capitalizeFirstLetter(username)}</strong> 👋</p>
      ) : (
        <p className="text-red-500 text-center mb-4">You are not logged in.</p>
      )}

      <form 
        onSubmit={handleSubmit(submitProfile, 'Profile updated!', 'Failed to update profile')} 
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Coffee Roast?</label>
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
            placeholder="Tell us about you!..."
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
          <select 
            value = {equippedBadge}
            onChange = {(e) => setBadge(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-lg"
          >
          <option value="" disabled>Select a badge🏅</option>
          {badgeOptions.map((badge) => (
            <option key={badge} value={badge}>
              {badge}
            </option>
          ))}
          </select>
        </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">Date Hired</label>
          <input
            type="date"
            value={dateHired || ""}
            onChange={(e) => setDateHired(e.target.value || null)}
            className="w-full border border-gray-300 rounded-md p-2"
            min="2016-08-21"
            max={new Date().toISOString().split("T")[0]} //restrict to today or earlier
            required 
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Birthday🎉</label>
          <input
            type="date"
            value={birthday || ""}
            onChange={(e) => setBirthday(e.target.value || null)}
            className="w-full border border-gray-300 rounded-md p-2"
            min="1900-00-00"
            max={new Date().toISOString().split("T")[0]} //restrict to today or earlier
            required 
          />


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
