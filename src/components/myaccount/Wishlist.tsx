// import React from 'react';

// const Wishlist: React.FC = () => {
//   return (
//     <div>
//       whitslist
//     </div>
//   );
// };

// export default Wishlist;

import React from "react";
import images from "../../assets/images";
import Sidebar from "./Sidebar";
import Header from "../Header";
import Navigation from "../Navigation";

const cardData = [
  {
    id: 1,
    title: "RING DIAMOND",
    price: "$250.00",
    stockStatus: "Only One Left In Stock",
    imageUrl: images.ring1_1, // Replace with actual image path
  },
  {
    id: 2,
    title: "MEDIOCRE LEATHER HAT",
    price: "$250.00",
    stockStatus: "Only One Left In Stock",
    imageUrl: images.ring1_2, // Replace with actual image path
  },
  {
    id: 3,
    title: "DIAMOND BRACELET",
    price: "$250.00",
    stockStatus: "Only One Left In Stock",
    imageUrl: images.ring1_4, // Replace with actual image path
  },
];

const Card = ({ title, price, stockStatus, imageUrl }) => {
  return (
    <div className="relative p-4 w-full bg-white shadow-md rounded-md">
      <div
        className="w-full h-56 md:h-80 bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="text-center mt-4">
        <div className="text-xl font-semibold text-black pb-2">{title}</div>
        <div className="text-lg text-black pb-2">{price}</div>
        <div className="text-sm text-gray-500">{stockStatus}</div>
        <button className="mt-4 px-4 py-2 border border-gray-400 bg-[#FFF9F3] text-gray-600 text-sm tracking-wider rounded-md hover:bg-gray-100 transition">
          MOVE TO CART
        </button>
      </div>
    </div>
  );
};

const Wishlist: React.FC = () => {
  return (
    <div>
    <div className="App font-Montaga One">
  <Header />
  <div className="hidden md:block">
    <Navigation />
  </div>
</div>
    <div className="container gap-[3%] mt-10  flex md:flex-row flex-col mx-auto px-4">
    <div className="sidebar md:w-1/3 ">
    <Sidebar/>
    </div>
      {/* Desktop View */}
      
      <div className="hidden md:block rounded-xl bg-[#FFF9F3] mx-auto w-[97%] p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-light text-gray-700">WISHLIST</div>
          <button className="text-sm font-semibold border border-transparent bg-[#C3E6F5] text-gray-700 px-5 py-2 rounded-md tracking-wider">
            SHARE
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              price={card.price}
              stockStatus={card.stockStatus}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[#FFF9F3] p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-light text-gray-700">WISHLIST</div>
          <button className="text-sm font-semibold border border-transparent bg-[#C3E6F5] text-gray-700 px-5 py-2 rounded-md tracking-wider">
            SHARE
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {cardData.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              price={card.price}
              stockStatus={card.stockStatus}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
export default Wishlist;

