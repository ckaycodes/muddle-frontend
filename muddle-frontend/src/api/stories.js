import api from './api'; 

export const createStory = (storyData) => api.post('/stories', storyData);
export const getAllStories = () => api.get('/stories');
