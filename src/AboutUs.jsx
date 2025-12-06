import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <div className="about-hero">
        <h1 className="about-hero-title">About FreshMart</h1>
        <p className="about-hero-subtitle">
          Fresh • Trusted • Delivered with Care
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="about-section">
        <div className="about-text-box">
          <h2>Who We Are</h2>
          <p>
            Welcome to <strong>FreshMart</strong> — your trusted partner for
            fresh groceries delivered straight to your home. We believe in
            quality, freshness, and complete customer satisfaction.
          </p>

          <p>
            From farm-fresh vegetables to dairy essentials, grains, bakery
            items, and more, we ensure every product is carefully sourced
            from verified suppliers.
          </p>

          <p>
            Our mission is to make your everyday shopping simple, safe, and
            convenient — with premium quality guaranteed.
          </p>
        </div>

        <img
          className="about-main-img"
          src="https://freshmart.one/wp-content/uploads/2024/02/Freshmart-Posters-02.jpg"
          alt="About FreshMart"
        />
      </div>

      {/* SMALL FEATURE CARDS */}
      <div className="about-features">
        <div className="feature-card">
          <h3>Fresh Quality</h3>
          <p>Handpicked, farm-fresh products every day.</p>
        </div>
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Quick, safe, and doorstep convenience.</p>
        </div>
        <div className="feature-card">
          <h3>Trusted Service</h3>
          <p>Your satisfaction is our top priority.</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer-section">
        <h3>About FreshMart</h3>
        <p>Fresh groceries delivered to your home.</p>

        <p className="copyright">
          © 2025 FreshMart. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
