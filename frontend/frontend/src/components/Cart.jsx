import React from 'react';

const Cart = () => {
  return (
    <main className="main-content">
      <div className="placeholder-container">
        <div className="placeholder-card">
          <div className="placeholder-icon-circle">
            <i className="bi bi-cart3"></i>
          </div>
          <h2 className="placeholder-title">Your Cart</h2>
          <p className="placeholder-text">
            Your shopping cart is currently empty. Explore our catalog and add your favorite items!
          </p>
          <a href="/" className="btn-add-cart text-decoration-none">
            <i className="bi bi-bag-plus me-1"></i> Browse Products
          </a>
        </div>
      </div>
    </main>
  );
};

export default Cart;