// interface Params {
//     shopId: string;
//   }
  
//   export interface ShopParams {
//     params: Params;
//   }
  
//   export default function ShopFunc({ params }: ShopParams) {
//     return (
//       <main className="flex min-h-screen flex-col items-center p-10">
//         <h1 className="text-3xl font-bold p-10">Shop: {params.shopId}</h1>
//       </main>
//     );
//   }
import { Product } from "../page";

interface Params {
  shopId: string;
}

const BASE_API_URL = "https://my-json-server.typicode.com/dmarti01/json_test";

const getPost = async (id: string): Promise<Product> => {
  const data = await fetch(`${BASE_API_URL}/products/${id}`);
  return data.json();
};

export default async function ShopProduct({ params }: { params: Params }) {
  const product = await getProduct(params.postId);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10 capitalize">
        <span className="text-neutral-400">Product {product.id}:</span> {product.title}
      </h1>
      <p className="text-xl p-10">{product.body}</p>
    </main>
  );
}