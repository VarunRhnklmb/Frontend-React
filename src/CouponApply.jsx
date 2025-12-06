import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupon } from "./store"; // adjust import based on your reducer
import "./CouponApply.css";

function CouponApply() {
  const [input, setInput] = useState(""); // corrected useState
  const dispatch = useDispatch(); // corrected useDispatch

  const handleApply = () => {
    dispatch(applyCoupon(input)); // corrected dispatch call
  };

  return (

    
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <input
        type="text"
        placeholder="Enter Coupon"
        value={input} // corrected value binding
        onChange={(e) => setInput(e.target.value)} // corrected onChange
      />
     <button className="apply-btn" onClick={handleApply}>
  ApplyCoupon  </button>
    </div>
  );
}

export default CouponApply;
