import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import images from "../assets/images";

interface Category {
  name: string;
  image: string;
}

const categories: Category[] = [
  { name: "Rings", image: images.ct1 },
  { name: "Earrings Set", image: images.ct2 },
  { name: "Necklaces", image: images.ct3 },
  { name: "Chains", image: images.ct4 },
  { name: "Nose Pin", image: images.ct5 },
  { name: "Earrings", image: images.ct6 },
  { name: "Bangles", image: images.ct7 },
  { name: "Bracelets", image: images.ct8 },
  { name: "Pendants", image: images.ct9 },
  { name: "Studs", image: images.ct10 },
  { name: "Tops", image: images.ct3 },
  { name: "Nose Pin", image: images.ct11 },
];

const ShopByCategory: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="container mx-auto px-4 mt-10 py-12">
      <div className="text-center items-center flex flex-col justify-center">
        <h2 className="text-1xl font-md text-center uppercase text-[#2993B5]">
          The Most Popular
        </h2>
        <h2 className="text-2xl font-lg text-center uppercase mb-4">
          Shop By Category
        </h2>
        <hr className="border border-[#6F6F6F]  text-center items-center justify-center flex w-16 mb-8" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            ref={ref}
            className="text-center  "
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
          >
            <div className="overflow-hidden mb-2">
              {" "}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover  transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-3 "
              />
            </div>
            <p className="text-sm font-medium uppercase font-Montaga">
              {category.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
