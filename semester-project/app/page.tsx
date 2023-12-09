import React from 'react';
import ProductSection from './components/landingPage/productSection';
import CompanyCards from './components/landingPage/aboutUs';

const Home = () => {
  return (
    <main className="container mx-auto p-4">
      <ProductSection />
      <CompanyCards />
    </main>
  );
};

export default Home;