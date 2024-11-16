import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Modal from "./Modal";
import Cart from "./Cart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  const addToCart = (product) => {
    const isProductInCart = cart.find((item) => item.id === product.id);
    if (isProductInCart) {
      alert("Item already added to the cart");
    } else {
      setCart([...cart, product]);
    }
  };
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };
  return (
    <>
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setIsModalOpen(true)}
      />
      <ProductList products={products} addToCart={addToCart} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Cart cartItems={cart} removeFromCart={removeFromCart} />
      </Modal>
    </>
  );
};

export default App;
