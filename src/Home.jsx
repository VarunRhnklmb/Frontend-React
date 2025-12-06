import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchHomeProducts } from "./store";

function Home() {
  const dispatch = useDispatch();

  // Fetch home products from backend
  useEffect(() => {
    dispatch(fetchHomeProducts()).then((res) => {
      console.log("HOME BACKEND DATA:", res.payload);
    });
  }, [dispatch]);

  const { homeItems, loading, error } = useSelector((state) => state.home);
  const items = Array.isArray(homeItems) ? homeItems : [];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  // const featuredItems = []; // Commented out, replaced by backend items

  // Calculate final price safely
  const getFinalPrice = (price, discount) => {
    const discountValue = parseInt(discount?.toString().replace("%", "")) || 0;
    return (price - (price * discountValue) / 100).toFixed(0);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to FreshMart</h1>
        <p className="hero-subtitle">
          Fresh groceries and delicious meals delivered to your door
        </p>
      </div>

      {/* Loading/Error Messages */}
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="featured-items">
        {Array.isArray(currentItems) &&
          currentItems.map((item) => (
            <div className="item-card" key={item.id}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="desc"><b>{item.desc}</b></p>

              <div className="price-box">
                <p className="old-price">₹{item.price}</p>
                <p className="final-price">{getFinalPrice(item.price, item.discount)}</p>
                <span className="discount-tag">{item.discount}% OFF</span>
              </div>

              <button className="add-to-cart" onClick={() => dispatch(addToCart(item))}>
                Add to Cart
              </button>
            </div>
          ))}
      </div>

      <div className="pagination-container">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ⬅ Previous
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${currentPage === i + 1 ? "active-page" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next ➡
        </button>
      </div>

      {/* FOOTER */}
      <div className="footer-section">
        <h3>About FreshMart</h3>
        <p>Fresh groceries delivered to your home.</p>
        <p className="copyright">© 2025 FreshMart. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Home;
