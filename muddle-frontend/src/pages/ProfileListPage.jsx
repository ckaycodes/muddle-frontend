import React, { useEffect, useState } from 'react';
import api from '../api/api'; 
import ProfileListItem from '../components/ProfileListItem';

function ProfilesListPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await api.get('/profile');
        setProfiles(response.data);
      } catch (error) {
        console.error('Failed to fetch profiles', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfiles();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading profiles...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {profiles.map(profile => (
        <ProfileListItem key = {profile.id} profile = {profile} />
      ))}
    </div>
  );
}

export default ProfilesListPage;
