import React from "react";

const Cart = ({ cartItems, removeFromCart }) => (
  <div>
    {cartItems.length === 0 && <p>Your cart is empty.</p>}
    {cartItems.map((item, index) => (
      <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-2">
        <h3 className="text-xl font-bold">{item.title}</h3>
        <p className="text-gray-700">${item.price}</p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Remove from Cart
        </button>
      </div>
    ))}
  </div>
);

export default Cart;
