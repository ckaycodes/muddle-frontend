
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';


// REWRITE THIS CLASS BY MEMORY!!!

function StoryDeleteButton({ storyId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this story?');
    if (!confirmed) return;

    try {
      await api.delete(`/stories/delete/${storyId}`);
      toast.success('Story deleted successfully');
      navigate('/stories'); // Redirect after deletion
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete story');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Delete Story
    </button>
  );
  
}

export default StoryDeleteButton;
