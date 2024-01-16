import React from 'react';
import ProductSection from './components/landingPage/productSection';
import CompanyCards from './components/landingPage/aboutUs';
import LandingPageCatalog from './components/landingPage/landingPageCatalog';

const Home = () => {
  return (
    <main className="container mx-auto p-4">
      <ProductSection />
      <LandingPageCatalog />
      <CompanyCards />
    </main>
  );
};

export default Home;