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

  const onSubmit = async () => {
    const response = await api.post(`/stories/${id}/comments`, newComment);
    setComments(prev => [...prev, response.data]);
    setNewComment({ body: '' });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      
      {/* Edit mode */}
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
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
          <h1 className="text-xl text-emerald-700 font-semibold mb-1">{story.title}</h1>
          <p className="text-gray-700 break-words whitespace-pre-wrap">{story.body}</p>
        </div>
      )}

      <small className="text-gray-500 block mt-2">
        Posted by: <strong>{capitalizeFirstLetter(story.postedBy)}</strong>
      </small>

      <small className="text-gray-500 block mt-2">{formatPostDate(story.createdAt)}</small>

      <div className="mt-4">
        Likes: {story.usernamesWhoLiked.length > 0
          ? story.usernamesWhoLiked.map(name => capitalizeFirstLetter(name)).join(', ')
          : 'No likes yet'}
      </div>

      {/* Edit/Delete buttons - only for story owner */}
      {story.isOwner && (
        <div className="mt-2">
          <button
            onClick={startEditing}
            className="mr-2 px-4 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Edit
          </button>
          <StoryDeleteButton storyId={story.id} />
        </div>
      )}

      {/* Comment form - available to logged-in users */}
      <form onSubmit={handleSubmit(onSubmit, 'Comment posted', "Error: Can't post comment")} className="space-y-4 py-5">
        <TextareaAutosize
          name="body"
          placeholder="Reply with a comment..."
          minRows={3}
          maxRows={10}
          wrap="soft"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none break-words whitespace-pre-wrap overflow-hidden"
          value={newComment.body}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </Button>
      </form>

      {/* Story Comments */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border rounded p-3 mb-2 bg-gray-50">
              <p className="text-gray-800 whitespace-pre-wrap">{comment.body}</p>
              <small className="text-gray-500">
                — {capitalizeFirstLetter(comment.postedBy)} on {formatPostDate(comment.createdAt)}
              </small>
              {comment.isOwner && (
                <StoryCommentDeleteButton
                  storyId={story.id}
                  commentId={comment.id}
                  onDeleteSuccess={() => setComments(prev => prev.filter(c => c.id !== comment.id))}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StoryDetailPage;
