import React from "react";
import images from "../assets/images";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF9F3] py-12">
      <div className="container mx-auto text-[#7D7D7D] md:px-40 px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src={images.Logo} alt="Ravoy Diamond" className="w-40 mb-4" />

          <p className="text-sm hover:text-[#454545] hover:scale-105 transition-all duration-300">
            Let The Shining Fingers On The Talking, Antique Diamond Ring Fit All
            Occasions
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-600 hover:text-[#333333] hover:scale-105 transition-all duration-300">
            SHOPPING ONLINE
          </h3>
          <ul className="text-sm space-y-2">
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              Jewellery Materials
            </li>
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              Sizing Children's Jewellery
            </li>
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              Delivery & Returns
            </li>
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              Order Tracking
            </li>
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              FAQs
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-600 hover:text-[#333333] hover:scale-105 transition-all duration-300">
            ABOUT US
          </h3>
          <ul className="text-sm space-y-2">
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              Our Story
            </li>
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              Gift Wrap
            </li>
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              Engraving
            </li>
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              Jewellery Care
            </li>
            <li className="hover:text-[#454545] hover:scale-105 transition-all duration-300">
              Stores
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-600 hover:text-[#333333] hover:scale-105 transition-all duration-300">
            ACCOUNT
          </h3>
          <p className="text-sm hover:text-[#454545] hover:scale-105 transition-all duration-300">
            Head Office: SCO 55, Sector-8 Panchkula, Haryana, 134109
          </p>
          <p className="text-sm hover:text-[#454545] hover:scale-105 transition-all duration-300">
            Tel: 0172-4019555
          </p>
          <p className="text-sm hover:text-[#454545] hover:scale-105 transition-all duration-300">
            Email: Sample @123.com
          </p>
        </div>
      </div>
      <div className="flex items-center mt-[5%] text-center justify-center">
        <hr className=" border-gray-400 w-[83%] " />
      </div>
      <div className="text-center mt-8 text-sm text-[#6B6B6B] hover:text-[#454545] hover:scale-105 transition-all duration-300">
        Copyright 2023 Ravoy Diamonds. All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
