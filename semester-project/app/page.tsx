import React from 'react';
import ProductSection from './components/landingPage/productSection';
import CompanyCards from './components/landingPage/aboutUs';
import SmartphoneCatalog from './components/landingPage/smartphoneCatalog';

const Home = () => {
  return (
    <main className="container mx-auto p-4">
      <ProductSection />
      <SmartphoneCatalog />
      <CompanyCards />
    </main>
  );
};

export default Home;