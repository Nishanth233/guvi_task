import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Modal from "./Modal";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isModalOpen]);

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
    <div>
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setIsModalOpen(true)}
      />
      <ProductList products={products} addToCart={addToCart} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Cart cartItems={cart} removeFromCart={removeFromCart} />
      </Modal>
    </div>
  );
};

export default App;
