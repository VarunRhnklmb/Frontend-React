import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders1 } from "./store";
import "./Orders.css";
import "./App.css";

function Orders() {
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector(
    (state) => state.orders1
  );

  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders1());
  }, [dispatch]);

  const toggleOrder = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  return (
    <div className="orders-page">
      <h1>Orders</h1>

      <div className="orders-container">
        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && orderDetails?.length === 0 && <p>No orders found.</p>}

        {orderDetails?.map((order, index) => (
          <div key={index}>
            <h3 onClick={() => toggleOrder(index)}>
              Order #{index + 1}
            </h3>

            {expandedOrder === index && (
              <div className="order-details">
                {order.items?.map((item, i) => (
                  <div key={i}>
                    <img src={item.img} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>Price: ₹{item.price}</p>
                      <p>Qty: {item.quantity}</p>
                      
                    </div>
                  </div>
                ))}
                
                <p><b>Total Amount:</b> ₹{order.totalAmount}</p>
                <p><b>Date:</b> {new Date(order.Orderdate).toLocaleString()}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="footer-section">
        <h3>About FreshMart</h3>
        <p>Fresh groceries delivered to your home.</p>
        <p className="copyright">© 2025 FreshMart. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Orders;
