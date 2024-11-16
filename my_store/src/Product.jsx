import React from "react";

const Product = ({ product, addToCart }) => (
  <div className="bg-white shadow-md border border-grey rounded-lg p-4 transition duration-500 ease-in-out transform hover:scale-110">
    <img
      src={product.image}
      alt={product.title}
      className=" h-48  rounded-md mb-4 "
    />
    <h2 className="text-xl font-bold mb-2">{product.title}</h2>
    <p className="text-gray-700 mb-2">${product.price}</p>
    <button
      onClick={() => addToCart(product)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      Add to Cart
    </button>
  </div>
);

export default Product;
