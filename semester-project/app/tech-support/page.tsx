"use client";
import { useState } from "react";

export default function TechSupport() {
  const [activeLink, setActiveLink] = useState<{ [key: number]: number | null }>({});

  const groups = [
    {
      title: 'ORDERING',
      links: [
        { title: 'Tracking your order', content: 'Information about how to track your order.' },
        { title: 'Payment methods', content: 'We accept credit card, debit card, and PayPal.' },
        { title: 'Refund and return policies', content: 'You can return items within 30 days for a full refund.' },
      ],
    },
    {
      title: 'ACCOUNT',
      links: [
        { title: 'Creating account', content: 'Click on "Sign Up" to create a new account.' },
        { title: 'Resetting password', content: 'Click on "Forgot Password" to reset your password.' },
      ],
    },
    {
      title: 'SHIPPING',
      links: [
        { title: 'Shipping options', content: 'We offer standard, expedited, and overnight shipping.' },
        { title: 'Tracking shipments', content: 'You can track your shipment through your account.' },
        { title: 'Address and delivery issues', content: 'Contact our support team for any delivery issues.' },
      ],
    },
    {
      title: 'WARRANTY',
      links: [
        { title: 'Product warranty', content: 'All our products come with a 1-year warranty.' },
        { title: 'Initiating a warranty claim', content: 'Contact our support team to initiate a warranty claim.' },
      ],
    },
    {
      title: 'CONTACT US',
      links: [
        { title: 'Customer Service', content: 'You can reach us at 123-456-7890 or support@example.com.' },
      ],
    },
  ];
  const handleClick = (groupIndex: number, linkIndex: number) => {
    setActiveLink((prev: { [key: number]: number | null }) => ({
      ...prev,
      [groupIndex]: prev[groupIndex] === linkIndex ? null : linkIndex,
    }));
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-screen-xl w-full px-2">
        {groups.map((group, groupIndex) => (
          <div 
            key={groupIndex} 
            className="bg-gray-100 shadow-lg rounded-lg p-4"
          >
            <h2 className="text-xl font-bold mb-2 text-orange-500">{group.title}</h2>
            <ul className="text-right">
              {group.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mb-1">
                  <button 
                    onClick={() => handleClick(groupIndex, linkIndex)}
                    className="text-blue-500 hover:underline"
                  >
                    {link.title}
                  </button>
                  {activeLink[groupIndex] === linkIndex && (
                    <div className="mt-2 bg-white shadow-lg text-black 1rounded-lg p-4">
                      <p>{link.content}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
    );
  } // Add this closing curly brace
