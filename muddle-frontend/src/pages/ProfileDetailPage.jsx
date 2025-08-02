import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api'; 
import { capitalizeFirstLetter } from '../utils/stringHelpers';

function ProfileDetailPage() {
  const { id } = useParams(); // If the route is `/profile/42`, `id` will be `"42"`.
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get(`/profile/${id}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className = "text-xl font-semibold mb-1">{capitalizeFirstLetter(profile.userName || profile.username)}</h1>
      <p>{profile.bio}</p>
      <p><strong>Badge:</strong> {profile.equippedBadge || 'None'}</p>
      <p><strong>Favorite Blend:</strong> {capitalizeFirstLetter(profile.favoriteRoast || 'N/A')}</p>
      {profile.dateHired && ( // Only render this JSX if the condition is truthy
        <p><strong>Hired:</strong> {new Date(profile.dateHired).toLocaleDateString()}</p>
      )}
      {profile.birthday && (
        <p><strong>Birthday:</strong> {new Date(profile.birthday).toLocaleDateString()}</p>
      )}
    </div>
  );
}

export default ProfileDetailPage;
