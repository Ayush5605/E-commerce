import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Product = () => {
  const { id } = useParams();

  // IMPORTANT
  const navigate = useNavigate();

  const {
    addToCart,
    removeFromCart,
    refreshData,
  } = useContext(AppContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );

        setProduct(response.data);

        console.log("Product:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading
  if (!product) {
    return (
      <h2
        className="text-center"
        style={{ padding: "10rem" }}
      >
        Loading Product Details...
      </h2>
    );
  }

  // UPDATE
  const handleEditClick = () => {
    console.log("Update clicked");
    console.log("Product ID:", id);

    navigate(`/product/update/${id}`);
  };

  // DELETE
  const deleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/product/${id}`
      );

      removeFromCart(id);

      console.log("Product deleted successfully");

      alert("Product deleted successfully");

      refreshData();

      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ADD TO CART
  const handleAddToCart = () => {
    addToCart(product);

    alert("Product added to cart");
  };

  return (
    <main>

      <div className="product-detail-container">

        {/* Product Image */}
        <div className="product-detail-image-wrapper">

          {product.imageData ? (
            <img
              src={`data:${product.imageType};base64,${product.imageData}`}
              alt={product.name || "Product"}
              className="product-detail-image"
            />
          ) : (
            <i className="bi bi-box-seam product-detail-placeholder"></i>
          )}

        </div>

        {/* Product Details */}
        <div className="product-detail-body">

          {/* Category */}
          <span className="product-detail-category">
            {product.category || "Item"}
          </span>

          {/* Name */}
          <h1 className="product-detail-title">
            {product.name}
          </h1>

          {/* Brand */}
          <h5 className="product-detail-brand">
            <i className="bi bi-tag-fill me-1"></i>
            Brand: {product.brand}
          </h5>

          {/* Description */}
          <p className="product-detail-description">
            {product.description}
          </p>

          {/* Price + Cart */}
          <div className="d-flex align-items-center gap-3">

            <h3 className="product-price mb-0">
              <i className="bi bi-currency-rupee"></i>
              {product.price}
            </h3>

            <button
              className={`btn-add-cart ${
                !product.productAvailable
                  ? "disabled-btn"
                  : ""
              }`}
              disabled={!product.productAvailable}
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus-fill"></i>

              {product.productAvailable
                ? "Add to cart"
                : "Out of Stock"}
            </button>

          </div>

          <hr className="product-divider" />

          {/* Stock */}
          <div className="product-detail-stock-row">

            <div>
              <span>Stock Available: </span>

              <span className="stock-badge">
                {product.stockQuantity} items
              </span>
            </div>

            {product.releaseDate && (
              <div>
                <span>Listed on: </span>

                <span className="text-muted">
                  {product.releaseDate}
                </span>
              </div>
            )}

          </div>

          {/* Buttons */}
          <div className="product-detail-actions">

            {/* UPDATE */}
            <button
              className="btn-secondary-action"
              type="button"
              onClick={handleEditClick}
            >
              <i className="bi bi-pencil-square me-1"></i>
              Update
            </button>

            {/* DELETE */}
            <button
              className="btn-danger-action"
              type="button"
              onClick={deleteProduct}
            >
              <i className="bi bi-trash me-1"></i>
              Delete
            </button>

          </div>

        </div>

      </div>

    </main>
  );
};

export default Product;