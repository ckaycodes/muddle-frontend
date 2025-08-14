import React, { useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';

function StoryCommentDeleteButton({ storyId, commentId, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    const confirmed = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await api.delete(`/stories/${storyId}/comments/${commentId}`);
      toast.success('Comment deleted successfully');
      
      // Remove comment immediately from local UI state (optimistic UI update)
      onDeleteSuccess && onDeleteSuccess();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete comment');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
      className={`story-comment-delete-button mt-2 px-2 py-1 rounded transition ${
        isDeleting 
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
          : 'bg-red-400 text-white hover:bg-red-700'
      }`}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}

export default StoryCommentDeleteButton;
