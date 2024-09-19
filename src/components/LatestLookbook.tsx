// import React, { useEffect, useRef } from 'react';
// import images from '../assets/images';
// import CustomButton from './Button';

// const lookbookItems = [
//   { name: 'Signature Larieu Necklace', image: images.lb1, subt: "Gold Plated Vermell" },
//   { name: 'Signature Larieu Necklace', image: images.lb2, subt: "Gold Plated Vermell" },
//   { name: 'Signature Larieu Necklace', image: images.lb3, subt: "Gold Plated Vermell" },
// ];

// const LatestLookbook: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (sectionRef.current) {
//         const rect = sectionRef.current.getBoundingClientRect();
//         const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <section ref={sectionRef} className="container mx-auto px-4 py-12">
//       <h2 className="text-1xl  text-[#2993B5] tracking-widest text-center mb-2 uppercase">Wedding Room</h2>
//       <h2 className="text-3xl font-normal tracking-wide text-center mb-8">Our Latest Lookbook</h2>
//       <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-4">
//         {lookbookItems.map((item, index) => (
//           <div
//             key={index}
//             className={`w-full md:w-${index === 1 ? '1/3' : '1/4'} h-64 md:h-${index === 1 ? '[80vh]' : '80'}`}
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-full object-cover"
//             />
//             <p className={`text-center mt-2 font-sans tracking-wide ${index === 1 ? 'absolute bottom-0 left-0 right-0 py-2 text-black' : ''}`}>
//               {item.name}
//             <p className="text-center mt-2 text-[#8D8D8D]">{item.subt}</p>
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="text-center mt-16">
//         <CustomButton>Browse All Collection</CustomButton>
//       </div>
//     </section>
//   );
// };
// export default LatestLookbook;

// import React, { useEffect, useRef } from 'react';
// import images from '../assets/images';
// import CustomButton from './Button';

// const lookbookItems = [
//   { name: 'Signature Larieu Necklace', image: images.lb1, subt: "Gold Plated Vermell" },
//   { name: 'Signature Larieu Necklace', image: images.lb2, subt: "Gold Plated Vermell" },
//   { name: 'Signature Larieu Necklace', image: images.lb3, subt: "Gold Plated Vermell" },
// ];

// const LatestLookbook: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (sectionRef.current) {
//         const rect = sectionRef.current.getBoundingClientRect();
//         const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <section ref={sectionRef} className="container mx-auto px-4 py-12">
//       <h2 className="text-1xl  text-[#2993B5] tracking-widest text-center mb-2 uppercase">Wedding Room</h2>
//       <h2 className="text-3xl font-normal tracking-wide text-center mb-8">Our Latest Lookbook</h2>
//       <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-4">
//         {lookbookItems.map((item, index) => (
//           <div
//             key={index}
//             className={`w-full md:w-${index === 1 ? '1/3' : '1/4'} h-64 md:h-${index === 1 ? '[80vh]' : '80'}`}
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-full object-cover"
//             />
//             <p className={`text-center mt-2 font-sans tracking-wide ${index === 1 ? 'absolute bottom-0 left-0 right-0 py-2 text-black' : ''}`}>
//               {item.name}
//             <p className="text-center mt-2 text-[#8D8D8D]">{item.subt}</p>
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="relative text-center items-center flex justify-center">
//           <img
//             src="https://s3-alpha-sig.figma.com/img/5f5e/b394/843282f33350ed1e0603043d81f1a532?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GDML-MwEDZsAQTkkVOe5w0hTq18y3VXr1NYCbwz2FdqULSjEbWp43qrEAiRY7htbNgs1B6Q2djsGnbTFSRz0mMcEFMZ6ghG-eghAZZ62ea2SGuPBIvvjXYxzzB47uAZOzhuVug-znpacbFygwoFkFzN0E2qU0WK598gQisg~V3qrrwE~G4QMS4wdgm0Qy~a9efwAJV790IsgOVvXS3Mv2Qlf3UfPl59GPRRoA5vyAnxkVy0LBHNEpE6KIdhFbFd7zdHKj8fEt9CA6cHwLlWzH6lcPPTjeV6JqFs9p43SnOXciKK3Azoa0~gfS5lw6T5sqT3kz4zRHNTl-114cVJr-Q__"
//             alt=""
//             className="w-[10%]"
//           />
//           <div className='className="w-[100%] absolute  bottom-[10%] p-4 left-1/2 transform -translate-x-1/2'>
//           <CustomButton>
//             Brouse all component
//           </CustomButton></div>
//         </div>
//     </section>
//   );
// };

// export default LatestLookbook;
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import images from "../assets/images";
import CustomButton from "./Button";

