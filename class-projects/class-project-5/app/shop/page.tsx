// import Link from "next/link";

// export const metadata = {
//   title: "Shop",
// };

// const shop = ["Smartphones", "Laptops and Computers", "Home Appliances", "Audio and Headphones", "Wearable Tech", "Gaming Devices", "Camera and Photography", "Accessories"];


// export default function Shop() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-10">
//       <h1 className="text-3xl font-bold">Shop Page</h1>
//       <ul className="flex flex-col gap-8">
//         {shop.map((shopId) => (
//           <li key={shopId}>
//             <Link href={`shop/${shopId}`}>Shop {shopId}</Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }
import Link from "next/link";

export interface Product {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BASE_API_URL = "https://my-json-server.typicode.com/dmarti01/json_test";

const getProducts = async (): Promise<Product[]> => {
  const data = await fetch(`${BASE_API_URL}`);
  return data.json();
};

export default async function Shop() {
  const products = await getProducts();
  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10">Shop Page</h1>
      <ul className="flex flex-col gap-8">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`product/${product.id}`}>
              <span className="text-2xl text-purple-500">
                Product {product.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
