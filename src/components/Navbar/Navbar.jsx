import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import mitraaLogo from "../../assets/logo/fulllogo.svg";

import globe   from "../../assets/images/globe.svg";
import contact from "../../assets/images/contact.svg";
import search  from "../../assets/images/search.svg";

import Signinmodel from "../Signinmodel/Signinmodel";
import MegaMenu    from "../Megamenu/MegaMenu";

/*
  Navbar tint colors per landing slide index.
  Each is a light, semi-transparent version of that slide's background.
*/
const SLIDE_NAVBAR_COLORS = [
  "rgba(81, 51, 204, 0.18)",   // Landing1 — deep purple tint
  "rgba(220, 220, 240, 0.82)", // Landing2 — light lavender tint
  "rgba(242, 213, 181, 0.82)", // Landing3 — warm peach tint
];

function Navbar({ hidden, slideIndex }) {

  const [showModal,    setShowModal]    = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const location    = useLocation();
  const isLandingPage = location.pathname === "/";

  // Derive navbar background: on landing page use slide tint, elsewhere default
  const navbarBg = isLandingPage && slideIndex !== undefined
    ? SLIDE_NAVBAR_COLORS[slideIndex] ?? SLIDE_NAVBAR_COLORS[0]
    : undefined; // undefined → CSS default kicks in

  useEffect(() => { setMenuOpen(false);     }, [location]);
  useEffect(() => { setShowMegaMenu(false); }, [location]);

  return (
    <>
      <header
        className={`navbar ${hidden ? "navbar-hidden" : ""}`}
        style={navbarBg ? { background: navbarBg } : undefined}
      >
        <div className="navbar-container">

          {/* Logo */}
          <div className="navbar-left">
            <img src={mitraaLogo} alt="MiTRAA Logo" className="logo-full" />
          </div>

          {/* Nav Links */}
          {!isLandingPage && (
            <nav className={`nav-links ${menuOpen ? "active" : ""}`}>

              <div
                className="nav-item"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <NavLink to="/home">What We Do</NavLink>
                {showMegaMenu && (
                  <MegaMenu closeMenu={() => setShowMegaMenu(false)} />
                )}
              </div>

              <NavLink to="/aboutus">Who We Are</NavLink>
              <NavLink to="/careers">Careers</NavLink>
              <NavLink to="/news">News &amp; Events</NavLink>
              <NavLink to="/resourceaugmentation">Resource Augmentation</NavLink>
              <NavLink to="/casestudy">Case Study</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>

              <div
                className="mobile-sign-btn"
                onClick={() => { setShowModal(true); setMenuOpen(false); }}
              >
                <img src={contact} alt="signin" />
                <span>Sign in</span>
              </div>

            </nav>
          )}

          {/* Desktop Right Section */}
          <div className="nav-right">
            <div className="icon-circle">
              <img src={search}  alt="search" />
            </div>
            <div className="icon-circle">
              <img src={globe}   alt="globe"  />
            </div>
            <div className="sign-btn" onClick={() => setShowModal(true)}>
              <img src={contact} alt="signin" />
              <span>Sign in</span>
            </div>
          </div>

          {/* Hamburger */}
          {!isLandingPage && (
            <div
              className={`menu-toggle ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

        </div>
      </header>

      {showModal && <Signinmodel onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Navbar;
