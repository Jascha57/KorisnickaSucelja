'use client';

import { Product } from '../page';
import { useState, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { addToCart, removeFromCart, getCart } from '../../utils';

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const query = `
  query GetProductById($productId: String!) {
    productCollection(where: { sys: { id: $productId } }) {
      items {
        sys {
          id
        }
        image {
          url
        }
        description {
          json
        }
        model
        type
        price
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
      body: JSON.stringify({ query, variables: { productId: params.productId } })
    })
    .then(response => response.json())
    .then(({ data }) => setProduct(data.productCollection.items[0]))
    .catch(error => console.error('Error:', error));
    
    const cart = getCart();
    setIsInCart(cart.includes(params.productId));
  }, [params.productId]);

    const handleAddToCart = (productId: string) => {
    addToCart(productId);
    setIsInCart(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    setIsInCart(false);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-black font-bold text-4xl mx-auto my-10">
          Loading...
        </h1>
      </div>
    );
  }

  const richTextComponents = documentToReactComponents(product.description.json);

  return (
  <div className="space-y-4">
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg max-w-xl mx-auto p-4">
      <div className="flex items-center justify-center md:w-1/2">
          <img className="h-64 w-full object-scale-down" src={product.image.url} alt={product.model} />
        </div>
      <div className="md:w-1/2 flex flex-col justify-center space-y-2">
        <h2 className="text-lg text-black font-semibold text-center">{product.model}</h2>
        <p className="text-black text-center">Type: {product.type}</p>
        <p className="text-black font-bold text-center">Price: ${product.price}</p>
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
    </div>
    <div className="bg-white shadow-lg rounded-lg max-w-xl mx-auto p-4">
      <article className="prose md:prose-lg lg:prose-xl prose-headings:">
        {richTextComponents}
      </article>
    </div>
  </div>
  );
}