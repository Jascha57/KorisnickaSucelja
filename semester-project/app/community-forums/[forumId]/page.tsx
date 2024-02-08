'use client';


import { Forum } from '../page';
import { useState, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

interface Comment {
  sys: {
    id: string;
  };
  name: string;
  content: string;
  forumReference: {
    sys: {
      id: string;
    };
  };
}

export default function ForumDetails({ params }: { params: { forumId: string } }) {
  const [forum, setForum] = useState<Forum | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<{ name: string; content: string }>({
    name: '',
    content: '',
  });

  const queryForum = `
    query GetForumById($forumId: String!) {
      forumsCollection(where: {sys: {id: $forumId}}) {
        items {
          sys { id }
          title
          content { json }
        }
      }
    }
  `;

  const queryComments = `
    query GetCommentsByForumId($forumId: String!) {
      commentsCollection(where: {forumReference: {sys: {id: $forumId}}}) {
        items {
          sys { id }
          name
          content
        }
      }
    }
  `;

  useEffect(() => {
    // Fetch forum details
    fetch(`https://graphql.contentful.com/content/v1/spaces/${space_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({ query: queryForum, variables: { forumId: params.forumId } })
    })
      .then(response => response.json())
      .then(({ data }) => {
        if (data && data.forumsCollection && data.forumsCollection.items.length > 0) {
          setForum(data.forumsCollection.items[0]);
        }
      })
      .catch(error => console.error('Error fetching forum:', error));

    // Fetch comments
    fetch(`https://graphql.contentful.com/content/v1/spaces/${space_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({ query: queryComments, variables: { forumId: params.forumId } })
    })
      .then(response => response.json())
      .then(({ data }) => {
        if (data && data.commentsCollection && data.commentsCollection.items) {
          setComments(data.commentsCollection.items);
        }
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [params.forumId]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newComment.name.trim() === '' || newComment.content.trim() === '') {
    alert('Both fields are required.');
    return;
  }
  // Create a new comment
  const newCommentData: Comment = {
    sys: { id: Date.now().toString() }, // Use the current timestamp as a temporary ID
    name: newComment.name,
    content: newComment.content,
    forumReference: {
      sys: {
        id: params.forumId,
      },
    },
  };

  // Add the new comment to the local state
  setComments([...comments, newCommentData]);

  // Reset the form
  setNewComment({ name: '', content: '' });
  };

  if (!forum) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-black font-bold text-4xl mx-auto my-10">
          Loading...
        </h1>
      </div>
    );
  }

  const richTextComponents = documentToReactComponents(forum.content.json);

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-lg rounded-lg max-w-xl mx-auto p-4">
        <h2 className="text-lg text-black font-semibold text-center">{forum.title}</h2>
        <div className="text-center rich-text-styling">{richTextComponents}</div>
      </div>

      {/* Display Comments */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black text-center">Comments</h3>
        <ul className='text-black'>
          {comments.map(comment => (
            <li key={comment.sys.id} className="bg-white shadow-lg rounded-lg max-w-xl mx-auto p-4 mb-4">
              <strong className="font-semibold">{comment.name}:</strong> {comment.content}
            </li>
          ))}
        </ul>
      </div>

      {/* Comment Form */}
      <div className="mt-4 text-black">
        <h3 className="text-lg font-semibold mb-2 text-black text-center">Write a Comment</h3>
        <form onSubmit={handleCommentSubmit} className="max-w-md mx-auto text-center">
          <div className="mb-4 text-center">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Comment:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              rows={4}
              className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 my-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
}
