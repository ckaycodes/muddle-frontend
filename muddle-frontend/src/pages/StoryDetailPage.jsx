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
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedBody, setEditedBody] = useState('');

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

     
     const startEditing = () => {
      setIsEditing(true);
      setEditedTitle(story.title);
      setEditedBody(story.body);
    };

    const cancelEditing = () => {
      setIsEditing(false);
    };

    const saveChanges = async () => {
      try {
        const response = await api.put('/stories', {
          id: story.id,
          title: editedTitle,
          body: editedBody,
        });

        setStory(response.data);
        toast.success('Story updated successfully!');
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update story:", error);
        toast.error("Update failed");
      }
    };


    return (
  <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">

    {isEditing ? (
      <>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2 bg-emerald-100"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-2 bg-emerald-100"
          rows={6}
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        />
        <div className="space-x-2">
          <button
            onClick={saveChanges}
            className="bg-emerald-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={cancelEditing}
            className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </>
    ) : (
      <>
        <h1 className="text-xl text-emerald-700 font-semibold mb-1">{story.title}</h1>
        <p className="text-gray-700 break-words whitespace-pre-wrap">{story.body}</p>
      </>
    )}

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
        <>
          {!isEditing && (
            <button
              onClick={startEditing}
              className="mr-2 px-4 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Edit
            </button>
          )}
          <StoryDeleteButton storyId={story.id} />
        </>
      )}
    </div>

  </div>
);

}

  
export default StoryDetailPage;