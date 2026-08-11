import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Product = () => {
  const { id } = useParams();
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

  // DELETE PRODUCT
  const deleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/product/${id}`
      );

      removeFromCart(id);

      alert("Product deleted successfully");

      refreshData();

      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // UPDATE PRODUCT
  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  // ADD TO CART
  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  // LOADING
  if (!product) {
    return (
      <>
        <style>
          {`
            .product-loading {
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #0b0f19;
              color: #94a3b8;
              font-size: 22px;
              font-weight: 500;
            }

            .product-loading i {
              color: #6366f1;
              margin-right: 10px;
            }
          `}
        </style>

        <div className="product-loading">
          <div>
            <i className="bi bi-hourglass-split"></i>
            Loading Product Details...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>
        {`

        /* =========================================
           MAIN PRODUCT PAGE
        ========================================= */

        .product-page {
          min-height: 100vh;
          background: #0b0f19;
          padding-top: 100px;
          padding-bottom: 60px;
          color: #f8fafc;
        }


        /* =========================================
           PRODUCT CONTAINER
        ========================================= */

        .product-detail-container {
          max-width: 1200px;
          min-height: 650px;
          margin: 0 auto;
          padding: 45px;

          display: grid;
          grid-template-columns: 48% 52%;
          gap: 55px;

          align-items: center;

          background: #101522;

          border: 1px solid rgba(148, 163, 184, 0.12);

          border-radius: 25px;

          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.35);

          box-sizing: border-box;
        }


        /* =========================================
           IMAGE SECTION
        ========================================= */

        .product-detail-image-wrapper {
          height: 500px;

          display: flex;
          justify-content: center;
          align-items: center;

          position: relative;

          border-radius: 22px;

          background:
            radial-gradient(
              circle at center,
              rgba(99, 102, 241, 0.18),
              transparent 60%
            ),
            #0d121e;

          border: 1px solid rgba(99, 102, 241, 0.12);

          overflow: hidden;
        }


        .product-detail-image {
          width: 90%;
          height: 90%;

          object-fit: contain;

          position: relative;
          z-index: 2;

          transition: transform 0.35s ease;
        }


        .product-detail-image:hover {
          transform: scale(1.05);
        }


        .product-detail-placeholder {
          font-size: 120px;
          color: #6366f1;
          opacity: 0.6;
        }


        /* =========================================
           PRODUCT INFORMATION
        ========================================= */

        .product-detail-body {
          padding: 10px 0;
        }


        /* =========================================
           CATEGORY
        ========================================= */

        .product-detail-category {
          display: inline-block;

          padding: 8px 18px;

          border-radius: 30px;

          background: rgba(99, 102, 241, 0.18);

          color: #a5b4fc;

          font-size: 13px;

          font-weight: 700;

          text-transform: uppercase;

          letter-spacing: 1px;

          margin-bottom: 20px;
        }


        /* =========================================
           PRODUCT TITLE
        ========================================= */

        .product-detail-title {
          margin: 0 0 18px;

          font-size: 48px;

          line-height: 1.1;

          font-weight: 800;

          color: #f8fafc;

          letter-spacing: -1px;
        }


        /* =========================================
           BRAND
        ========================================= */

        .product-detail-brand {
          margin-bottom: 25px;

          color: #94a3b8;

          font-size: 17px;

          font-weight: 500;
        }


        .product-detail-brand i {
          color: #818cf8;
        }


        /* =========================================
           DESCRIPTION
        ========================================= */

        .product-detail-description {
          margin-bottom: 35px;

          max-width: 550px;

          color: #94a3b8;

          font-size: 17px;

          line-height: 1.8;
        }


        /* =========================================
           PRICE
        ========================================= */

        .product-price {
          margin: 0;

          color: #818cf8;

          font-size: 34px;

          font-weight: 800;
        }


        .product-price i {
          font-size: 25px;
        }


        /* =========================================
           ADD TO CART
        ========================================= */

        .btn-add-cart {
          border: none;

          padding: 15px 25px;

          display: flex;
          align-items: center;
          gap: 9px;

          border-radius: 13px;

          background: linear-gradient(
            135deg,
            #6366f1,
            #7c3aed
          );

          color: white;

          font-size: 16px;

          font-weight: 600;

          cursor: pointer;

          box-shadow:
            0 8px 25px rgba(99, 102, 241, 0.25);

          transition: all 0.25s ease;
        }


        .btn-add-cart:hover {
          transform: translateY(-2px);

          box-shadow:
            0 12px 35px rgba(99, 102, 241, 0.4);
        }


        .btn-add-cart i {
          font-size: 18px;
        }


        /* OUT OF STOCK */

        .disabled-btn {
          background: #334155;

          color: #94a3b8;

          cursor: not-allowed;

          box-shadow: none;
        }


        .disabled-btn:hover {
          transform: none;

          box-shadow: none;
        }


        /* =========================================
           DIVIDER
        ========================================= */

        .product-divider {
          border: none;

          border-top: 1px solid rgba(148, 163, 184, 0.12);

          margin: 40px 0 25px;
        }


        /* =========================================
           STOCK INFORMATION
        ========================================= */

        .product-detail-stock-row {
          display: flex;

          align-items: center;

          gap: 35px;

          margin-bottom: 35px;

          color: #94a3b8;

          font-size: 15px;
        }


        .stock-badge {
          margin-left: 5px;

          color: #34d399;

          font-weight: 700;
        }


        .product-detail-stock-row .text-muted {
          color: #64748b !important;
        }


        /* =========================================
           UPDATE / DELETE BUTTONS
        ========================================= */

        .product-detail-actions {
          display: flex;

          gap: 15px;
        }


        .btn-secondary-action {
          padding: 13px 25px;

          border-radius: 12px;

          border: 1px solid #334155;

          background: transparent;

          color: #f1f5f9;

          font-size: 16px;

          font-weight: 600;

          cursor: pointer;

          transition: all 0.25s ease;
        }


        .btn-secondary-action:hover {
          background: rgba(99, 102, 241, 0.12);

          border-color: #6366f1;

          color: #a5b4fc;

          transform: translateY(-2px);
        }


        .btn-danger-action {
          padding: 13px 25px;

          border-radius: 12px;

          border: 1px solid rgba(239, 68, 68, 0.4);

          background: rgba(239, 68, 68, 0.08);

          color: #f87171;

          font-size: 16px;

          font-weight: 600;

          cursor: pointer;

          transition: all 0.25s ease;
        }


        .btn-danger-action:hover {
          background: rgba(239, 68, 68, 0.16);

          border-color: #ef4444;

          color: #fca5a5;

          transform: translateY(-2px);
        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 992px) {

          .product-page {
            padding: 100px 25px 50px;
          }

          .product-detail-container {
            max-width: 750px;

            grid-template-columns: 1fr;

            gap: 40px;

            padding: 30px;
          }

          .product-detail-image-wrapper {
            height: 420px;
          }

          .product-detail-title {
            font-size: 40px;
          }
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 576px) {

          .product-page {
            padding: 90px 15px 40px;
          }

          .product-detail-container {
            padding: 20px;

            border-radius: 18px;

            gap: 30px;
          }

          .product-detail-image-wrapper {
            height: 300px;

            border-radius: 16px;
          }

          .product-detail-title {
            font-size: 32px;
          }

          .product-detail-description {
            font-size: 15px;
          }

          .product-price {
            font-size: 28px;
          }

          .btn-add-cart {
            padding: 13px 17px;

            font-size: 14px;
          }

          .product-detail-stock-row {
            flex-direction: column;

            align-items: flex-start;

            gap: 10px;
          }

          .product-detail-actions {
            width: 100%;
          }

          .btn-secondary-action,
          .btn-danger-action {
            flex: 1;

            padding: 12px 15px;

            font-size: 14px;
          }
        }

        `}
      </style>

      <main className="product-page">

        <div className="product-detail-container">

          {/* =========================
              PRODUCT IMAGE
          ========================= */}

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


          {/* =========================
              PRODUCT DETAILS
          ========================= */}

          <div className="product-detail-body">

            {/* CATEGORY */}

            <span className="product-detail-category">
              {product.category || "Item"}
            </span>


            {/* NAME */}

            <h1 className="product-detail-title">
              {product.name}
            </h1>


            {/* BRAND */}

            <h5 className="product-detail-brand">
              <i className="bi bi-tag-fill me-1"></i>
              Brand: {product.brand}
            </h5>


            {/* DESCRIPTION */}

            <p className="product-detail-description">
              {product.description}
            </p>


            {/* PRICE + CART */}

            <div className="d-flex align-items-center gap-3">

              <h3 className="product-price">
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


            {/* DIVIDER */}

            <hr className="product-divider" />


            {/* STOCK */}

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


            {/* ACTION BUTTONS */}

            <div className="product-detail-actions">

              <button
                className="btn-secondary-action"
                type="button"
                onClick={handleEditClick}
              >
                <i className="bi bi-pencil-square me-1"></i>
                Update
              </button>


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
    </>
  );
};

export default Product;