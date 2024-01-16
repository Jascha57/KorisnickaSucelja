"use client";
import { useState, useEffect } from "react";
import { Product, space_id, access_token } from '../page';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const query = `
  query GetProductById($productId: String!) {
  productCollection(where: { sys: { id: $productId} } }) {
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

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product>();

  async function fetchGraphQL(query: string, productId: string) {
    return fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ query, variables: { productId } }),
      }
    );
  }


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetchGraphQL(query, "29h06MpdZ2hI0Dn2hZ693t");
        const data = await response.json();
        console.log('GraphQL response:', data);
        setProduct(data.productCollection.items[0]);
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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-black font-bold text-4xl mx-auto my-10">
          No product found
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-black font-bold text-4xl mx-auto my-10">
        {product.model}
      </h1>
      <img src={product.image.url} alt={product.model} className="w-1/2" />
      <p className="text-black font-bold text-4xl mx-auto my-10">
        {product.price}
      </p>
      <p className="text-black font-bold text-4xl mx-auto my-10">
        {product.type}
      </p>
      <div className="text-black font-bold text-4xl mx-auto my-10">
        {documentToReactComponents(product.description.json)}
      </div>
    </div>
  );

}
