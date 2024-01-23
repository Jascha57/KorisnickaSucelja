'use client';

import { Forum } from '../page';
import { useState, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const space_id = "t4hj2gedy0mq";
const access_token = "EUJX-F3b-rBsOurVaY_YB4M4uxzTo9eBRM6Fuooret0";

export default function ForumDetails({ params }: { params: { forumId: string } }) {
  const [forum, setForum] = useState<Forum | null>(null);

  const query = `
  query GetForumById($forumId: String!) {
    forumsCollection(where: {sys: {id: $forumId} } ){
      items{
        sys{id}
        title
        content{
          json
        }
      }
    }
  }
  `;

  useEffect(() => {
    fetch(`https://graphql.contentful.com/content/v1/spaces/${space_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({ query, variables: { forumId: params.forumId } }) // Change productId to forumId
    })
    .then(response => response.json())
    .then(({ data }) => {
      if (data && data.forumsCollection && data.forumsCollection.items.length > 0) {
        setForum(data.forumsCollection.items[0]);
      }
    })
    .catch(error => console.error('Error:', error));
  }, [params.forumId]);

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
  </div>
  );
}