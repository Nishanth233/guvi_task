import React from "react";
import Product from "./Product";
const ProductList = ({ products, addToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
    {products.map((product) => (
      <Product key={product.id} product={product} addToCart={addToCart} />
    ))}
  </div>
);

export default ProductList;
