'use client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect, useState } from 'react';

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

interface Review {
  sys: {
    id: string;
  };
  productName: string;
  reviewerName: string;
  rating: number;
  reviewDescription: string;
  date: string;
}

export default function ReviewDetails({ params }: { params: { reviewId: string } }) {
  const [review, setReview] = useState<Review | null>(null);

  const queryReview = `
    query GetReviewById($reviewId: String!) {
      reviewCollection(where: {sys: {id: $reviewId}}) {
        items {
          sys {
            id
          }
          productName
          reviewerName
          rating
          reviewDescription
          date
        }
      }
    }
  `;

  useEffect(() => {
    const fetchReview = async () => {
      const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${space_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({
          query: queryReview,
          variables: { reviewId: params.reviewId }
        })
      });

      const { data } = await res.json();
      setReview(data.reviewCollection.items[0]);
    };

    fetchReview();
  }, [params.reviewId]);

  if (!review) return <div>Loading...</div>;

  return (
    <div>
      <h1>{review.productName}</h1>
      <h2>Reviewed by: {review.reviewerName}</h2>
      <div>
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>
            {review.rating > index ? '★' : '☆'}
          </span>
        ))}
      </div>
      <p>{review.reviewDescription}</p>
    </div>
  );
}