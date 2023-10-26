import Link from "next/link";

export const metadata = {
  title: "Shop",
};

const shop = ["Smartphones", "Laptops and Computers", "Home Appliances", "Audio and Headphones", "Wearable Tech", "Gaming Devices", "Camera and Photography", "Accessories"];


export default function Shop() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-3xl font-bold">Shop Page</h1>
      <ul className="flex flex-col gap-8">
        {shop.map((shopId) => (
          <li key={shopId}>
            <Link href={`shop/${shopId}`}>Shop {shopId}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
