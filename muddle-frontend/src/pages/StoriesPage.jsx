import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import TextareaAutosize from 'react-textarea-autosize';
import LikeButton from '../components/LikeButton';

function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const { handleSubmit, isSubmitting } = useFormSubmitHandler();

  // Function to fetch stories
  const fetchStories = () => {
    api.get('/stories')
      .then(res => {
        setStories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch stories:', err);
        setLoading(false);
      });
  };

  // Initial fetch and polling every 15 seconds
  useEffect(() => {
    fetchStories();

    const interval = setInterval(() => {
      fetchStories();
    }, 15000); // 15000ms = 15 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStory(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    const response = await api.post('/stories', newStory);
    setStories(prev => [...prev, response.data]);
    setNewStory({ title: '', body: '' });
    toast.success('Story posted');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-emerald-800">Stories</h1>

      {loading ? (
        <p className="text-gray-500">Loading stories...</p>
      ) : (
        <ul className="space-y-4 mb-10">
          {stories.map(story => (
            <li
              key={story.id}
              className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100"
            >
              <h3 className="text-xl font-semibold text-emerald-700">{story.title}</h3>
              <p className="text-gray-700 break-words whitespace-pre-wrap">{story.body}</p>
              <small className="text-gray-500 block mt-2">
                Posted by: <strong>{capitalizeFirstLetter(story.postedBy)}</strong>
              </small>

              <div className="mt-2">
                <LikeButton
                  storyId={story.id}
                  initialLiked={story.likedByCurrentUser} //Displays liked if the story is already liked by user
                  initialLikeCount={story.likeCount} //Displays total like count
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-emerald-700">Post a New Story</h2>
      <form onSubmit={handleSubmit(onSubmit, 'Story posted', "Error: Can't post story")} className="space-y-4">
        <FormInput
          name="title"
          type="text"
          placeholder="Title"
          value={newStory.title}
          onChange={handleChange}
          required
        />

        <TextareaAutosize
          name="body"
          placeholder="Write your story..."
          minRows={3}
          maxRows={10}
          wrap="soft"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none break-words whitespace-pre-wrap overflow-hidden"
          value={newStory.body}
          onChange={handleChange}
          required
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Story'}
        </Button>
      </form>
    </div>
  );
}

export default StoriesPage;
