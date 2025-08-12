import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormSubmitHandler } from '../hooks/useFormSubmitHandler';
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import StoryDeleteButton from '../components/StoryDeleteButton';
import { formatPostDate } from "../utils/dateUtils";
import TextareaAutosize from 'react-textarea-autosize';
import Button from '../components/Button';
import StoryCommentDeleteButton from '../components/StoryCommentDeleteButton';
import { MessageSquare } from "lucide-react"
import StoryCommentList from '../components/StoryCommentList';


function StoryDetailPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ body: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const { handleSubmit, isSubmitting } = useFormSubmitHandler();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [storyResponse, commentsResponse] = await Promise.all([
          api.get(`/stories/${id}`),
          api.get(`/stories/${id}/comments`)
        ]);
        setStory(storyResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        toast.error("Failed to load story or comments");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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
        createdAt: story.createdAt,
      });

      setStory(response.data);
      toast.success('Story updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update story:", error);
      toast.error("Update failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  //Optimistic Comment posting
  const onSubmit = async () => {
    const tempId = Date.now();
    const optimisticComment = { ...newComment, id: tempId, postedBy: 'You', createdAt: new Date().toISOString(), isOwner: true };

    setComments(prev => [...prev, optimisticComment]);
    setNewComment({ body: '' });

    try {
      const response = await api.post(`/stories/${id}/comments`, newComment);
      setComments(prev => prev.map(c => (c.id === tempId ? response.data : c)));
    } catch (error) {
      setComments(prev => prev.filter(c => c.id !== tempId));
      toast.error("Failed to post comment");
    }
};

  return (
    <div className="card">
      
      {/* Edit mode */}
      {isEditing ? (
        <>
          <input
            type="text"
            className="input-base"
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
              className="button-primary"
            >
              Save
            </button>
            <button
              onClick={cancelEditing}
              className="button-secondary"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="card-edit-mode">
          <h1 className="text-xl text-emerald-700 font-semibold mb-1">{story.title}</h1>
          <p className="text-gray-700 break-words whitespace-pre-wrap">{story.body}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-500 mt-3 mb-6 ml-2 text-sm">
        <span>Posted by: <strong>{capitalizeFirstLetter(story.postedBy)}</strong></span>
        <span>{formatPostDate(story.createdAt)}</span>
      </div>

      <div className="mt-4 mb-6 ml-2">
        💚: {story.usernamesWhoLiked.length > 0
          ? story.usernamesWhoLiked.map(name => capitalizeFirstLetter(name)).join(', ')
          : 'No likes yet'}
      </div>

      {/* Edit/Delete buttons - only for story owner */}
      {story.isOwner && (
        <div className="mt-4 gap-3">
          <button
            onClick={startEditing}
            className="button-edit"
          >
            Edit
          </button>
          <StoryDeleteButton storyId={story.id} />
        </div>
      )}

      <hr className="my-4 border-t border-emerald-700"/>

      {/* Comment form - available to logged-in users */}
      <form onSubmit={handleSubmit(onSubmit, 'Comment posted', "Error: Can't post comment")} 
      className="space-y-4 py-5">
        <TextareaAutosize
          name="body"
          placeholder="Reply with a comment..."
          maxLength={500}
          minRows={3}
          maxRows={10}
          wrap="soft"
          className="textarea-base"
          value={newComment.body}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </Button>
      </form>

      {/* Story Comments */}
      <div className="comments-section">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-700 mb-3">
        <MessageSquare className="w-5 h-5" />
        Comments ({comments.length})
      </h2>

        <StoryCommentList 
        comments={comments} 
        storyId={story.id} 
        onDelete={(deletedId) => setComments(prev => prev.filter(c => c.id !== deletedId))}
      />
      </div>
    </div>
  );
}

export default StoryDetailPage;
