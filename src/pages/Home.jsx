import React from "react";
import { Hero } from "../components/Hero.jsx";
import {ProductCard} from "../components/ProductCard.jsx";

export const Home = () => {
  return (
    <>
      <Hero />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-4">
        <ProductCard
          image="https://via.placeholder.com/150"
          title="Product 1"
          price={29.99}
          discount={10}
          rating={4.5}
          reviews={120}
          fastDelivery={true}
          bestPrice={false}
        />
        <ProductCard
          image="https://via.placeholder.com/150"
          title="Product 2"
          price={49.99}
          discount={15}
          rating={4.0}
          reviews={80}
          fastDelivery={false}
          bestPrice={true}
        />
        <ProductCard
          image="https://via.placeholder.com/150"
          title="Product 3"
          price={19.99}
          discount={5}
          rating={5.0}
          reviews={200}
          fastDelivery={true}
          bestPrice={false}
        />
      </div>
    </>
  );
};