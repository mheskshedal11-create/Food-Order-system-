import { useState } from "react";
import "./CSS/Navbar.css";
import { GiShoppingCart } from "react-icons/gi";
import { TiThMenuOutline } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [navbar, setNavbar] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((tog) => !tog);
  };

  const navMenu = ["Home", "Menu", "Blog", "Contact"];

  return (
    <div className="nav_container">
      <nav className="navbar">
        <div className="logo">Bhok Lagyo.</div>

        <ul className={toggle ? "nav-menu active" : "nav-menu"}>
          {navMenu.map((menu) => (
            <li
              key={menu}
              className={navbar === menu ? "active" : ""}
              onClick={() => {
                setNavbar(menu);
                setToggle(false);
              }}
            >
              {menu}
            </li>
          ))}
          <li className="mobile-signup">
            <div className="signup_login_mobile">Get Start</div>
          </li>
        </ul>

        <div className="nav-button">
          <div className="signup_login">Get Start</div>
          <div className="nav_cart">
            <GiShoppingCart size={24} />
          </div>
          <div className="menu_tuggle" onClick={handleToggle}>
            {toggle ? <IoClose size={32} /> : <TiThMenuOutline size={28} />}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={toggle ? "overlay active" : "overlay"}
        onClick={handleToggle}
      ></div>
    </div>
  );
};

export default Navbar;
