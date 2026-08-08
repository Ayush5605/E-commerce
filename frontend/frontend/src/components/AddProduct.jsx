import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", image);

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], {
        type: "application/json",
      })
    );

    axios
      .post("http://localhost:8080/api/product", formData)
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        console.log("Backend error:", error.response?.data);
        alert("Error adding product");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">

          <h2 className="text-center mb-4">Add Product</h2>

          <form
            className="row g-3"
            onSubmit={submitHandler}
          >

            {/* Name */}
            <div className="col-md-6">
              <label className="form-label">
                <h6>Name</h6>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </div>

            {/* Brand */}
            <div className="col-md-6">
              <label className="form-label">
                <h6>Brand</h6>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Brand"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label">
                <h6>Description</h6>
              </label>

              <textarea
                className="form-control"
                placeholder="Product Description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            {/* Price */}
            <div className="col-md-4">
              <label className="form-label">
                <h6>Price</h6>
              </label>

              <input
                type="number"
                className="form-control"
                placeholder="Price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>

            {/* Category */}
            <div className="col-md-6">
              <label className="form-label">
                <h6>Category</h6>
              </label>

              <select
                className="form-select"
                value={product.category}
                onChange={handleInputChange}
                name="category"
              >
                <option value="">Select category</option>
                <option value="Laptop">Laptop</option>
                <option value="Headphone">Headphone</option>
                <option value="Mobile">Mobile</option>
                <option value="Electronics">Electronics</option>
                <option value="Toys">Toys</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            {/* Stock Quantity */}
            <div className="col-md-4">
              <label className="form-label">
                <h6>Stock Quantity</h6>
              </label>

              <input
                type="number"
                className="form-control"
                placeholder="Stock Remaining"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleInputChange}
              />
            </div>

            {/* Release Date */}
            <div className="col-md-4">
              <label className="form-label">
                <h6>Release Date</h6>
              </label>

              <input
                type="date"
                className="form-control"
                name="releaseDate"
                value={product.releaseDate}
                onChange={handleInputChange}
              />
            </div>

            {/* Image */}
            <div className="col-md-4">
              <label className="form-label">
                <h6>Image</h6>
              </label>

              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Product Available */}
            <div className="col-12">
              <div className="form-check">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="productAvailable"
                  id="gridCheck"
                  checked={product.productAvailable}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      productAvailable: e.target.checked,
                    })
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor="gridCheck"
                >
                  Product Available
                </label>

              </div>
            </div>

            {/* Submit */}
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;