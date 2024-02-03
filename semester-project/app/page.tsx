import React from 'react';
import ProductSection from './components/landingPage/productSection';
import CompanyCards from './components/landingPage/aboutUs';
import LandingPageCatalog from './components/landingPage/landingPageCatalog';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <ProductSection />
      <LandingPageCatalog />
      <CompanyCards />
    </div>
  );
};

export default Home;