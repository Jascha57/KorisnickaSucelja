"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const query = `
query Forums{
  forumsCollection{
  	items
    {
      sys{
        id
      }
      title
      content
      {
        json
      }
    }
  }
}`;

export interface Forum {
  sys: {
    id: string;
  };
  title: string;
  content: {
    json: any;
  };
}

export default function Page() {
  const [forums, setForums] = useState<Forum[]>([]);

  useEffect(() => {
    fetch(`https://graphql.contentful.com/content/v1/spaces/${space_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // Set the forums in state
        if (data && data.forumsCollection) {
          setForums(data.forumsCollection.items);
        }
      });
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10 text-black">Community Forums Page</h1>
      <ul className="flex flex-col gap-8 w-full">
        {forums.map((forum) => (
          <Link 
            key={forum.sys.id} 
            href={`community-forums/${forum.sys.id}`} 
            className="text-2xl text-black hover:text-gray-700"
          >
            <li className="bg-white shadow-lg rounded-lg p-4 w-full text-center">
              Topic: {forum.title}
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}