import Link from "next/link";

export const metadata = {
  title: "Review",
};

const review = ["Tech News", "Buying Guides", "Budget-Friendly Options", "Community Forums"];


export default function Review() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-3xl font-bold">Tech reviews page</h1>
      <ul className="flex flex-col gap-8">
        {review.map((reviewId) => (
          <li key={reviewId}>
            {reviewId === "Community Forums" ? (
              <Link href="/community-forums">Tech review: {reviewId}</Link>
            ) : (
              <Link href={`tech-reviews/${reviewId}`}>Tech review: {reviewId}</Link>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
