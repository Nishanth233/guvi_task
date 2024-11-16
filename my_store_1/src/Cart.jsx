import React from "react";

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Cart</h2>
    {cartItems.length === 0 && <p>Your cart is empty.</p>}
    {cartItems.map((item, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-4 mb-2 flex justify-between items-center"
      >
        <div>
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-gray-700">${item.price}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="bg-gray-300 text-black px-2 py-1 rounded-md"
            >
              -
            </button>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="bg-gray-300 text-black px-2 py-1 rounded-md"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Remove from Cart
        </button>
      </div>
    ))}
    <div className="mt-4">
      <h3 className="text-xl font-bold">
        Total: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </h3>
      <h3 className="text-xl font-bold text-green-500">
        Discounted Total (10% off): $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) * 0.9}
      </h3>
    </div>
  </div>
);

export default Cart;
