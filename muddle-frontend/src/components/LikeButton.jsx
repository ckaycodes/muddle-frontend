import React, { useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';

function LikeButton({ storyId, initialLiked, initialLikeCount, onLikeChange }) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

 const handleLike = async () => {
  if (loading) return;

  //Store old state before optimistic update
  const oldLiked = liked;
  const oldCount = likeCount;

  //Optimistic UI 
  const newLiked = !liked;
  const newCount = newLiked ? likeCount + 1 : likeCount - 1;

  setLiked(newLiked);
  setLikeCount(newCount);
  setLoading(true);

  try {
    await api.post(`/stories/${storyId}/like`);
    onLikeChange?.(storyId, newLiked, newCount); // update parent state
  } catch (error) {
    setLiked(oldLiked); // Revert with api error
    setLikeCount(oldCount);
    toast.error('Failed to update like. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <button
      onClick={handleLike}
      disabled={loading}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike' : 'Like'}
      className={`like-button ${liked ? 'liked' : ''}`}
    >
      {liked ? '💚' : '🤍'} {likeCount}
    </button>
  );
}

export default LikeButton;
