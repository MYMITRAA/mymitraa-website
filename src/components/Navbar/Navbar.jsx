import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import logologo from "../../assets/images/logologo.svg";
import mitra from "../../assets/images/mitraa.svg";
import globe from "../../assets/images/globe.svg";
import contact from "../../assets/images/contact.svg";
import search from "../../assets/images/search.svg";

import Signinmodel from "../Signinmodel/Signinmodel";

import MegaMenu  from "../Megamenu/Megamenu"; 

function Navbar() {

  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const location = useLocation();

  // Detect landing page
  const isLandingPage = location.pathname === "/";

  /* Close mobile menu automatically on page change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  /* Close MegaMenu when route changes */
  useEffect(() => {
    setShowMegaMenu(false);
  }, [location]);

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">

          {/* Logo */}
          <div className="navbar-left">
            <img src={logologo} alt="Logo Icon" className="logo-icon" />
            <img src={mitra} alt="Mitraa Text" className="logo-text" />
          </div>

          {/* Nav Links (HIDDEN on Landing Page) */}
          {!isLandingPage && (
            <nav className={`nav-links ${menuOpen ? "active" : ""}`}>

              {/* WHAT WE DO WITH MEGA MENU */}
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
              <NavLink to="/news">News & Events</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>

              {/* Mobile Sign In Button */}
              <div
                className="mobile-sign-btn"
                onClick={() => {
                  setShowModal(true);
                  setMenuOpen(false);
                }}
              >
                <img src={contact} alt="signin" />
                <span>Sign in</span>
              </div>

            </nav>
          )}

          {/* Desktop Right Section */}
          <div className="nav-right">

            <div className="icon-circle">
              <img src={search} alt="search" />
            </div>

            <div className="icon-circle">
              <img src={globe} alt="globe" />
            </div>

            <div
              className="sign-btn"
              onClick={() => setShowModal(true)}
            >
              <img src={contact} alt="signin" />
              <span>Sign in</span>
            </div>

          </div>

          {/* Hamburger (HIDDEN on landing page) */}
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

      {showModal && (
        <Signinmodel onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default Navbar;