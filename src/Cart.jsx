import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementItem, decrementItem, removeFromCart, placeOrder, clearCart } from "./store";
import "./Cart.css";
import "./App.css";
import CouponApply from "./CouponApply";
import SendOrderEmail from "./SendOrderEmail";
import "./SendOrderEmail.css";

import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function Cart() {
  // CART ITEMS
  let cartItems = useSelector((globalState) => globalState.cart);
  let navigate = useNavigate();
  let { discount, applied, message } = useSelector(
    (globalState) => globalState.coupon
  );

  let dispatch = useDispatch();

  // DISCOUNT BUTTON State
  const [buttonDiscount, setButtonDiscount] = useState(null);

  // EMAIL STATE
  const [customerEmail, setCustomerEmail] = useState("");

  // NEW STATE FOR QR CODE 🔥
  const [showQR, setShowQR] = useState(false);

  // ⭐⭐⭐ ALL CALCULATIONS USING useMemo ⭐⭐⭐
  const allCalculations = useMemo(() => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const is10 = totalAmount >= 250;
    const is15 = totalAmount >= 800;
    const is25 = totalAmount >= 1500;

    const totalDiscountPercent =
      (buttonDiscount ? buttonDiscount : 0) + (applied ? discount : 0);

    const discountValue = (totalAmount * totalDiscountPercent) / 100;

    const priceAfterDiscount = totalAmount - discountValue;

    const gst = priceAfterDiscount * 0.18;

    const netPrice = priceAfterDiscount + gst;

    return {
      totalAmount,
      discountValue,
      priceAfterDiscount,
      gst,
      netPrice,
      is10,
      is15,
      is25,
      totalDiscountPercent,
    };
  }, [cartItems, buttonDiscount, applied, discount]);

  const {
    totalAmount,
    discountValue,
    priceAfterDiscount,
    gst,
    netPrice,
    is10,
    is15,
    is25,
    totalDiscountPercent,
  } = allCalculations;

  // SELECT ORDERS STATE (after totalAmount is available)
  const { loading, error: _error, successMessage: _successMessage } = useSelector(
    (globalState) => globalState.orders
  );

  // APPLY BUTTON DISCOUNT WITH TOAST
  const applyDiscount = (value) => {
    if ((value === 10 && is10) || (value === 15 && is15) || (value === 25 && is25)) {
      setButtonDiscount(value);
      toast.success(`🎉 ${value}% Discount Applied!`);
    } 
  };

  // HANDLE CHECKOUT with SweetAlert2
  const handleCheckout = () => {
    const orderData = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        img: item.img,
      })),
      totalAmount: totalAmount,
      Orderdate: new Date(),
    };

    dispatch(placeOrder(orderData))
      .unwrap()
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: res.message || "Order placed successfully!",
          icon: "success",
          confirmButtonText: "Go to Orders",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          // ✅ Clear the cart after successful order
          dispatch(clearCart());
          navigate("/orders"); // navigate after clicking button
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Order failed, please try again!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  // HANDLE REMOVE WITH TOAST
  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
    toast.success(` ${item.name} removed from cart!`);
  };

  // NEW UPI PAYMENT DATA 🔥
  const upiID = "7993919329@axl";
  const upiName = "FreshMart";

  const upiLink = `upi://pay?pa=${upiID}&pn=${upiName}&am=${totalAmount.toFixed(2)}&cu=INR`;

  return (
    <div className="cart-page">
      <ToastContainer position="top-center" autoClose={2000} theme="dark" closeOnClick={true} />

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          

          {/* CART HEADER */}
          <h3 className="equal-box cart-title-center">🛒 Cart Summary</h3>

          {/* CART ITEMS */}
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-img" />

                <div className="cart-details">
                  <p className="cart-name">{item.name}</p>
                  <p className="cart-desc">{item.desc}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </button>

                <div className="cart-qty-box">
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(decrementItem(item))}
                  >
                    −
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(incrementItem(item))}
                  >
                    +
                  </button>
                </div>

                <div className="cart-price">₹{item.price * item.quantity}</div>
              </li>
            ))}
          </ul>
          
          {/* APPLY DISCOUNT SECTION */}
          <div className="discount-section equal-box">
            <h3>🏷️ Apply Discount</h3>

            <div className="discount-row">
              <div className="discount-btn-group">
                <button
                  className="discount-btn"
                  disabled={!is10}
                  onClick={() => applyDiscount(10)}
                >
                  10%
                </button>

                <button
                  className="discount-btn"
                  disabled={!is15}
                  onClick={() => applyDiscount(15)}
                >
                  15%
                </button>

                <button
                  className="discount-btn"
                  disabled={!is25}
                  onClick={() => applyDiscount(25)}
                >
                  25%
                </button>
              </div>

              <div className="coupon-box">
                <CouponApply />
              </div>

              <div className="inline-savings">
                <span className="saving-label">Savings</span>
                <span className="saving-amount">₹{discountValue.toFixed(0)}</span>
              </div>
            </div>

            {buttonDiscount && (
              <p className="discount-info">🎉 {buttonDiscount}% Discount Applied!</p>
            )}

            {message && (
              <p className="coupon-message">
                {applied ? "🎉 " : "❌ "}
                {message}
              </p>
            )}

            {!is15 && (
              <p className="unlock-msg">
                💡 Add ₹{(800 - totalAmount).toFixed(2)} more to unlock 15%
              </p>
            )}

            {!is25 && (
              <p className="unlock-msg">
                🔒 Add ₹{(1500 - totalAmount).toFixed(2)} more to unlock 25%
              </p>
            )}
          </div>
          {/* BILL SUMMARY */}
          <div className="discount-section equal-box">
            <h3>🧾 BILL SUMMARY</h3>

            <div className="cart-summary">
              <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

              {buttonDiscount > 0 && (
                <p>
                  Product Discount ({buttonDiscount}%): -₹
                  {(totalAmount * (buttonDiscount / 100)).toFixed(2)}
                </p>
              )}

              {applied && (
                <p>
                  Coupon ({discount}%): -₹
                  {(totalAmount * (discount / 100)).toFixed(2)}
                </p>
              )}

              {totalDiscountPercent > 0 && (
                <p className="after-discount">
                  Price After Discount: ₹{priceAfterDiscount.toFixed(2)}
                </p>
              )}

              <p>GST (18%): ₹{gst.toFixed(2)}</p>

              <h3>Net Amount to Pay: ₹{netPrice.toFixed(2)}</h3>
            </div>
          </div>

          {/* 🔥 PAYMENT SECTION 🔥 */}
          <div className="discount-section equal-box">
            <h3>💳PAYMENT</h3>

            <button className="pay-btn" onClick={() => setShowQR(true)}>
              Scanner (Pay Now)
            </button>

            {showQR && (
              <div className="payment-box">
                <div className="qr-container">
                  <h2>Scan to Pay</h2>
                  <h2 className="qr-amount">Total Amount: ₹{netPrice.toFixed(2)}</h2>

                  <QRCodeCanvas value={upiLink} size={250} />

                  <div className="upi-container">
                    <div className="upi-header">
                      <img
                        src="https://tse3.mm.bing.net/th/id/OIP.OxvYhm9rOQ5YaPNrn4vhEgHaDt?pid=Api&P=0&h=180"
                        alt="UPI"
                        className="upi-logo"
                      />
                      <h2>Pay by UPI</h2>
                    </div>

                    <div className="upi-options">
                      <button className="upi-button">
                        <img
                          src="https://tse4.mm.bing.net/th/id/OIP.LbzCKPVMr6enNogcAYO60gHaE8?pid=Api&P=0&h=180"
                          alt="GPay"
                        />
                        GPay
                      </button>
                      <button className="upi-button">
                        <img
                          src="https://tse4.mm.bing.net/th/id/OIP.F_ErCaunr4VRuMuUy39HtAHaGT?pid=Api&P=0&h=180"
                          alt="PhonePe"
                        />
                        PhonePe
                      </button>
                    </div>

                    <button className="add-upi">+ Add New UPI ID</button>
                  </div>

                  <button className="close-btn" onClick={() => setShowQR(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* EMAIL SECTION */}
          <div className="email-section">
            <h4>Enter your email to receive the order details:</h4>

            <input
              type="email"
              placeholder="Enter your email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />

            <SendOrderEmail
              cartItems={cartItems}
              NetAmount={netPrice}
              TotalAmount={totalAmount}
              Savings={discountValue}
              Coupon={discount}
              GST={gst}
              customerEmail={customerEmail}
            />
          </div>

          <div className="button-container">
            <button className="premium-btn" onClick={handleCheckout} disabled={loading}>
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>

          {/* FOOTER */}
          <div className="footer-section">
            <h3>About FreshMart</h3>
            <p>Fresh groceries delivered to your home.</p>

            <p className="copyright">© 2025 FreshMart. All rights reserved.</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
