import React from "react";
import { useState } from "react";
import images from "../assets/images";

const CategoryIcons: React.FC = () => {
  const gemstones = [
    {
      name: "Ruby",
      image: images.diamond1,
      hoverImage: images.diamond1blue,
    },
    {
      name: "Emerald",
      image: images.diamond2,
      hoverImage: images.diamond2blue,
    },
    {
      name: "Sapphire",
      image: images.diamond3,
      hoverImage: images.diamond3blue,
    },
    {
      name: "Alexandrite",
      image: images.diamond4,
      hoverImage: images.diamond4blue,
    },
    {
      name: "Diamond",
      image: images.diamond5,
      hoverImage: images.diamond5blue,
    },
    {
      name: "Tourmaline",
      image: images.diamond6,
      hoverImage: images.diamond6blue,
    },
    {
      name: "Opal",
      image: images.diamond7,
      hoverImage: images.diamond7blue,
    },
    {
      name: "Aquamarine",
      image: images.diamond8,
      hoverImage: images.diamond8blue,
    },
  ];

  const [hoveredGemstone, setHoveredGemstone] = useState<number | null>(null); 
  return (
    <div className="gemstonetype bg-[#FFF9F3]">
      <div className="grid grid-cols-2 p-4 pb-12 lg:mb-20 mb-12  px-[10%] gap-4 md:grid-cols-8 md:grid-rows-1 cursor-pointer">
        {gemstones.map((gemstone, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onMouseEnter={() => setHoveredGemstone(index)}
            onMouseLeave={() => setHoveredGemstone(null)}
          >
            <img
              src={
                hoveredGemstone === index ? gemstone.hoverImage : gemstone.image
              }
              alt={gemstone.name}
              className="w-24 h-24 object-cover transition-all duration-300 ease-in-out hover:translate-y-[-10px]"
            />
            <p
              className={`text-sm transition-all duration-300 ease-in-out ${
                hoveredGemstone === index ? "text-[#48c0e9]" : "text-gray-500"
              }`}
            >
              {hoveredGemstone === index ? "Shop Now" : gemstone.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIcons;

