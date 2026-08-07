import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Home = () => {
  const { data, isError, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    refreshData();

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products directly:", error);
      }
    };

    fetchData();
  }, []);

  const productList = (data && data.length > 0) ? data : products;

  if (isError) {
    return (
      <main className="main-content">
        <div className="error-container">
          <div className="error-card">
            <div className="error-icon-circle">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <h3 className="error-title">Unable to Connect</h3>
            <p className="error-text">
              Could not fetch products from backend server. Please verify Spring Boot server status at http://localhost:8080/api/products.
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
            {productList.length > 0 
              ? `Showing ${productList.length} available items` 
              : "Discover quality electronics and apparel items below."}
          </p>
        </div>
      </div>

      {productList.length === 0 ? (
        <div className="placeholder-container">
          <div className="placeholder-card">
            <div className="placeholder-icon-circle">
              <i className="bi bi-inbox"></i>
            </div>
            <h3 className="placeholder-title">No Products Found</h3>
            <p className="placeholder-text">
              The product database table is currently empty. Add your first product to see it in the catalog!
            </p>
            <Link to="/add_product" className="btn-add-cart text-decoration-none">
              <i className="bi bi-plus-circle me-1"></i> Add Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {productList.map((product) => (
            <div className="modern-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="text-decoration-none text-reset">
                <div className="card-image-wrapper">
                  <i className="bi bi-box-seam placeholder-icon"></i>
                  <span className="card-badge">
                    {product.category || "Item"}
                  </span>
                </div>
              </Link>

              <div className="card-content">
                <div className="product-info">
                  <Link to={`/product/${product.id}`} className="text-decoration-none text-reset">
                    <h3 className="product-name">{product.name ? product.name.toUpperCase() : "UNNAMED PRODUCT"}</h3>
                  </Link>
                  <div className="product-brand">
                    <i className="bi bi-tag-fill text-muted"></i> by {product.brand || "Generic"}
                  </div>
                </div>

                <hr className="product-divider" />

                <div className="card-action-row">
                  <h4 className="product-price">
                    <i className="bi bi-currency-rupee"></i>
                    {product.price}
                  </h4>
                  <button className="btn-add-cart" onClick={(e) => e.stopPropagation()}>
                    <i className="bi bi-cart-plus-fill"></i> Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;