import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Header() {

  const { user } = useAuth();

  return (
    <>
      <header className="ltn__header-area ltn__header-3 section-bg-6">
        {/* ltn__header-middle-area start */}
        <div className="ltn__header-middle-area">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="site-logo">
                  <Link to="/">
                    <img src="img/logo.png" alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col header-contact-serarch-column d-none d-xl-block">
                <div className="header-contact-search">
                  {/* header-search-2 */}
                  <div className="header-search-2">
                    <form id="#123" method="get" action="#">
                      <input
                        type="text"
                        name="search"
                        defaultValue=""
                        placeholder="Search here..."
                      />
                      <button type="submit">
                        <span>
                          <i className="icon-magnifier" />
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col">
                {/* header-options */}
                <div className="ltn__header-options">
                  <ul>
                    <li className="d-none">
                      {/* ltn__currency-menu */}
                      <div className="ltn__drop-menu ltn__currency-menu">
                        <ul>
                          <li>
                            <a href="#" className="dropdown-toggle">
                              <span className="active-currency">USD</span>
                            </a>
                            <ul>
                              <li>
                                <Link to="/login">USD - US Dollar</Link>
                              </li>
                              <li>
                                <Link to="/wishlist">CAD - Canada Dollar</Link>
                              </li>
                              <li>
                                <Link to="/register">EUR - Euro</Link>
                              </li>
                              <li>
                                <Link to="/account">GBP - British Pound</Link>
                              </li>
                              <li>
                                <Link to="/wishlist">INR - Indian Rupee</Link>
                              </li>
                              <li>
                                <Link to="/wishlist">BDT - Bangladesh Taka</Link>
                              </li>
                              <li>
                                <Link to="/wishlist">JPY - Japan Yen</Link>
                              </li>
                              <li>
                                <Link to="/wishlist">AUD - Australian Dollar</Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="d-none">
                      {/* header-search-1 */}
                      <div className="header-search-wrap">
                        <div className="header-search-1">
                          <div className="search-icon">
                            <i className="icon-magnifier for-search-show" />
                            <i className="icon-magnifier-remove for-search-close" />
                          </div>
                        </div>
                        <div className="header-search-1-form">
                          <form id="#" method="get" action="#">
                            <input
                              type="text"
                              name="search"
                              defaultValue=""
                              placeholder="Search here..."
                            />
                            <button type="submit">
                              <span>
                                <i className="icon-magnifier" />
                              </span>
                            </button>
                          </form>
                        </div>
                      </div>
                    </li>
                    <li className="d-none">
                      {/* user-menu */}
                      <div className="ltn__drop-menu user-menu">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="icon-user" />
                            </a>
                            <ul>
                              <li>
                                <Link to="/login">Sign in</Link>
                              </li>
                              <li>
                                <Link to="/register">Register</Link>
                              </li>
                              <li>
                                <Link to="/account">My Account</Link>
                              </li>
                              <li>
                                <Link to="/wishlist">Wishlist</Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "30px",
                        }}
                      >
                        {/* Cart */}
                        <Link
                          to="/Cart"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            color: "#000",
                            fontSize: "24px",
                          }}
                        >
                          <i className="icon-handbag"></i>
                        </Link>

                        {/* Account */}
                        {user ? (
                            <Link
                                to="/account"
                                style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textDecoration: "none",
                                color: "#000",
                                fontSize: "24px",
                                }}
                            >
                                <i className="fas fa-user-circle"></i>
                            </Link>
                            ) : (
                          <Link
                            to="/Login"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textDecoration: "none",
                              color: "#000",
                              fontSize: "24px",
                            }}
                          >
                            <i className="fas fa-user-circle"></i>
                          </Link>
                        )}

                        {/* Wishlist */}
                        <Link
                          to="/Wishlist"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            color: "#000",
                            fontSize: "24px",
                          }}
                        >
                          <i className="far fa-heart"></i>
                        </Link>
                      </div>
                    </li>
                    {/* Mobile Menu Button */}
                    <div className="mobile-menu-toggle d-lg-none">
                      <a
                        href="#ltn__utilize-mobile-menu"
                        className="ltn__utilize-toggle"
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
                            transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                          />
                        </svg>
                      </a>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ltn__header-middle-area end */}
        {/* header-bottom-area start */}
        <div className="header-bottom-area ltn__border-top ltn__header-sticky ltn__sticky-bg-white ltn__primary-bg---- menu-color-white---- d-none d-lg-block">
          <div className="container">
            <div className="row">
              <div className="col header-menu-column justify-content-center">
                <div className="sticky-logo">
                  <div className="site-logo">
                    <Link to="/">
                      <img src="img/logo.png" alt="Logo" />
                    </Link>
                  </div>
                </div>
                <div className="header-menu header-menu-2">
                  <nav>
                    <div className="ltn__main-menu">
                      <ul>
                        <li className="menu-icon">
                          <Link to="/">Home</Link>
                        </li>

                        <li className="menu-icon">
                          <Link to="/Shop">Shop All</Link>
                        </li>

                        <li>
                          <Link to="/About">About US</Link>
                        </li>

                        <li>
                          <Link to="/Contact">Contact US</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header-bottom-area end */}
      </header>
      {/* HEADER AREA END */}
    </>
  );
}

export default Header;