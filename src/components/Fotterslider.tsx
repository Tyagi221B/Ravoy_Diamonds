import React, { useState, useRef } from "react";
import images from "../assets/images";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Ring Diamond", image: images.productimage1 },
  { id: 2, name: "Mitchelle Earrings", image: images.productimage2 },
  { id: 3, name: "Diamond Bracelet", image: images.productimage3 },
  { id: 4, name: "Earrings Twirls", image: images.productimage4 },
  { id: 5, name: "Pendant Classic", image: images.productimage5 },
  { id: 6, name: "Pendant Classic", image: images.productimage6 },
  { id: 7, name: "Pendant Classic", image: images.productimage2 },
];

const Fotterslider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 relative bg-[#FFF9F3]">
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-0" // Removed space-x-4 to remove gap between products
          onScroll={handleScroll}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="flex-shrink-0 text-center w-64"
              animate={{ x: "-100%" }}
              transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
            >
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover mb-2 transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-3"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold text-black">
                    {product.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fotterslider;
