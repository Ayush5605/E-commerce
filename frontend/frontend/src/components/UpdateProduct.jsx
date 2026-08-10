import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null);

  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Get product details
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );

        const productData = response.data;

        console.log("Product:", productData);

        setProduct(productData);

        setUpdateProduct({
          id: productData.id,
          name: productData.name || "",
          description: productData.description || "",
          brand: productData.brand || "",
          price: productData.price || "",
          category: productData.category || "",
          releaseDate: productData.releaseDate || "",
          productAvailable: productData.productAvailable || false,
          stockQuantity: productData.stockQuantity || "",
        });

        // Get product image
        const responseImage = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          {
            responseType: "blob",
          }
        );

        // Convert blob to File
        const imageFile = await convertUrlToFile(
          responseImage.data,
          productData.imageName
        );

        setImage(imageFile);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Convert Blob -> File
  const convertUrlToFile = async (blobData, fileName) => {
    const file = new File([blobData], fileName, {
      type: blobData.type,
    });

    return file;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox
  const handleAvailabilityChange = (e) => {
    setUpdateProduct((prev) => ({
      ...prev,
      productAvailable: e.target.checked,
    }));
  };

  // Handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Image:", image);
      console.log("Product:", updateProduct);

      const formData = new FormData();

      // Add image
      if (image) {
        formData.append("imageFile", image);
      }

      // Add product JSON
      formData.append(
        "product",
        new Blob([JSON.stringify(updateProduct)], {
          type: "application/json",
        })
      );

      // Send request
      const response = await axios.put(
        `http://localhost:8080/api/product/${id}`,
        formData
      );

      console.log("Product updated successfully:", response.data);

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);

      if (error.response) {
        console.log("Backend error:", error.response.data);
      }

      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">

          <h2 className="text-center mb-4">
            Update Product
          </h2>

          <form
            onSubmit={handleSubmit}
            className="row g-3"
          >

            {/* Name */}
            <div className="col-md-6">
              <label className="form-label">
                <h6>Name</h6>
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={updateProduct.name}
                onChange={handleChange}
                required
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
                name="brand"
                value={updateProduct.brand}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label">
                <h6>Description</h6>
              </label>

              <textarea
                className="form-control"
                name="description"
                rows="4"
                value={updateProduct.description}
                onChange={handleChange}
                required
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
                name="price"
                value={updateProduct.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div className="col-md-4">
              <label className="form-label">
                <h6>Category</h6>
              </label>

              <select
                className="form-select"
                name="category"
                value={updateProduct.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select category
                </option>

                <option value="Laptop">
                  Laptop
                </option>

                <option value="Headphone">
                  Headphone
                </option>

                <option value="Mobile">
                  Mobile
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Toys">
                  Toys
                </option>

                <option value="Fashion">
                  Fashion
                </option>
              </select>
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
                value={updateProduct.releaseDate}
                onChange={handleChange}
              />
            </div>

            {/* Stock Quantity */}
            <div className="col-md-4">
              <label className="form-label">
                <h6>Stock Quantity</h6>
              </label>

              <input
                type="number"
                className="form-control"
                name="stockQuantity"
                value={updateProduct.stockQuantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image */}
            <div className="col-md-8">
              <label className="form-label">
                <h6>Image</h6>
              </label>

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt={product.imageName || "Product"}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    padding: "5px",
                    marginBottom: "10px",
                  }}
                />
              )}

              <input
                className="form-control"
                type="file"
                onChange={handleImageChange}
                name="imageFile"
                id="imageFile"
                accept="image/*"
              />
            </div>

            {/* Product Available */}
            <div className="col-12">
              <div className="form-check">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="productAvailable"
                  id="productAvailable"
                  checked={updateProduct.productAvailable}
                  onChange={handleAvailabilityChange}
                />

                <label
                  className="form-check-label"
                  htmlFor="productAvailable"
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
                Update Product
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;