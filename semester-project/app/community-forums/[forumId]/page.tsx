import { Post } from "../page";

interface Params {
  forumId: string;
}

const BASE_API_URL = "https://my-json-server.typicode.com";

const getPost = async (id: string): Promise<Post> => {
  const data = await fetch(`${BASE_API_URL}/dmarti01/json_test/posts/${id}`);
  return data.json();
};

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPost(params.forumId);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10 capitalize text-black">
        <span className="text-black">Post {post.id}:</span> {post.title}
      </h1>
      <p className="text-xl p-10 text-black">{post.body}</p>
    </main>
  );
}
