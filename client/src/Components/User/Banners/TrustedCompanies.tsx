import React from 'react';
import './Companies.css';
import cisco from '../../../assets/Cisco.jpeg';
import Ericsson from '../../../assets/Ericsson.jpeg';
import Google from '../../../assets/Google.jpeg';
import Ibm from '../../../assets/Ibm.jpeg';
import partner from '../../../assets/partner.jpeg';
import Samsung from '../../../assets/samsung.jpeg';

function TrustedCompanies() {
  
  const companyImages = [
    { src: cisco, alt: 'Cisco' },
    { src: Ericsson, alt: 'Ericsson' },
    { src: Google, alt: 'Google' },
    { src: Ibm, alt: 'IBM' },
    { src: partner, alt: 'Partner' },
    { src: Samsung, alt: 'Samsung' },
  ];

  return (
    <div className="flex items-center justify-center bg-gray-200 py-8">
      <div className="max-w-screen-xl w-full overflow-x-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Trusted by over 15,000 companies
        </h2>
        <div className="flex space-x-4 overflow-hidden">
          
          {companyImages.map((company, index) => (
            <div key={index} className="company-container flex-none w-25 h-25 bg-gray-200 shadow-md rounded-xl p-2">
              <img
                src={company.src}
                alt={company.alt}
                className="company-image w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrustedCompanies;
