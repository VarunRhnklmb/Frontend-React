import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchFruitsVegProducts } from "./store";

function FruitsVeg() {
  const dispatch = useDispatch();

  // Fetch fruits & veg products from backend
  useEffect(() => {
    dispatch(fetchFruitsVegProducts()).then((res) => {
      console.log("FRUITS & VEG BACKEND DATA:", res.payload);
    });
  }, [dispatch]);

  // Redux state
  const { fruitsVegItems, loading, error } = useSelector(
    (state) => state.fruitsveg
  );

  const items = Array.isArray(fruitsVegItems) ? fruitsVegItems : [];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const getCurrentItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  };

  const currentItems = getCurrentItems();

  // Price calculation
  const getFinalPrice = (item) => {
    return Math.round(item.price - (item.price * item.discount) / 100);
  };

  return (
    <div className="home-container">
      <h1 className="veg-title">Fruits & Vegetables</h1>

      {/* Loading / Error */}
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {/* ITEMS */}
      <div className="veg-grid">
        {currentItems.map((item) => {
          const final = getFinalPrice(item);
          return (
            <div className="veg-card" key={item.id}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="veg-desc">{item.desc}</p>
              <div className="price-box">
                <span className="old-price">₹{item.price}</span>
                <span className="final-price">₹{final}</span>
                <span className="discount-tag">{item.discount}% OFF</span>
              </div>
              <button className="add-to-cart" onClick={() => dispatch(addToCart(item))}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="pagination-container">
        <button
          className="page-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅ Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`page-btn ${currentPage === page ? "active-page" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="page-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
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

export default FruitsVeg;
