import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Nonveg from "./Nonveg";
import Veg from "./Veg";
import MilkBread from "./MilkBread";
import FruitsVeg from "./FruitsVeg";
import AboutUs from "./AboutUs";
import Orders from "./Orders";
import Cart from "./Cart"; 
import "./App.css"; // include your CSS for nav styling
import { useSelector } from "react-redux";
import Registration from "./Registration";
import Login from "./Login";

function App() {
  const { user } = useSelector((state) => state.Login); //
  
  // get global cart state
  const cartItems = useSelector((globalState) => globalState.cart);

  // calculate cart count
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  
  return (
    <BrowserRouter>
     <nav className="premium-nav">
  <div className="premium-nav-container">

    {/* LOGO */}
          <div className="premium-logo">
            <img
              src="https://image2url.com/images/1763656184949-b3b1690e-fb25-454c-a6d2-9799061272fb.png"
              alt="logo"
              className="logo-img"
            />
            FreshMart
          </div>
  
    {/* NAV LINKS */}
    <ul className="premium-links">
      <li><Link to="/home">🏠Home</Link></li>
      <li><Link to="/veg">🥦Veg</Link></li>
      <li><Link to="/nonveg">🍗Nonveg</Link></li>
      <li><Link to="/milkbread">🥛Milk & Bread</Link></li>
      <li><Link to="/FruitsVeg">🍏Fru & Veg</Link></li>
      <li><Link to="/aboutus">👨‍💼About Us</Link></li>
      <li><Link to="/register">📝 Register</Link></li>
      <li><Link to="/login">🔐 Login/Logout</Link></li>
      <li><Link to="/orders">📦Orders</Link></li>
      <li><Link to="/cart">🛒Cart {cartCount}</Link></li>
      
    </ul>
     

  </div>
</nav>

      {/* Routes */}
      <Routes>
        {/* ✅ Default route goes to Register for new users */}
        <Route path="/" element={user ? <Home /> : <Registration />} />

        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Nonveg />} />
        <Route path="/milkbread" element={<MilkBread />} />
        <Route path="/FruitsVeg" element={<FruitsVeg />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
