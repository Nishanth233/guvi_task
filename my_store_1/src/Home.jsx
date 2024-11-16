import React from "react";
import ProductList from "./ProductList";

const Home = ({ products, addToCart }) => (
  <div>
    <ProductList products={products} addToCart={addToCart} />
  </div>
);

export default Home;
