import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '../components/Button';

function CreateStoryPage() { 
   const [newStory, setNewStory] = useState({ title: '', body: '' });
   const navigate = useNavigate();
   const { handleSubmit, isSubmitting } = useFormSubmitHandler();

    const onSubmit = async () => {
        const response = await api.post('/stories', newStory);
        setNewStory({ title: '', body: '' }); //clears form 
        navigate('/stories');
    };

    const handleChange = (e) => {
        const { name, value } = e.target; // "target" being the event's input element
        setNewStory(prev => ({ ...prev, [name]: value }));
        
        // ...prev keeps existing form data safe while moving between different input fields
    };

    const handleBackNav = () => {
      navigate('/stories');
    }

return ( 
   <div className="max-w-2xl mx-auto px-4 py-10 bg-white rounded-xl shadow-md">
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
        
        {/* Need to make it so only the pressed button changes colors!!! */}

        <div className = "flex justify-between items-center mb-6" >
        <Button type="button" onClick = {handleBackNav} disabled={isSubmitting}>
          {isSubmitting ? 'Going back...' : 'Back'}
        </Button>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Story'}
        </Button>
        
        </div>
      </form>
    
    </div>
    )
}
export default CreateStoryPage;