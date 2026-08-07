import React from "react";

const AddProduct = () => {
  return (
    <main className="main-content">
      <div className="placeholder-container">
        <div className="placeholder-card">
          <div className="placeholder-icon-circle">
            <i className="bi bi-plus-circle-dotted"></i>
          </div>
          <h2 className="placeholder-title">Add Product Coming Soon...</h2>
          <p className="placeholder-text">
            We are working on bringing full product creation and management features to your dashboard. Check back soon for updates!
          </p>
          <a href="/" className="btn-add-cart text-decoration-none">
            <i className="bi bi-arrow-left"></i> Return to Home
          </a>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;