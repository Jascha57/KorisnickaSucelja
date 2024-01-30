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
      <ul className="flex flex-col gap-8 w-full">
        {reviews.map((review) => (
          <Link 
            key={review.sys.id} 
            href={`tech-reviews/${review.sys.id}`} 
            className="text-2xl text-black hover:text-gray-700"
          >
            <li className="bg-white shadow-lg rounded-lg p-4 w-full text-center">
              <h2>{review.productName}</h2>
              <p>Reviewed by: {review.reviewerName}</p>
              <p>Rating: {review.rating}</p>
              <p>{review.reviewDescription}</p>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}