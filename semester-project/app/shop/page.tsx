"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { addToCart, removeFromCart, getCart } from '../utils'

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const query = `
query Products{
  productCollection{
  	items
    {
      sys{
        id
      }
      image
      {
        url
      }
      model
      description
      {
        json
      }
      price
      type
      shortDescription
    }
  }
}`;

export interface Product {
  sys: {
    id: string;
  };
  image: {
    url: string;
  };
  model: string;
  price: string;
  type: string;
  description: {
    json: any;
  }
  shortDescription: string;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [cart, setCart] = useState<string[]>([]);

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
        setCart(getCart());
        setProducts(data.data.productCollection.items);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const allProducts = [...products];
  const filteredProducts = allProducts.filter(product =>
    product.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productTypes = products.map(product => product.type);

  // Remove duplicates
  const uniqueProductTypes = Array.from(new Set(productTypes));

  let displayedProducts = filteredProducts;

  if (filter) {
    displayedProducts = filteredProducts.filter(product => product.type.toLowerCase() === filter.toLowerCase());
  }
  // Slice the array of products to get only the products for the current page
  const currentItems = displayedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    setCart(getCart());
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  return (
    <div className="container mx-auto px-4 my-5">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 border rounded text-black"
        onChange={event => {
          setSearchTerm(event.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="mb-4 flex justify-center lg:hidden">
        <select
          onChange={event => {
            setFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-2 border rounded text-black"
        >
          <option value="">All</option>
          {uniqueProductTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="hidden lg:flex justify-center mb-4">
        <button
          onClick={() => setFilter('')}
          className={`p-2 mx-1 border rounded text-black ${filter === '' ? 'bg-blue-500' : ''}`}
        >
          All
        </button>
        {uniqueProductTypes.map((type, index) => (
          <button
            key={index}
            onClick={() => {
              setFilter(type);
              setCurrentPage(1);
            }}
            className={`p-2 mx-1 border rounded text-black ${filter === type ? 'bg-blue-500' : ''}`}
          >
            {type}
          </button>
        ))}

      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentItems.length > 0 ? (
            currentItems.map(product => {
              const cart = getCart();
              const isInCart = cart.includes(product.sys.id);

              return (
                <div key={product.sys.id} className="border rounded p-4">
                  <Link href={`/shop/${product.sys.id}`}>
                    <img src={product.image.url} loading="lazy" alt={product.model} className="w-full h-64 object-scale-down mb-4" />
                    <h2 className="text-lg font-semibold mb-2 text-black">{product.model}</h2>
                    <p className="text-gray-600">{product.shortDescription}</p>
                    <p className="text-gray-900 font-bold">${product.price}</p>
                  </Link>
                  <button 
                    className={`font-extrabold py-2 px-4 border border-black rounded ${isInCart ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-blue-600'} text-white`} 
                    onClick={() => {
                      if (isInCart) {
                        handleRemoveFromCart(product.sys.id);
                      } else {
                        handleAddToCart(product.sys.id);
                      }
                    }}
                  >
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                  </button>
                </div>
              );
            })
          ) : (
            <h1 className="text-black font-bold text-4xl mx-auto my-10 col-span-3 h-screen">
              No matches found
            </h1>
          )}
      </div>
      
        <div className="flex justify-center my-4 text-black">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border border-gray-300 rounded-lg mr-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          >
            Previous
          </button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border border-gray-300 rounded-lg ml-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          >
            Next
          </button>
        </div>
    </div>
  );
}