import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/products"
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  if (isError) {
    return (
      <main className="main-content">
        <div className="error-container">
          <div className="error-card">
            <div className="error-icon-circle">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <h3 className="error-title">Something went wrong...</h3>
            <p className="error-text">
              Unable to connect to the backend server. Please verify your API status and try refreshing.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="catalog-header">
        <div>
          <h2 className="catalog-title">
            <i className="bi bi-bag-check-fill text-primary"></i> Product Catalog
          </h2>
          <p className="catalog-subtitle">
            {products.length > 0 
              ? `Showing ${products.length} products` 
              : "Discover quality electronics and apparel items below."}
          </p>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="modern-card" key={product.id}>
            <div className="card-image-wrapper">
              <i className="bi bi-box-seam placeholder-icon"></i>
              <span className="card-badge">
                {product.category ? product.category : "Item"}
              </span>
            </div>

            <div className="card-content">
              <div className="product-info">
                <h3 className="product-name">{product.name.toUpperCase()}</h3>
                <div className="product-brand">
                  <i className="bi bi-tag-fill text-muted"></i> by {product.brand}
                </div>
              </div>

              <hr className="product-divider" />

              <div className="card-action-row">
                <h4 className="product-price">
                  <i className="bi bi-currency-rupee"></i>
                  {product.price}
                </h4>
                <button className="btn-add-cart">
                  <i className="bi bi-cart-plus-fill"></i> Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;