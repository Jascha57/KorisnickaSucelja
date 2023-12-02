// components/ProductSection.js

import React from 'react';

const productSection = () => {
  return (
    <section>
        <div className="bg-neutral-50 px-6 py-12 dark:bg-neutral-900 md:px-12 lg:text-left">
            <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="mt-12 lg:mt-0">
                    <h1 className="mt-2 mb-8 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-black text-center">
                        Check out our new product.
                    </h1>
                    <p className="text-black text-lg text-center">This new 75 inch plasma screen TV is gonna change your life.</p>
                    <br></br>
                    <div className="flex justify-center">
                        <a
                            className="text-center mr-4 mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            href="#!"
                            role="button"
                        >
                            Learn more
                        </a>
                        <a
                            className="text-center text-white bg-gradient-to-br from-gray-400 via-gray-600 to-blue-800 ml-4 mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            href="#!"
                            role="button"
                        >
                            Add to cart
                        </a>
                    </div>
                    </div>
                    <div className="mb-12 lg:mb-0">
                    <img src="https://images.prismic.io/blog-system76/770b8c89-16cb-432c-8d44-84db182290cd_galp7.png?auto=compress,format"
                        className="w-full rounded-lg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default productSection;
