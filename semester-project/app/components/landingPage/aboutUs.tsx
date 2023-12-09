import React from 'react';
import {
    BiWorld,
    BiStar,
    BiSupport,
} from "react-icons/bi";

const CompanyCards = () => {
  return (
    <div className="container mx-auto flex flex-wrap justify-center">
      {/* Card 1 */}
      <div className="max-w-sm mx-4 my-8 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-lg text-black font-semibold mb-2">Wide Product Variety</h2>
          <BiWorld className="inline-block text-6xl text-blue-600 mb-5" />
          <p className="text-gray-600">
            We offer a diverse range of electronic products that allows our customers to find everything they need in one place.
            A comprehensive product catalog that includes smartphones, laptops, audio devices, wearables,
            and other gadgets from all around the world that gives <strong>You</strong> the convenience of exploring and purchasing different electronic items from a single store.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="max-w-sm mx-4 my-8 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-lg text-black font-semibold mb-2">Competitive Pricing and Discounts</h2>
          <BiStar className="inline-block text-6xl text-amber-600 mb-5" />
          <p className="text-gray-600">
            Providing competitive pricing and regular discounts.
            Electronic products often come with varying price points, and customers appreciate our affordable options.
            We offer periodic discounts, bundle deals, and loyalty programs to all our customers.
            For our best customers, we offer exclusive discounts and early access to try and buy new products.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="max-w-sm mx-4 my-8 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-lg text-black font-semibold mb-2">Knowledgeable Customer Support</h2>
          <BiSupport className="inline-block text-6xl text-green-600 mb-5" />
          <p className="text-gray-600">
            Having a team of knowledgeable and responsive customer support representatives sets us apart from other electronic stores.
            Customers often have questions about product specifications, compatibility, or troubleshooting.
            Our dedicated support team can provide accurate and timely information that enhances the overall shopping experience and builds trust with our customers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyCards;
