import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

function Header() {
  const { user } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#ltn__utilize-mobile-menu") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>
        {`
          .custom-header-middle {
            padding: 18px 0;
          }

          .custom-header-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          .custom-header-logo {
            display: flex;
            align-items: center;
          }

          .custom-header-logo img {
            display: block;
            width: auto;
            max-width: 230px;
            height: auto;
          }

          .custom-header-actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 30px;
          }

          .custom-header-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            text-decoration: none;
            font-size: 24px;
            line-height: 1;
          }

          .custom-header-icon:hover {
            color: #e91e63;
          }

          /* MOBILE MENU BUTTON */

          .custom-mobile-menu-toggle {
            display: none;
            align-items: center;
            justify-content: center;
          }

          .custom-mobile-menu-button {
            width: 42px;
            height: 42px;
            position: relative;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 0;
            margin: 0;

            border: none;
            background: transparent;

            cursor: pointer;
          }

          .custom-mobile-menu-button svg {
            width: 50px;
            height: 60px;
            cursor: pointer;
          }

          .custom-mobile-menu-button svg path {
            transition:
              stroke-dashoffset 0.5s cubic-bezier(0.25, -0.25, 0.75, 1.25),
              stroke-dasharray 0.5s cubic-bezier(0.25, -0.25, 0.75, 1.25);

            fill: none;
            stroke: #333;
            stroke-dashoffset: 0;
            stroke-linecap: round;
            stroke-width: 30px;
          }

          .custom-mobile-menu-button svg path#top,
          .custom-mobile-menu-button svg path#bottom {
            stroke-dasharray: 240px 950px;
          }

          .custom-mobile-menu-button svg path#middle {
            stroke-dasharray: 240px 240px;
          }

          .custom-mobile-menu-button.close svg path#top,
          .custom-mobile-menu-button.close svg path#bottom {
            stroke-dasharray: -650px;
            stroke-dashoffset: -650px;
          }

          .custom-mobile-menu-button.close svg path#middle {
            stroke-dasharray: 1px 220px;
            stroke-dashoffset: -115px;
          }

          /* MOBILE MENU LINKS */

          .custom-utilize-menu-link {
            display: block;
            padding: 12px 24px 12px 0;
            text-transform: uppercase;
            color: #333;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
          }

          .custom-utilize-menu-link:hover {
            color: #e91e63;
          }

          /* TABLET AND MOBILE */

          @media (max-width: 991.98px) {
            .custom-header-middle {
              padding: 16px 0;
            }

            .custom-header-actions {
              gap: 20px;
            }

            .custom-header-logo img {
              max-width: 140px;
            }

            .custom-mobile-menu-toggle {
              display: flex;
            }
          }

          /* MOBILE */

          @media (max-width: 575.98px) {
            .custom-header-middle {
              padding: 13px 0;
            }

            .custom-header-row {
              flex-wrap: nowrap;
            }

            .custom-header-logo {
              flex-shrink: 0;
            }

            .custom-header-logo img {
              max-width: 100px;
            }

            .custom-header-actions {
              gap: 15px;
              flex-shrink: 0;
            }

            .custom-header-icon {
              font-size: 20px;
            }

            .custom-mobile-menu-button {
              width: 34px;
              height: 34px;
            }

            .custom-mobile-menu-button svg {
              width: 44px;
              height: 52px;
            }
          }

          /* SMALL MOBILE */

          @media (max-width: 375px) {
            .custom-header-logo img {
              max-width: 90px;
            }

            .custom-header-actions {
              gap: 11px;
            }

            .custom-header-icon {
              font-size: 19px;
            }

            .custom-mobile-menu-button {
              width: 32px;
              height: 32px;
            }

            .custom-mobile-menu-button svg {
              width: 40px;
              height: 48px;
            }
          }
        `}
      </style>

      <header className="ltn__header-area ltn__header-3 section-bg-6">
        {/* HEADER MIDDLE */}

        <div className="ltn__header-middle-area custom-header-middle">
          <div className="container">
            <div className="custom-header-row">
              {/* LOGO */}

              <div className="site-logo custom-header-logo">
                <Link to="/" onClick={closeMobileMenu}>
                  <img src="/img/logo.png" alt="" />
                </Link>
              </div>

              {/* HEADER ACTIONS */}

              <div className="custom-header-actions">
                {/* CART */}

                <Link
                  to="/Cart"
                  className="custom-header-icon"
                  aria-label="Cart"
                  onClick={closeMobileMenu}
                >
                  <i className="icon-handbag"></i>
                </Link>

                {/* ACCOUNT */}

                <Link
                  to={user ? "/account" : "/Login"}
                  className="custom-header-icon"
                  aria-label="Account"
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-user-circle"></i>
                </Link>

                {/* WISHLIST */}

                <Link
                  to="/Wishlist"
                  className="custom-header-icon"
                  aria-label="Wishlist"
                  onClick={closeMobileMenu}
                >
                  <i className="far fa-heart"></i>
                </Link>

                {/* MOBILE MENU BUTTON */}

                <div className="custom-mobile-menu-toggle">
                  <button
                    type="button"
                    className={`custom-mobile-menu-button ${
                      mobileMenuOpen ? "close" : ""
                    }`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                    aria-expanded={mobileMenuOpen}
                  >
                    <svg viewBox="0 0 800 600">
                      <path
                        d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                        id="top"
                      />

                      <path d="M300,320 L540,320" id="middle" />

                      <path
                        d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                        id="bottom"
                        transform="translate(480, 320) scale(1, -1) translate(-480, -318)"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}

        <div className="header-bottom-area ltn__border-top ltn__header-sticky ltn__sticky-bg-white d-none d-lg-block">
          <div className="container">
            <div className="row">
              <div className="col header-menu-column justify-content-center">
                <div className="sticky-logo">
                  <div className="site-logo">
                    <Link to="/">
                      <img src="/img/logo.png" alt="Fiama" />
                    </Link>
                  </div>
                </div>

                <div className="header-menu header-menu-2">
                  <nav>
                    <div className="ltn__main-menu">
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>

                        <li>
                          <Link to="/Shop">Shop All</Link>
                        </li>

                        <li>
                          <Link to="/About">About Us</Link>
                        </li>

                        <li>
                          <Link to="/Contact">Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FIAMA MOBILE SLIDE MENU */}

      <div
        id="ltn__utilize-mobile-menu"
        className={`ltn__utilize ltn__utilize-mobile-menu ${
          mobileMenuOpen ? "ltn__utilize-open" : ""
        }`}
      >
        <div className="ltn__utilize-menu-inner">
          {/* MOBILE MENU HEAD */}

          <div className="ltn__utilize-menu-head">
            <div className="site-logo">
              <Link to="/" onClick={closeMobileMenu}>
                <img src="/img/logo.png" alt="Fiama" />
              </Link>
            </div>

            <button
              type="button"
              className="ltn__utilize-close"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              ×
            </button>
          </div>

          {/* MOBILE MENU LINKS */}

          <div className="ltn__utilize-menu">
            <ul>
              <li>
                <Link
                  to="/"
                  className="custom-utilize-menu-link"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/Shop"
                  className="custom-utilize-menu-link"
                  onClick={closeMobileMenu}
                >
                  Shop All
                </Link>
              </li>

              <li>
                <Link
                  to="/About"
                  className="custom-utilize-menu-link"
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/Contact"
                  className="custom-utilize-menu-link"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}

      {mobileMenuOpen && (
        <div
          className="ltn__utilize-overlay"
          onClick={closeMobileMenu}
          style={{
            display: "block",
          }}
        ></div>
      )}
    </>
  );
}

export default Header;