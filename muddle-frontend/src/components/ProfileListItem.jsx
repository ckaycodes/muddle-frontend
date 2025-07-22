import React from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/stringHelpers';

function ProfileListItem({ profile }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${profile.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      <h2 className="text-lg font-semibold">
        {capitalizeFirstLetter(profile.userName || profile.username || 'User')}
      </h2>
      <p><strong>Badge:</strong> {profile.equippedBadge || 'None'}</p>
    </div>
  );
}

export default ProfileListItem;
