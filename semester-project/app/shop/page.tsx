"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
        __typename,
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
        __typename,
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
        __typename,
      }
    }
  audioAndHeadphonesCollection{
        items{
          sys{id
          }
          image{url
          }
          description,
          price,
          model,
          __typename,
        }
      }
    cameraAndPhotographyCollection{
        items{
          sys{id
          }
          image{url
          }
          description,
          price,
          model,
          __typename,
        }
      }
  	homeAppliancesCollection{
        items{
          sys{id
          }
          image{url
          }
          description,
          price,
          model,
          __typename,
        }
      }
  	laptopsAndComputersCollection{
        items{
          sys{id
          }
          image{url
          }
          description,
          price,
          model,
          __typename,
        }
      }
  	wearableTechnologyCollection{
        items{
          sys{id
          }
          image{url
          }
          description,
          price,
          model,
          __typename,
        }
      }
  }
`;

interface Product {
  sys: {
    id: string;
  };
  image: {
    url: string;
  };
  description: string;
  model: string;
  price: string;
  __typename: string;
}

export default function Page() {
  const [smartphones, setSmartphones] = useState<Product[]>([]);
  const [gamingDevices, setGamingDevices] = useState<Product[]>([]);
  const [electronics, setElectronics] = useState<Product[]>([]);
  const [audioAndHeadphones, setAudioAndHeadphones] = useState<Product[]>([]);
  const [cameraAndPhotography, setCameraAndPhotography] = useState<Product[]>([]);
  const [homeAppliances, setHomeAppliances] = useState<Product[]>([]);
  const [laptopsAndComputers, setLaptopsAndComputers] = useState<Product[]>([]);
  const [wearableTechnology, setWearableTechnology] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  
  async function fetchGraphQL(query: string) {
    return fetch(
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
  }
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetchGraphQL(query);
        const data = await response.json();
        setSmartphones(data.data.smartphonesCollection.items);
        setGamingDevices(data.data.gamingDevicesCollection.items);
        setElectronics(data.data.electronicsPartsCollection.items);
        setAudioAndHeadphones(data.data.audioAndHeadphonesCollection.items);
        setCameraAndPhotography(data.data.cameraAndPhotographyCollection.items);
        setHomeAppliances(data.data.homeAppliancesCollection.items);
        setLaptopsAndComputers(data.data.laptopsAndComputersCollection.items);
        setWearableTechnology(data.data.wearableTechnologyCollection.items);
        setLoading(false);
        return data;
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
        setLoading(false);
        return null;
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-black font-bold text-4xl mx-auto my-10">
          Loading...
        </h1>
      </div>
    );
  }

  
  const allProducts = [...smartphones, ...gamingDevices, ...electronics, ...audioAndHeadphones, ...cameraAndPhotography, ...homeAppliances, ...laptopsAndComputers, ...wearableTechnology];
  const filteredProducts = allProducts.filter(product =>
    product.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

  let displayedProducts = filteredProducts;

  if (filter) {
    displayedProducts = filteredProducts.filter(product => product.__typename.toLowerCase() === filter.toLowerCase());
  }

  return (
    <div className="container mx-auto px-4 my-5">
    <input
      type="text"
      placeholder="Search..."
      className="w-full p-2 mb-4 border rounded text-black"
      onChange={event => setSearchTerm(event.target.value)}
      />
      
      <div className="mb-4 flex justify-center lg:hidden">
        <select
          className="w-full p-2 border rounded text-black bg-white shadow appearance-none"
          value={filter}
          onChange={event => setFilter(event.target.value)}
        >
          <option value="">All</option>
          <option value="smartphones">Smartphones</option>
          <option value="gamingdevices">Gaming Devices</option>
          <option value="electronicsparts">Electronics Parts</option>
          <option value="audioandheadphones">Audio and Headphones</option>
          <option value="cameraandphotography">Camera and Photography</option>
          <option value="homeappliances">Home Appliances</option>
          <option value="laptopsandcomputers">Laptops And Computers</option>
          <option value="wearabletechnology">Wearable Technology</option>
        </select>
      </div>

    <div className="mb-4 justify-center hidden lg:flex">
      <button
        className={`mr-2 py-2 px-4 border rounded text-black ${filter === 'smartphones' ? 'bg-blue-500' : ''}`}
        onClick={() => setFilter(filter === 'smartphones' ? '' : 'smartphones')}
      >
        Smartphones
      </button>
      <button
        className={`mr-2 py-2 px-4 border rounded text-black ${filter === 'gamingdevices' ? 'bg-blue-500' : ''}`}
        onClick={() => setFilter(filter === 'gamingdevices' ? '' : 'gamingdevices')}
      >
        Gaming Devices
      </button>
      <button
        className={`mr-2 py-2 px-4 border rounded text-black ${filter === 'electronicsparts' ? 'bg-blue-500' : ''}`}
        onClick={() => setFilter(filter === 'electronicsparts' ? '' : 'electronicsparts')}
      >
        Electronics Parts
      </button>
      <button
        className={`mr-2 py-2 px-4 border rounded text-black ${filter === 'audioandheadphones' ? 'bg-blue-500' : ''}`}
        onClick={() => setFilter(filter === 'audioandheadphones' ? '' : 'audioandheadphones')}
      >
        Audio and Headphones
      </button>
      <button
        className={`mr-2 py-2 px-4 border rounded text-black ${filter === 'cameraandphotography' ? 'bg-blue-500' : ''}`}
        onClick={() => setFilter(filter === 'cameraandphotography' ? '' : 'cameraandphotography')}
      >
        Camera and Photography
      </button>
      <button
        className={`mr-2 py-2 px-4 border rounded text-black ${filter === 'homeappliances' ? 'bg-blue-500' : ''}`}
        onClick={() => setFilter(filter === 'homeappliances' ? '' : 'homeappliances')}
      >
        Home Appliances
      </button>
      <button
        className={`mr-2 py-2 px-4 border rounded text-black ${filter === 'laptopsandcomputers' ? 'bg-blue-500' : ''}`}
        onClick={() => setFilter(filter === 'laptopsandcomputers' ? '' : 'laptopsandcomputers')}
      >
        Laptops And Computers
      </button>
      <button
        className={`py-2 px-4 border rounded text-black ${filter === 'wearabletechnology' ? 'bg-blue-500' : ''}`}
        onClick={() => setFilter(filter === 'wearabletechnology' ? '' : 'wearabletechnology')}
      >
        Wearable Technology
      </button>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedProducts.length > 0 ? (
          displayedProducts.map(product => (
            <Link href={`/shop/${product.sys.id}`} key={product.sys.id}>
              <div key={product.sys.id} className="border rounded p-4">
                <img src={product.image.url} alt={product.model} className="w-full h-64 object-cover mb-4" />
                <h2 className="text-lg font-semibold mb-2 text-black">{product.model}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-900 font-bold">${product.price}</p>
              </div>
            </Link>
          ))
        ) : (
            <h1 className="text-black font-bold text-4xl mx-auto my-10 col-span-3 h-screen">
              No matches found
            </h1>
        )}
      </div>
    </div>
  );
}