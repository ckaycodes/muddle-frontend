import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';

function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const { handleSubmit, isSubmitting } = useFormSubmitHandler();

  // Fetch existing stories on mount
  useEffect(() => {
    api.get('/stories')
      .then(res => {
        setStories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch stories:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async () => {
    const response = await api.post('/stories', newStory);
    setStories(prev => [...prev, response.data]);
    setNewStory({ title: '', body: '' });
    toast.success('Story posted');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Stories</h1>

      {loading ? (
        <p>Loading stories...</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {stories.map(story => (
            <li key={story.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <h3>{story.title}</h3>
              <p>{story.body}</p>
              <small>Posted by: <strong>{story.postedBy}</strong></small>
            </li>
          ))}
        </ul>
      )}

      <h2>Post a New Story</h2>
      <form onSubmit={handleSubmit(onSubmit, 'Story posted', "Error: Can't post story")}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newStory.title}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="body"
          placeholder="Write your story..."
          rows={4}
          cols={50}
          value={newStory.body}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Story'}
        </button>
      </form>
    </div>
  );
}

export default StoriesPage;
