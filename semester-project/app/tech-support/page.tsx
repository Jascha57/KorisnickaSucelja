"use client";
import { useState, useEffect } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const query = `
  query Support {
    support2Collection {
      items {
        sys {
          id
        }
        name
        image {
          url
        }
        linksCollection {
          items {
            ... on Link {
              sys {
                id
              }
              title
              content {
                json
              }
            }
          }
        }
      }
    }
  }
`;

export interface Link {
  sys: {
    id: string;
  };
  title: string;
  content: {
    json: any;
  };
}

export interface Support {
  sys: {
    id: string;
  };
  image: {
    url: string;
  };
  name: string;
  linksCollection: {
    items: Link[];
  };
}

export default function TechSupport() {
  const [supportData, setSupportData] = useState<Support[]>([]);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [activeLink, setActiveLink] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch(`https://graphql.contentful.com/content/v1/spaces/${space_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ query }),
    })
      .then(response => response.json())
      .then(data => {
        setSupportData(data.data.support2Collection.items);
      })
      .catch(error => console.error("Error fetching Contentful data:", error));
  }, []);

  const handleClick = (linkId: string) => {
    setActiveLink((prev) => ({
      ...prev,
      [linkId]: !prev[linkId],
    }));
  };

  if (!supportData) return <p>Loading...</p>;

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <ul className="flex flex-wrap justify-center items-stretch grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {supportData.map((support) => (
          <li 
            key={support.sys.id} 
            className="flex flex-col bg-gray-100 shadow-lg rounded-lg p-4 w-128 h-full text-right"
            >
            <div className="flex items-center justify-left mb-4">
            <img src={support.image.url} alt="" style={{ width: '65px', height: '65px' }} />
            <h2 className="text-xl font-bold text-orange-500 ml-4 uppercase">{support.name}</h2>
            </div>
            {support.linksCollection.items.map((link) => (
              <div key={link.sys.id}>
                <button className="text-blue-500 hover:text-orange-500 transition duration-200" onClick={() => { setSelectedLink(link); handleClick(link.sys.id); }}>
                  {link.title}
                </button>
                {activeLink[link.sys.id] && selectedLink === link && (
                  <div className="mt-2 bg-gray-300 shadow-lg text-black rounded-lg p-4">
                    <p>{selectedLink.content.json.content[0].content[0].value}</p>
                  </div>
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </main>
  );
}