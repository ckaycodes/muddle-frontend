import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import LikeButton from '../components/LikeButton';
import StoryDeleteButton from '../components/StoryDeleteButton';

function StoryDetailPage() {

    const { id } = useParams(); // If the route is `/profile/42`, `id` will be `"42"`.
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStory() {
        try { 
            const response = await api.get(`/stories/${id}`);
            setStory(response.data);
        } catch (error) {
            console.error("Failed to fetch story:", error);
            toast.error("Failed to load story");
        } finally {
            setLoading(false);
        }
    }
        fetchStory();
    }, [id]);


    if (loading) return <p>Loading story...</p>;
    if (!story) return <p>Story not found.</p>;
    

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
          <h1 className = "text-xl text-emerald-700 font-semibold mb-1">{(story.title)}</h1>
            <p className="text-gray-700 break-words whitespace-pre-wrap">{story.body}</p>
            <small className="text-gray-500 block mt-2">
            Posted by: <strong>{capitalizeFirstLetter(story.postedBy)}</strong>
          </small>

            <div className="mt-2">
                  Likes: {story.usernamesWhoLiked.length > 0
                    ? story.usernamesWhoLiked.map(name => capitalizeFirstLetter(name)).join(', ')
                    : 'No likes yet'}
              </div>
              
            <div className="mt-2"> 
              {story.isOwner && (
                <StoryDeleteButton storyId={story.id} />
                )}
              
            </div>

        </div>
      );

}

  
export default StoryDetailPage;