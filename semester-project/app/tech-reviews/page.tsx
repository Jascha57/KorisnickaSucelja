"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const space_id = "t4hj2gedy0mq";
const access_token = "EUJX-F3b-rBsOurVaY_YB4M4uxzTo9eBRM6Fuooret0";

const query = `
query {
    reviewCollection {
      items {
        sys {
          id
        }
        productName
        reviewerName
        rating
        reviewDescription
      }
    }
  }
`;

export interface Review {
    sys: {
      id: string;
    };
    productName: string;
    reviewerName: string;
    rating: number;
    reviewDescription: string;
  }

export default function Page() {
  const [reviews, setReviews] = useState<Review[]>([]);

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
  
        // Set the reviews in state
        if (data && data.reviewCollection) {
          setReviews(data.reviewCollection.items);
        }
      });
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
  <h1 className="text-3xl font-bold p-10 text-black">Our tech reviews:</h1>
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
    {reviews.map((review) => (
      <Link 
      key={review.sys.id} 
      href={`tech-reviews/${review.sys.id}`} 
      className="text-2xl text-black hover:text-gray-700"
    >
      <li className="bg-gray-100 shadow-lg rounded-lg p-4 w-128 h-64 text-center">
        <h2 className="text-xl font-bold mb-2">{review.productName}</h2>
        <p className="text-sm text-gray-500 mb-2">Reviewed by: {review.reviewerName}</p>
        <div className="mb-2">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className="text-yellow-700">
              {review.rating > index ? '★' : '☆'}
            </span>
          ))}
        </div>
        <p className="text-black-700">{review.reviewDescription}</p>
      </li>
    </Link>
    ))}
  </ul>
</main>
  );
}