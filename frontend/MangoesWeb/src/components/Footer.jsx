import { Facebook, Linkedin, Phone } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-gray-300 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-3 sm:gap-0 sm:p-4">
        
        {/* MangoExpress Section */}
        <div className="flex flex-col items-start w-full sm:w-1/2 sm:flex-col gap-1">
          <h2 className="text-orange-600 text-xl sm:text-3xl">MangoExpress</h2>
          <p className="text-sm sm:text-lg mb-2">Experience the freshest, hand-picked mangoes delivered right to your doorstep.</p>

          {/* About Us Section (hidden on small screens) */}
          <div className="hidden sm:block mt-4">
            <p className="text-lg sm:text-xl font-medium">About Us</p>
            <p className="text-md">
              At MangoExpress, we are passionate about bringing the taste of premium,
              farm-fresh mangoes straight to your home.
              
              Our commitment to quality, freshness, and customer satisfaction is at the heart of everything we do.
            </p>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="flex flex-col items-start sm:items-center w-full sm:w-1/2 gap-1 sm:gap-4">
          <p className="sm:text-xl font-medium text-md">Contact Us</p>
          
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="text-sm sm:text-lg">+91 9515237486</p>
          </span>

          <span className="flex items-center gap-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
              className="w-5 h-5 sm:w-6 sm:h-6"
              alt="WhatsApp"
            />
            <p className="text-sm sm:text-lg">+91 9515237486</p>
          </span>

          <p className="text-sm mt-2">Privacy Policy</p>
          <span className="flex items-center gap-2">
            <Facebook />
            <Linkedin />
          </span>
        </div>
      </div>
      
      {/* Footer Text */}
      <div className="w-full mt-6 flex justify-center">
        <p className="text-sm text-center">
          Copyright 2024 @ MangoExpress.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
