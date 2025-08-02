import React from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/stringHelpers';


function StoryDetailItem({story}) { 
    const navigate = useNavigate();

    const handleClick = () => { 
        navigate(`/stories/${story.id}`);
    };

    return (
        <div 
          onclick = {handleClick}
          className="cursor-pointer bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') handleClick();
            }}
        >
          <h2 className="text-lg font-semibold">
            {capitalizeFirstLetter(story.title)}
          </h2>
        
        </div>




    )


}