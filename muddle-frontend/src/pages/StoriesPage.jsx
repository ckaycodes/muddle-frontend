import React, { useEffect, useState } from 'react';
import api from '../api/api';

function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({
  title: '',
  body: '',
  postedBy: ''
  });
  const [loading, setLoading] = useState(true);

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

  // Handle changes to story entity depending on input
  const handleChange = (e) => {
  const { name, value } = e.target;
  setNewStory((prev) => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post('/stories', newStory);
    setStories(prev => [...prev, response.data]);
    setNewStory({ title: '', body: '', postedBy: '' });
  } catch (error) {
    console.error('Error posting story:', error);
  }
};

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Stories</h1>

    {loading ? (
      <p>Loading stories...</p>
    ) : (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {stories.map(story => ( //Map over stories to display attributes
          <li key={story.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <h3>{story.title}</h3>
            <p>{story.body}</p>
            <small>Posted by: <strong>{story.postedBy}</strong></small>
          </li>
        ))}
      </ul>
    )}

      <h2>Post a New Story</h2>
      <form onSubmit={handleSubmit}>
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

        <input
          type="text"
          name="postedBy"
          placeholder="Your name (for now)"
          value={newStory.postedBy}
          onChange={handleChange}
          required
        /><br /><br />

      <button type="submit">Post Story</button>
    </form>

    </div>
  );
}

export default StoriesPage;
