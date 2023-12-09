'use client';
import React, { useState, useEffect } from 'react';

// TODO: USE CONTENTFUL
const ProductSection = () => {
  const slides = [
    {
      title: '75-inch Plasma TV',
      description: 'This new TV is going to change your life.',
      imageUrl: 'https://images.prismic.io/blog-system76/770b8c89-16cb-432c-8d44-84db182290cd_galp7.png?auto=compress,format',
    },
    {
      title: 'Smartphone',
      description: 'Smartphones are the future. This one is the best yet! IOAWHoiaefioeshjiofherogjreoihg ioe hoifewrhgfwe uihweofihewjf9efjrih ehuihoihf wj ioehfwhejwe9fjwefo9j!!!',
      imageUrl: 'https://www.hrvatskitelekom.hr/webresources/slike/mobiteli/honor/Honor_90_green_1.png?auto=compress,format',
    },
    {
      title: 'Eminem',
      description: 'This is the best album ever. It is the best album you will ever hear.',
      imageUrl: 'https://www.udiscovermusic.com/wp-content/uploads/2017/05/Eminem-Show-1536x1536.jpg?auto=compress,format',
    },
    ];
    
const containerStyle = {
    minHeight: '800px',
  };

const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section>
      <div className="bg-neutral-50 px-6 py-12 dark:bg-neutral-900 md:px-12 lg:text-left relative">
        <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="mt-12 lg:mt-0">
              <h1 className="mt-2 mb-8 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-black text-center">
                {slides[currentSlide].title}
              </h1>
              <p className="text-black text-lg text-center">{slides[currentSlide].description}</p>
              <br></br>
              <div className="flex justify-center space-x-4">
                <button className="bg-transparent hover:bg-blue-500 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">
                    Learn More
                </button>
                <button className="bg-amber-600 hover:bg-blue-600 text-white font-extrabold py-2 px-4 border border-black rounded">
                    Add to Cart
                </button>
              </div>
            </div>
            <div className="mb-12 lg:mb-0 relative">
              <img
                src={slides[currentSlide].imageUrl}
                className="w-full rounded-lg"
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
                {slides.map((_, index) => (
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
    </section>
  );
};

export default ProductSection;