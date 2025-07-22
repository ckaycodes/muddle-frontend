import React from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/stringHelpers';

function ProfileCard({ profile }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${profile.id}`); 
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold mb-1">
        {capitalizeFirstLetter(profile.userName || profile.username || 'User')}
      </h2>
      <p className="text-gray-600 mb-2">{profile.bio || 'No bio provided'}</p>
      <p><strong>Badge:</strong> {profile.equippedBadge || 'None'}</p>
      <p><strong>Favorite Roast:</strong> {profile.favoriteRoast || 'N/A'}</p>
      {profile.dateHired && (
        <p><strong>Hired:</strong> {new Date(profile.dateHired).toLocaleDateString()}</p>
      )}
      {profile.birthday && (
        <p><strong>Birthday:</strong> {new Date(profile.birthday).toLocaleDateString()}</p>
      )}
    </div>
  );
}

export default ProfileCard;
