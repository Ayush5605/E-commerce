import React, { useEffect, useState } from "react";

const Navbar = ({ onSelectCategory, onSearch }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [theme, setTheme] = useState(getInitialTheme());

  const toggleTheme = () => {
    const newTheme =
      theme === "dark-theme" ? "light-theme" : "dark-theme";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid px-lg-4">
          <a className="navbar-brand brand-logo" href="/">
            <div className="brand-icon">
              <i className="bi bi-shop"></i>
            </div>
            <span className="brand-text">
              Telusko<span>Store</span>
            </span>
          </a>

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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center ms-lg-3 gap-lg-1">
              <li className="nav-item">
                <a className="nav-link custom-nav-link" href="/">
                  <i className="bi bi-house-door me-1"></i> Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link custom-nav-link" href="/add_product">
                  <i className="bi bi-plus-square me-1"></i> Add Product
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link custom-nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-grid me-1"></i> Categories
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => onSelectCategory && onSelectCategory("All")}
                    >
                      <i className="bi bi-collection text-primary"></i> All
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => onSelectCategory && onSelectCategory("Electronics")}
                    >
                      <i className="bi bi-laptop text-info"></i> Electronics
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => onSelectCategory && onSelectCategory("Clothing")}
                    >
                      <i className="bi bi-bag text-warning"></i> Clothing
                    </button>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              <div className="search-wrapper">
                <div className="search-input-group">
                  <i className="bi bi-search search-icon"></i>
                  <input
                    className="form-control custom-search-input"
                    type="search"
                    placeholder="Search products..."
                    onChange={(e) => onSearch && onSearch(e.target.value)}
                  />
                </div>
              </div>

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

              <div className="cart-btn-wrapper" title="Shopping Cart">
                <i className="bi bi-cart3"></i>
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;