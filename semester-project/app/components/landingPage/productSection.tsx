'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const ProductSection = () => {
  const [data, setData] = useState<any>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
  const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  const query = `
    query Products{
      productCollection{
        items{
          sys{
            id
          }
          image{
            url
          }
          model
          price
          type
          shortDescription
        }
      }
    }
  `;

  async function fetchGraphQL(query: string) {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    return response.json();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all products
        const response = await fetchGraphQL(query);
        const allProducts = response.data.productCollection.items;

        // Generate 5 unique random numbers
        const randomNumbers: any[] = [];
        while (randomNumbers.length < 5) {
          const randomNumber = Math.floor(Math.random() * allProducts.length);
          if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
          }
        }

        // Select the products corresponding to the random numbers
        const selectedProducts = randomNumbers.map((num) => allProducts[num]);

        setData({ productCollection: { items: selectedProducts } });
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    }

    fetchData();
  }, [query]);

  const slides = data.productCollection?.items.map((item: any) => ({
    id: item.sys.id,
    title: item.model,
    shortDescription: item.shortDescription,
    imageUrl: item.image.url,
    price: item.price,
  })) || [];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
  if (slides.length > 0) {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }
}, [slides, currentSlide]);

  return (
    <section>
      {slides.length > 0 ? (
        <div className="bg-neutral-50 px-6 py-12 dark:bg-neutral-900 md:px-12 lg:text-left relative">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="mt-12 lg:mt-0">
                <h1 className="mt-2 mb-8 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-black text-center">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-black text-lg text-center">{slides[currentSlide].shortDescription}</p>
                <p className="text-black text-lg text-center">{`Price: ${slides[currentSlide].price}`}€</p>
                <br></br>
                <div className="flex justify-center space-x-4">
                  <Link className="bg-transparent hover:bg-blue-500 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded" href={`/shop/${slides[currentSlide].id}`}>
                      Learn More
                  </Link>
                </div>
              </div>
              <div className="mb-12 lg:mb-0 relative">
                <img
                  src={slides[currentSlide].imageUrl}
                  className="w-full h-96 rounded-lg object-scale-down"
                  alt={slides[currentSlide].title}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="flex items-center bg-primary text-black rounded-full p-2 shadow-lg"
              onClick={prevSlide}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-1">
              {slides.map((_: undefined, index: number) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full ${
                    index === currentSlide ? 'bg-blue-300' : 'bg-gray-700'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            <button
              className="flex items-center bg-primary text-black rounded-full p-2 shadow-lg"
              onClick={nextSlide}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};
export default ProductSection;