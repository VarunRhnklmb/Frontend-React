import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchMilkBreadProducts } from "./store";

function MilkBread() {
  const dispatch = useDispatch();

  // COMMENTED OUT STATIC DATA
  // const milkBreadItems = [ ... your 20 items ... ];

  // Fetch milk & bread products from backend
  useEffect(() => {
    dispatch(fetchMilkBreadProducts()).then((res) => {
      console.log("MILK & BREAD BACKEND DATA:", res.payload);
    });
  }, [dispatch]);

  // Redux state
  const { milkBreadItems, loading, error } = useSelector(
    (state) => state.milkbread
  );

  const items = Array.isArray(milkBreadItems) ? milkBreadItems : [];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  // PRICE CALCULATION
  const calcPrice = (item) => {
    const finalPrice = Math.round(item.price - (item.price * item.discount) / 100);
    return finalPrice;
  };

  return (
    <div className="home-container">
      <h1 className="veg-title">Fresh & Pure Milk & Bread</h1>

      {/* Loading/Error */}
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {/* ITEMS */}
      <div className="veg-grid">
        {currentItems.map((item) => (
          <div className="veg-card" key={item.id}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="veg-desc">{item.desc}</p>

            <div className="price-box">
              <span className="old-price">₹{item.price}</span>
              <span className="final-price">₹{calcPrice(item)}</span>
              <span className="discount-tag">{item.discount}% OFF</span>
            </div>

            <button className="add-to-cart" onClick={() => dispatch(addToCart(item))}>
              Add to Cart
            </button>
          </div>
        ))}
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

        {Array.from({ length: totalPages }, (_, i) => (
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

export default MilkBread;
