'use client';
import React, { useState, useEffect, useRef } from 'react';

// Importi ostaju nepromenjeni

const LandingPageCatalog = () => {
  const space_id = "t4hj2gedy0mq";
  const access_token = "EUJX-F3b-rBsOurVaY_YB4M4uxzTo9eBRM6Fuooret0";

  const query = `
    query Products{
      productCollection{
        items{
          sys{
            id
          }
          image{
            url
          }
          model
          description{
            json
          }
          price
          type
          shortDescription
        }
      }
    }
  `;

  const containerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [data, setData] = useState<any>({});

  async function fetchGraphQL(query: string) {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    return response.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGraphQL(query);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    };

    fetchData();
  }, [query]);

  const scrollBy = (direction: number, index: number) => {
    if (containerRefs.current[index]) {
      containerRefs.current[index]?.scrollBy?.({
        left: direction * 200,
        behavior: 'smooth',
      });
    }
  };

  const categories = ['Smartphones', 'Gaming Devices', 'Electronic Parts'];

  return (
    <div className="container mx-auto my-8">
      {categories.map((category, index) => (
        <div key={index}>
          <h2 className="text-3xl font-extrabold mb-4 text-center text-black">
            Most Popular {category}
          </h2>
          <div className="flex justify-around">
            <button
              className="flex items-center bg-primary text-black rounded-full p-1 text-sm shadow-lg bg-amber-600 hover:bg-blue-600"
              onClick={() => scrollBy(-3, index)}
            >
              &#9664;
            </button>
            <div
              id={`container-${index}`}
              ref={(ref) => (containerRefs.current[index] = ref)}
              className="flex space-x-4 overflow-x-auto md:overflow-hidden"
            >
              {data.productCollection?.items
                .filter((item: any) => item.type === category)
                .map((item: any) => (
                  <div key={item.sys.id} className="flex-shrink-0 w-80 bg-white p-4 rounded-md shadow-md">
                    <img src={item.image.url} alt={item.model} className="w-full h-40 object-cover mb-2 rounded-md" />
                    <h3 className="text-lg font-semibold mb-2 text-black">{item.model}</h3>
                    <p className="text-gray-500 mb-4">{item.shortDescription}</p>
                  </div>
                ))}
            </div>
            <button
              className="flex items-center bg-primary text-black rounded-full p-1 text-sm shadow-lg bg-amber-600 hover:bg-blue-600"
              onClick={() => scrollBy(3, index)}
            >
              &#9654;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingPageCatalog;
