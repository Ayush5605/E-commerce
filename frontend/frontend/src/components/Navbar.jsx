
import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ onSelectCategory, onSearch }) => {
 
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light-theme";
  };

  const [theme, setTheme] = useState(getInitialTheme());

  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

 
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme =
      theme === "dark-theme" ? "light-theme" : "dark-theme";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  
  const handleChange = async (value) => {
    setInput(value);

    
    if (onSearch) {
      onSearch(value);
    }

   
    if (value.trim().length === 0) {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    setShowSearchResults(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/search?keyword=${value}`);

      setSearchResults(response.data);
      setNoResults(response.data.length === 0);
    } catch (error) {
      console.error(
        "Error searching products:",
        error.response?.data || error.message
      );

      setSearchResults([]);
      setNoResults(true);
    }
  };

  // =========================
  // Categories
  // =========================
  const handleCategorySelect = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }

    // Close search results when category selected
    setShowSearchResults(false);
  };

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid px-lg-4">

          {/* =========================
              BRAND
          ========================= */}
          <a className="navbar-brand brand-logo" href="/">
            <div className="brand-icon">
              <i className="bi bi-shop"></i>
            </div>

            <span className="brand-text">
              Telusko<span>Store</span>
            </span>
          </a>

          {/* =========================
              MOBILE MENU BUTTON
          ========================= */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-2 text-secondary"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            {/* =========================
                LEFT NAVIGATION
            ========================= */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center ms-lg-3 gap-lg-1">

              {/* Home */}
              <li className="nav-item">
                <a
                  className="nav-link custom-nav-link"
                  href="/"
                >
                  <i className="bi bi-house-door me-1"></i>
                  Home
                </a>
              </li>

              {/* Add Product */}
              <li className="nav-item">
                <a
                  className="nav-link custom-nav-link"
                  href="/add_product"
                >
                  <i className="bi bi-plus-square me-1"></i>
                  Add Product
                </a>
              </li>

              {/* Categories */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link custom-nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-grid me-1"></i>
                  Categories
                </a>

                <ul className="dropdown-menu">

                  {/* All */}
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleCategorySelect("All")}
                    >
                      <i className="bi bi-collection text-primary"></i>
                      All
                    </button>
                  </li>

                  {/* Laptop */}
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleCategorySelect("Laptop")}
                    >
                      <i className="bi bi-laptop text-info"></i>
                      Laptop
                    </button>
                  </li>

                  {/* Headphone */}
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleCategorySelect("Headphone")}
                    >
                      <i className="bi bi-headphones text-success"></i>
                      Headphone
                    </button>
                  </li>

                  {/* Mobile */}
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleCategorySelect("Mobile")}
                    >
                      <i className="bi bi-phone text-primary"></i>
                      Mobile
                    </button>
                  </li>

                  {/* Electronics */}
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleCategorySelect("Electronics")}
                    >
                      <i className="bi bi-cpu text-info"></i>
                      Electronics
                    </button>
                  </li>

                  {/* Toys */}
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleCategorySelect("Toys")}
                    >
                      <i className="bi bi-controller text-danger"></i>
                      Toys
                    </button>
                  </li>

                  {/* Fashion */}
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleCategorySelect("Fashion")}
                    >
                      <i className="bi bi-bag text-warning"></i>
                      Fashion
                    </button>
                  </li>
                </ul>
              </li>
            </ul>

            {/* =========================
                RIGHT SIDE
            ========================= */}
            <div className="d-flex align-items-center gap-3">

              {/* =========================
                  SEARCH
              ========================= */}
              <div className="search-wrapper position-relative">
                <div className="search-input-group">

                  <i className="bi bi-search search-icon"></i>

                  <input
                    className="form-control custom-search-input"
                    type="search"
                    placeholder="Search products..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => {
                      if (input.trim().length > 0) {
                        setShowSearchResults(true);
                      }
                    }}
                  />
                </div>

                {/* =========================
                    SEARCH RESULTS
                ========================= */}
                {showSearchResults && (
                  <ul
                    className="list-group search-results"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      zIndex: 1050,
                      marginTop: "5px",
                    }}
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <li
                          key={result.id}
                          className="list-group-item"
                        >
                          <a
                            href={`/product/${result.id}`}
                            className="search-result-link text-decoration-none"
                            onClick={() =>
                              setShowSearchResults(false)
                            }
                          >
                            <div className="d-flex align-items-center gap-2">
                              <i className="bi bi-box-seam"></i>

                              <span>{result.name}</span>
                            </div>
                          </a>
                        </li>
                      ))
                    ) : (
                      noResults && (
                        <li className="list-group-item text-muted">
                          <i className="bi bi-search me-2"></i>
                          No product with such name
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>

              {/* =========================
                  THEME TOGGLE
              ========================= */}
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                title="Toggle Light/Dark Theme"
                aria-label="Toggle Theme"
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-sun-fill text-warning"></i>
                ) : (
                  <i className="bi bi-moon-stars-fill text-primary"></i>
                )}
              </button>

              {/* =========================
                  CART
              ========================= */}
              <a
                href="/cart"
                className="cart-btn-wrapper text-decoration-none"
                title="Shopping Cart"
              >
                <i className="bi bi-cart3"></i>
                <span>Cart</span>
              </a>

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

