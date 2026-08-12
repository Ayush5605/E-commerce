import React, { useContext, useState, useEffect } from "react";
import NewAppContext from "../Context/NewContext.jsx";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from 'react-bootstrap';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(NewAppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartImage, setCartImage] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

  useEffect(() => {
    setCartItems(cart.length ? cart : []);
  }, [cart]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const converUrlToFile = async (blobData, fileName) => {
    const file = new File([blobData], fileName, { type: blobData.type });
    return file;
  };

  const handleIncreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity < item.stockQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          toast.info("Cannot add more than available stock");
        }
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(newCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    const newCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(newCartItems);
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const { imageUrl, imageName, imageData, imageType, quantity, ...rest } = item;
        const updatedStockQuantity = item.stockQuantity - item.quantity;

        const updatedProductData = { ...rest, stockQuantity: updatedStockQuantity };
        console.log("updated product data", updatedProductData);

        const cartProduct = new FormData();
        cartProduct.append("imageFile", cartImage);
        cartProduct.append(
          "product",
          new Blob([JSON.stringify(updatedProductData)], { type: "application/json" })
        );

        await axios
          .put(`${baseUrl}/api/product/${item.id}`, cartProduct, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Product updated successfully:", (cartProduct));
          })
          .catch((error) => {
            console.error("Error updating product:", error);
          });
      }
      clearCart();
      setCartItems([]);
      setShowModal(false);
    } catch (error) {
      console.log("error during checkout", error);
    }
  };

  return (
    <div className="container py-5 my-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="cart-card">
            <div className="cart-card-header d-flex align-items-center justify-content-between">
              <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
                <i className="bi bi-cart3 text-primary"></i> Shopping Cart
              </h4>
              <span className="badge bg-primary rounded-pill fs-6 px-3 py-2">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
              </span>
            </div>
            <div className="cart-card-body">
              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-cart-x fs-1 text-muted"></i>
                  <h5 className="mt-3">Your cart is empty</h5>
                  <p className="text-muted">Explore our catalog to add items to your cart.</p>
                  <a href="/" className="btn btn-checkout mt-2 text-decoration-none">
                    <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                  </a>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table cart-table align-middle">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={`${baseUrl}/api/product/${item.id}/image`}
                                  alt={item.name}
                                  className="rounded me-3 border"
                                  width="70"
                                  height="70"
                                  style={{ objectFit: "cover" }}
                                />
                                <div>
                                  <h6 className="mb-0 cart-item-name">{item.name}</h6>
                                  <small className="cart-item-brand">{item.brand}</small>
                                </div>
                              </div>
                            </td>
                            <td className="cart-item-price">₹ {item.price}</td>
                            <td>
                              <div className="input-group input-group-sm" style={{ width: "120px" }}>
                                <button
                                  className="btn cart-qty-btn"
                                  type="button"
                                  onClick={() => handleDecreaseQuantity(item.id)}
                                >
                                  <i className="bi bi-dash"></i>
                                </button>
                                <input
                                  type="text"
                                  className="form-control text-center cart-qty-input"
                                  value={item.quantity}
                                  readOnly
                                />
                                <button
                                  className="btn cart-qty-btn"
                                  type="button"
                                  onClick={() => handleIncreaseQuantity(item.id)}
                                >
                                  <i className="bi bi-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td className="fw-bold cart-item-price">₹ {(item.price * item.quantity).toFixed(2)}</td>
                            <td className="text-end">
                              <button
                                className="btn btn-sm btn-outline-danger rounded-circle p-2"
                                onClick={() => handleRemoveFromCart(item.id)}
                                title="Remove item"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="cart-summary-card mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">Grand Total:</h5>
                      <h4 className="mb-0 cart-total-price">₹ {totalPrice.toFixed(2)}</h4>
                    </div>
                  </div>

                  <div className="d-grid mt-4">
                    <button
                      className="btn-checkout py-3"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="bi bi-credit-card me-2"></i>Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;