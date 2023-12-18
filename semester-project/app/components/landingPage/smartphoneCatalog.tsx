// 'use client';
// import React, { useState, useEffect, useRef } from 'react';


// // TODO: USE CONTENTFUL
// const SmartphoneCatalog = () => {
//   const smartphones = [
//     { id: 1, name: 'Smartphone 1', description: 'Description for Smartphone 1', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 2, name: 'Smartphone 2', description: 'Description for Smartphone 2', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 3, name: 'Smartphone 3', description: 'Description for Smartphone 3', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 4, name: 'Smartphone 4', description: 'Description for Smartphone 4', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 5, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 6, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 7, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 8, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 9, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 10, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 11, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 12, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 13, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 14, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 15, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//     { id: 16, name: 'Smartphone 5', description: 'Description for Smartphone 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' },
//   ];

//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const scrollBy = (direction: number) => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({
//         left: direction * 200, // Adjust the scroll amount as needed
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto my-8">
//       <h2 className="text-3xl font-extrabold mb-4 text-center text-black">Most Popular Smartphones</h2>
//       <div className="flex justify-around">
//         <button className="text-3xl bg-blue-600 space-x-5 hidden md:inline-block" onClick={() => scrollBy(-3)}>
//             &#9664; 
//         </button>
//         <div
//           id="smartphoneContainer"
//           ref={containerRef}
//           className="flex space-x-4 overflow-x-auto md:overflow-hidden"
//         >
//           {smartphones.map((phone) => (
//             <div key={phone.id} className="flex-shrink-0 w-80 bg-white p-4 rounded-md shadow-md">
//               <img src={phone.imageUrl} alt={phone.name} className="w-full h-40 object-cover mb-2 rounded-md" />
//               <h3 className="text-lg font-semibold mb-2 text-black">{phone.name}</h3>
//               <p className="text-gray-500 mb-4">{phone.description}</p>
//               <a href="/" className="text-blue-500 hover:underline">
//                 View Details
//               </a>
//             </div>
//           ))}
//         </div>  
//         <button className="text-3xl bg-amber-600 hidden md:inline-block" onClick={() => scrollBy(3)}>
//           &#9654;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SmartphoneCatalog;

'use client';
import React, { useState, useEffect, useRef } from 'react';

const landingPageCatalog = () => {
  const space_id = "t4hj2gedy0mq";
  const access_token = "EUJX-F3b-rBsOurVaY_YB4M4uxzTo9eBRM6Fuooret0";

  const query = `
    query Shop{
      electronicsPartsCollection{
        items{
          sys{
            id
          }
          image{
            url
          }
          description,
          price,
          model,
        }
      }
      gamingDevicesCollection{
        items{
          sys{id
          }
          image{
            url
          }
          description,
          price,
          model,
        }
      }
      smartphonesCollection{
        items{
          sys{id
          }
          image{url
          }
          description,
          price,
          model,
        }
      }
    }
  `;

  const containerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [data, setData] = useState<any>({});
  const categories = Object.keys(data);

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

  return (
    <div className="container mx-auto my-8">
      {categories.map((category, index) => (
        <div key={index}>
          <h2 className="text-3xl font-extrabold mb-4 text-center text-black">
            Most Popular {category}
          </h2>
          <div className="flex justify-around">
            <button
              className="text-3xl bg-blue-600 space-x-5 hidden md:inline-block"
              onClick={() => scrollBy(-3, index)}
            >
              &#9664;
            </button>
            <div
              id={`container-${index}`}
              ref={(ref) => (containerRefs.current[index] = ref)}
              className="flex space-x-4 overflow-x-auto md:overflow-hidden"
            >
              {data[category]?.items?.map((item: any) => (
                <div key={item.sys.id} className="flex-shrink-0 w-80 bg-white p-4 rounded-md shadow-md">
                  <img src={item.image.url} alt={item.model} className="w-full h-40 object-cover mb-2 rounded-md" />
                  <h3 className="text-lg font-semibold mb-2 text-black">{item.model}</h3>
                  <p className="text-gray-500 mb-4">{item.description}</p>
                </div>
              ))}
            </div>
            <button
              className="text-3xl bg-amber-600 hidden md:inline-block"
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

export default landingPageCatalog;