const LatestLookbook = () => {
  return (
    <div>
      <h2 className="text-1xl  text-[#2993B5] tracking-widest text-center mt-[1%] mb-2 uppercase">
        Wedding Room
      </h2>
      <h2 className="text-3xl font-normal tracking-wide text-center mb-8">
        Our Latest Lookbook
      </h2>

      <div className="hidden lg:block xl:block md:block">
        <div className="mx-[6%] mt-[18%] mb-[15%] my-[6%]">
          <SwipeImages />
        </div>
      </div>

      <div className="block lg:hidden xl:hidden md:hidden">
        <div className="mx-[2%] my-[6%] mt-[10%] mb-[25%] flex flex-col items-center">
          <img src="/images/om.png" className="h-5 w-5" />

          <div className="w-full mt-5">
            <SwipeImages />
          </div>
          <div className="w-full flex flex-col items-center mt-10"></div>
        </div>
      </div>
      <div className="relative text-center mb-10 items-center flex justify-center">
        <img
          src="https://s3-alpha-sig.figma.com/img/5f5e/b394/843282f33350ed1e0603043d81f1a532?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GDML-MwEDZsAQTkkVOe5w0hTq18y3VXr1NYCbwz2FdqULSjEbWp43qrEAiRY7htbNgs1B6Q2djsGnbTFSRz0mMcEFMZ6ghG-eghAZZ62ea2SGuPBIvvjXYxzzB47uAZOzhuVug-znpacbFygwoFkFzN0E2qU0WK598gQisg~V3qrrwE~G4QMS4wdgm0Qy~a9efwAJV790IsgOVvXS3Mv2Qlf3UfPl59GPRRoA5vyAnxkVy0LBHNEpE6KIdhFbFd7zdHKj8fEt9CA6cHwLlWzH6lcPPTjeV6JqFs9p43SnOXciKK3Azoa0~gfS5lw6T5sqT3kz4zRHNTl-114cVJr-Q__"
          alt=""
          className="w-[10%]"
        />
        <div className='className="w-[100%] absolute  bottom-[10%] p-4 left-1/2 transform -translate-x-1/2'>
          <CustomButton>Brouse all component</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default LatestLookbook;

const SwipeImages = () => {
  const [centerIndex, setCenterIndex] = useState(0);

  const productImages = [images.lb1, images.lb2, images.lb3];

  const imageNames = ["Necklace", "Earring", "Ring"];

  const handleClick = (index: number) => {
    if (index === centerIndex) {
      let path;
      switch (index) {
        case 0:
          path = "/puja";
          break;
        case 1:
          path = "/services";
          break;
        case 2:
          path = "/astrology";
          break;
        default:
          path = "/";
      }
    } else {
      setCenterIndex(index);
    }
  };

  const imageVariants = {
    center: { x: "0%", scale: 1.2, opacity: 1, zIndex: 5 },
    left: { x: "-105%", scale: 0.7, opacity: 0.5, zIndex: 1 },
    right: { x: "105%", scale: 0.7, opacity: 0.5, zIndex: 1 },
  };

  const mobileimageVariants = {
    center: { x: "0%", scale: 1.8, opacity: 1, zIndex: 5 },
    left: { x: "-150%", scale: 1.4, opacity: 0.5, zIndex: 1 },
    right: { x: "150%", scale: 1.4, opacity: 0.5, zIndex: 1 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="hidden lg:flex xl:flex md:flex justify-center items-center relative mt-12 pb-12">
        {productImages.map((image, index) => {
          const position =
            index === centerIndex
              ? "center"
              : index ===
                (centerIndex - 1 + productImages.length) % productImages.length
              ? "left"
              : "right";
          return (
            <motion.div
              key={index}
              initial="center"
              animate={position}
              variants={imageVariants}
              transition={{ duration: 0.5 }}
              className="absolute w-1/5 cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <img src={image} alt={imageNames[index]} className="w-full" />
              <p className="text-center text-xs lg:text-base mt-2">
                {imageNames[index]}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="lg:hidden xl:hidden md:hidden flex justify-center items-center relative mt-16 pb-8">
        {productImages.map((image, index) => {
          const position =
            index === centerIndex
              ? "center"
              : index ===
                (centerIndex - 1 + productImages.length) % productImages.length
              ? "left"
              : "right";
          return (
            <motion.div
              key={index}
              initial="center"
              animate={position}
              variants={mobileimageVariants}
              transition={{ duration: 0.5 }}
              className="absolute w-1/5 cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <img src={image} alt={imageNames[index]} className="w-full" />
              <p className="text-center text-xs lg:text-base mt-2">
                {imageNames[index]}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
