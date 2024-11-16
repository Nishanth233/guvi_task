import React from "react";
import Cart from "./Cart";

const CartPage = ({ cartItems, removeFromCart, updateQuantity }) => (
  <div>
    <Cart
      cartItems={cartItems}
      removeFromCart={removeFromCart}
      updateQuantity={updateQuantity}
    />
  </div>
);

export default CartPage;
