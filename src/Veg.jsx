import { useEffect, useState } from "react";
import "./Veg.css";
import { addToCart, fetchVegProducts } from "./store";
import { useDispatch, useSelector } from "react-redux";

function Veg() {
  const dispatch = useDispatch();

  // Fetch veg products from backend
  useEffect(() => {
  dispatch(fetchVegProducts()).then((res) => {
    console.log("VEG BACKEND DATA:", res.payload);

    
  });
}, [dispatch]);


  const{vegItems, loading, error } = useSelector((state) => state.veg);

  const items = Array.isArray(vegItems) ? vegItems : [];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(vegItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="home-container">
      <h1 className="veg-title">Vegetarian Flavor Feast</h1>

      {/* Loading/Error Messages */}
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="veg-grid">
        {Array.isArray(currentItems) &&
          currentItems.map((item) => {
            // Safe discount calculation
            const discountValue = parseInt(item.discount?.toString().replace("%", "")) || 0;
            const finalPrice = item.price - (item.price * discountValue) / 100;

            return (
              <div className="veg-card" key={item.id}>
                <img src={item.img} alt={item.name} />

                <h3>{item.name}</h3>
                <p className="veg-desc">{item.desc}</p>

                <div className="price-box">
                  <p className="old-price">₹{item.price}</p>
                  <p className="final-price">₹{finalPrice}</p>
                  <span className="discount-tag">{discountValue}% OFF</span>
                </div>

                <button className="add-to-cart" onClick={() => dispatch(addToCart(item))}>
                  Add to Cart
                </button>
              </div>
            );
          })}
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

      <div className="footer-section">
        <h3>About FreshMart</h3>
        <p>Fresh groceries delivered to your home.</p>
        <p className="copyright">© 2025 FreshMart. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Veg;
