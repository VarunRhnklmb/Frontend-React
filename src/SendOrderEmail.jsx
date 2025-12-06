import emailjs from "emailjs-com";
import "./Cart.css";
import "./Veg.css";
import "./Nonveg";
import "./FruitsVeg";
import "./MilkBread";
import "./SendOrderEmail.css"

function SendOrderEmail({ cartItems, NetAmount, Savings,Coupon, GST, TotalAmount, customerEmail }) {

  const sendEmail = () => {

    // CHECK EMAIL EMPTY
    if (!customerEmail || customerEmail.trim() === "") {
      alert("❗ Please enter your email before sending the order.");
      return;
    }

    // POPUP BEFORE SENDING MAIL
    const userConfirm = window.confirm(
      "Do you want to send the order details to your email?"
    );

    if (!userConfirm) {
      return;
    }

    // SEND EMAIL ONLY IF USER CLICKED OK
    let templateParams = {
      orders: cartItems.map(item => ({
        name: item.name,
        units: item.quantity,
        price: item.price,
        image_url: item.img     // ⭐ PRODUCT IMAGE INCLUDED
      })),

      order_id: Date.now(),
      NetAmount: Number(NetAmount).toFixed(2),
      TotalAmount: Number(TotalAmount).toFixed(2),
      Savings: Savings, 
      Coupon:Coupon,
      GST: Number(GST).toFixed(2), 
      email: customerEmail
    };

    emailjs.send(
      "service_hjlx0id",
      "template_yp81k2l",
      templateParams,
      "sC_aNaqlMnx4TME2u"
    )
    .then(() => {
      alert("📧 Email sent successfully!");
    })
    .catch(() => {
      alert("❌ Failed to send email.");
    });
  };

  return (
  <div className="email-btn-container">
    <button onClick={sendEmail}>Send Order Email</button>
  </div>

  );
}

export default SendOrderEmail;
