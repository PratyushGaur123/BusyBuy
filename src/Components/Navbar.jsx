import { Outlet, Link, useNavigate } from "react-router-dom";
import Home from "../static/Home.png";
import SignIn from "../static/SignIn.png";
import LogOut from "../static/Log-out.png";
import Cart from "../static/Cart.png";
import Orders from "../static/Orders.png"
import "../static/Navbar.css";
import { useUserContext } from "../CustomUserContext";
import { useEffect } from "react";

function Navbar() {

  const { user, handleSignOut } = useUserContext();
  const navigation = useNavigate();

  

  return (
    <>
      <nav>
        <div className="nav-container">
          <Link to="/" className="navbar-logo">
            Busy Buy
          </Link>

          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <span> <img src={Home} alt="home" className="nav-img" /> </span>
                <span className="nav-name">Home</span>
              </Link>
            </li>
            {!user ? (<li className="nav-item">
              <Link to="signin" className="nav-link">
                <span> <img src={SignIn} alt="sign-in" className="nav-img" /> </span>
                <span className="nav-name">Sign-In</span>
              </Link>
            </li>) : (
              <>
                <li className="nav-item">
                  <Link to={`userOrders/${user.uid}/orders`} className="nav-link">
                    <span> <img src={Orders} alt="sign-in" className="nav-img" /> </span>
                    <span className="nav-name">My Orders</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`userCarts/${user.uid}/myCart`} className="nav-link">
                    <span> <img src={Cart} alt="sign-in" className="nav-img" /> </span>
                    <span className="nav-name">Cart</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <div onClick={handleSignOut} className="nav-link">
                    <span> <img src={LogOut} alt="sign-in" className="nav-img" /> </span>
                    <span className="nav-name">Log-Out</span>
                  </div>
                </li>

              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar;