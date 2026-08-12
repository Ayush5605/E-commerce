import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CheckoutPopup = ({ show, handleClose, cartItems = [], totalPrice = 0, handleCheckout }) => {
  return (
    <div className="checkoutPopup">
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="px-4 pt-4 border-0">
          <Modal.Title className="fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-credit-card-2-front text-primary"></i> Order Checkout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-3">
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="checkout-item-card p-3 mb-3 d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="checkout-icon-box">
                    <i className="bi bi-box-seam fs-4"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{item.name}</h6>
                    <small className="text-secondary">Quantity: {item.quantity}</small>
                  </div>
                </div>
                <div className="text-end">
                  <span className="fw-bold text-primary fs-5">
                    <i className="bi bi-currency-rupee"></i>{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="checkout-total-box d-flex align-items-center justify-content-between mt-4">
              <h5 className="mb-0 fw-bold">Total Amount</h5>
              <h4 className="mb-0 fw-extrabold text-primary">
                <i className="bi bi-currency-rupee"></i>{totalPrice}
              </h4>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="px-4 pb-4 border-0">
          <Button variant="outline-secondary" onClick={handleClose} className="rounded-3 px-4">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCheckout} className="btn-add-cart rounded-3 px-4">
            <i className="bi bi-check-circle-fill me-1"></i> Confirm Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutPopup;