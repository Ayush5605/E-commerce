import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );

        setProduct(response.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h2>Loading...</h2>
        <p>Loading Product Details...</p>
      </div>
    );
  }

  return (
    <main className="container py-5">

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

          <span className="product-detail-category">
            {product.category || "Item"}
          </span>

          <h1 className="product-detail-title">
            {product.name}
          </h1>

          <h5 className="product-detail-brand">
            <i className="bi bi-tag-fill me-1"></i>
            Brand: {product.brand}
          </h5>

          <p className="product-detail-description">
            {product.description}
          </p>

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
            >
              <i className="bi bi-cart-plus-fill"></i>

              {product.productAvailable
                ? "Add to cart"
                : "Out of Stock"}
            </button>

          </div>

          <hr className="product-divider" />

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

          <div className="product-detail-actions">

            <button
              className="btn-secondary-action"
              type="button"
            >
              <i className="bi bi-pencil-square me-1"></i>
              Update
            </button>

            <button
              className="btn-danger-action"
              type="button"
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