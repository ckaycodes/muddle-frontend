// StoryCommentList.jsx
import React from 'react';
import StoryCommentDeleteButton from './StoryCommentDeleteButton';
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import { formatPostDate } from '../utils/dateUtils';

export default function StoryCommentList({ comments, storyId, onDelete }) {
  return (
    <div>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map(comment => (
          <div
            key={comment.id}
            className={`
              relative p-3 mb-3 max-w-xs shadow-sm rounded-2xl text-gray-800
              ${comment.isOwner ? 'bg-emerald-200 ml-auto owner' : 'bg-gray-100 mr-auto'}
              fade-in
            `}
          >
            <p className="comment-body">{comment.body}</p>
            <small className="comment-meta block mt-1 text-gray-600">
              — {capitalizeFirstLetter(comment.postedBy)}, {formatPostDate(comment.createdAt)}
            </small>
            {comment.isOwner && (
              <span className="inline-block mt-2 focus-visible:outline-none">
                <StoryCommentDeleteButton
                  storyId={storyId}
                  commentId={comment.id}
                  onDeleteSuccess={() => onDelete(comment.id)}
                />
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
