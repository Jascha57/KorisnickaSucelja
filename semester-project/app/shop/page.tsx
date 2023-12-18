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
}

export default function Page() {
  const [smartphones, setSmartphones] = useState<Product[]>([]);
  const [gamingDevices, setGamingDevices] = useState<Product[]>([]);
  const [electronics, setElectronics] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  
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
        console.log(data);
        setSmartphones(data.data.smartphonesCollection.items);
        setGamingDevices(data.data.gamingDevicesCollection.items);
        setElectronics(data.data.electronicsPartsCollection.items);
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

   const allProducts = [...smartphones, ...gamingDevices, ...electronics];
    const filteredProducts = allProducts.filter(product =>
    product.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 my-5">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 border rounded text-black"
        onChange={event => setSearchTerm(event.target.value)}
      />

      <div className="mb-4 flex justify-center">
        <button className="mr-2 py-2 px-4 border rounded text-black">Filter 1</button>
        <button className="mr-2 py-2 px-4 border rounded text-black">Filter 2</button>
        <button className="py-2 px-4 border rounded text-black">Filter 3</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link href={`/shop/${product.sys.id}`} key={product.sys.id}>
              <div key={product.sys.id} className="border rounded p-4">
                <img src={product.image.url} alt={product.model} className="w-full h-64 object-cover mb-4" />
                <h2 className="text-lg font-semibold mb-2 text-black">{product.model}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-900 font-bold">{product.price}</p>
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