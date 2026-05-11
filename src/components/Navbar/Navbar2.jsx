import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import mitraaLogo from "../../assets/logo/fulllogo.svg";
import globe      from "../../assets/images/globe.svg";
import contact    from "../../assets/images/contact.svg";
import search     from "../../assets/images/search.svg";

import Signinmodel from "../Signinmodel/Signinmodel";
import MegaMenu    from "../Megamenu/MegaMenu";

const SLIDE_NAVBAR_COLORS = [
  "rgba(81, 51, 204, 0.18)",
  "rgba(220, 220, 240, 0.82)",
  "rgba(242, 213, 181, 0.82)",
];

function Navbar({ hidden, slideIndex }) {

  const [showModal,          setShowModal]          = useState(false);
  const [menuOpen,           setMenuOpen]           = useState(false);
  const [showMegaMenu,       setShowMegaMenu]       = useState(false);
  const [authUser,           setAuthUser]           = useState(null);
  const [showLogoutConfirm,  setShowLogoutConfirm]  = useState(false); // ✅ NEW

  const location      = useLocation();
  const navigate      = useNavigate();
  const isLandingPage = location.pathname === "/";

  const navbarBg = isLandingPage && slideIndex !== undefined
    ? SLIDE_NAVBAR_COLORS[slideIndex] ?? SLIDE_NAVBAR_COLORS[0]
    : undefined;

  const syncAuth = () => {
    const token = localStorage.getItem("token");
    const name  = localStorage.getItem("userName");
    setAuthUser(token ? { token, name: name || "User" } : null);
  };

  useEffect(() => {
  syncAuth();
  window.addEventListener("userLoggedIn", syncAuth);
  return () => window.removeEventListener("userLoggedIn", syncAuth);
}, []);

  const handleModalClose = () => {
    setShowModal(false);
    syncAuth();
  };

  // ✅ Now only called after confirmation
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    setAuthUser(null);
    setShowLogoutConfirm(false);
    navigate("/");
  };

  useEffect(() => { setMenuOpen(false);     }, [location]);
  useEffect(() => { setShowMegaMenu(false); }, [location]);

  return (
    <>
      <header
        className={`navbar ${hidden ? "navbar-hidden" : ""}`}
        style={navbarBg ? { background: navbarBg } : undefined}
      >
        <div className="navbar-container">

         <div className="navbar-left" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
  <img src={mitraaLogo} alt="MiTRAA Logo" className="logo-full" />
</div>

          {/* Nav Links — desktop & mobile */}
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

              <NavLink to="/aboutus">Who Are we</NavLink>
              <NavLink to="/careers">Careers</NavLink>
              <NavLink to="/news">News &amp; Events</NavLink>
              <NavLink to="/resourceaugmentation">Resource Augmentation</NavLink>
              <NavLink to="/casestudy">Case Study</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>

              {/* Mobile-only auth */}
              <div className="mobile-auth">
                {authUser ? (
                  <div className="mobile-user-section">
                    <span className="user-greeting">👋 {authUser.name}</span>
                    <button
                      className="logout-btn"
                      onClick={() => { setShowLogoutConfirm(true); setMenuOpen(false); }} // ✅
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div
                    className="mobile-sign-btn"
                    onClick={() => { setShowModal(true); setMenuOpen(false); }}
                  >
                    <img src={contact} alt="signin" />
                    <span>Sign in</span>
                  </div>
                )}
              </div>

            </nav>
          )}

          {/* Desktop-only right section */}
          <div className="nav-right">
            <div className="icon-circle">
              <img src={search} alt="search" />
            </div>
            <div className="icon-circle">
              <img src={globe} alt="globe" />
            </div>

            {authUser ? (
              <div className="user-section">
                <span className="user-greeting">👋 {authUser.name}</span>
                <button
                  className="logout-btn"
                  onClick={() => setShowLogoutConfirm(true)} // ✅
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="sign-btn" onClick={() => setShowModal(true)}>
                <img src={contact} alt="signin" />
                <span>Sign in</span>
              </div>
            )}
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

      {/* ✅ Logout confirmation modal */}
      {showLogoutConfirm && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff", borderRadius: "12px",
              padding: "2rem 1.75rem", width: "320px",
              textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
              Sign out?
            </p>
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "1.5rem" }}>
              You'll be returned to the home page.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1, padding: "9px", borderRadius: "8px",
                  border: "1px solid #ddd", background: "transparent",
                  fontSize: "14px", cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                style={{
                  flex: 1, padding: "9px", borderRadius: "8px",
                  border: "none", background: "#fee2e2",
                  color: "#b91c1c", fontWeight: 600,
                  fontSize: "14px", cursor: "pointer",
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && <Signinmodel onClose={handleModalClose} />}
    </>
  );
}

export default Navbar;