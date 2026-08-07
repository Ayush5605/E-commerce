import "./App.css";
import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;