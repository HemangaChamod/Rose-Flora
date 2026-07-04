import React from "react";

function Footer() {
  return (
   <>
  {/* FOOTER AREA START */}
  <footer className="ltn__footer-area ">
    <div className="footer-top-area  section-bg-5">
      <div className="container">
        <div className="row">
          <div className="col-xl-2 col-md-6 col-sm-6 col-12">
            <div className="footer-widget footer-menu-widget clearfix">
              <h4 className="footer-title">My Accoout</h4>
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="/Account">My account</a>
                  </li>
                  <li>
                    <a href="checkout.html">Checkout</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact us</a>
                  </li>
                  <li>
                    <a href="cart.html">Shopping Cart</a>
                  </li>
                  <li>
                    <a href="wishlist.html">Wishlist</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-sm-6 col-12">
            <div className="footer-widget footer-menu-widget clearfix">
              <h4 className="footer-title">Quick Links</h4>
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="locations.html">Store Location</a>
                  </li>
                  <li>
                    <a href="order-tracking.html">Orders Tracking</a>
                  </li>
                  <li>
                    <a href="product-details.html">Size Guide</a>
                  </li>
                  <li>
                    <a href="account.html">My account</a>
                  </li>
                  <li>
                    <a href="faq.html">FAQs</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-sm-6 col-12">
            <div className="footer-widget footer-menu-widget clearfix">
              <h4 className="footer-title">Information</h4>
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="contact.html">Privacy Page</a>
                  </li>
                  <li>
                    <a href="about.html">About us</a>
                  </li>
                  <li>
                    <a href="contact.html">Careers</a>
                  </li>
                  <li>
                    <a href="faq.html">Delivery Inforamtion</a>
                  </li>
                  <li>
                    <a href="contact.html">Term &amp; Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-sm-6 col-12">
            <div className="footer-widget footer-menu-widget clearfix">
              <h4 className="footer-title">Customer Service</h4>
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="product-details.html">Shipping Policy</a>
                  </li>
                  <li>
                    <a href="contact.html">Help &amp; Contact Us</a>
                  </li>
                  <li>
                    <a href="account.html">Returns &amp; Refunds</a>
                  </li>
                  <li>
                    <a href="shop.html">Online Stores</a>
                  </li>
                  <li>
                    <a href="contact.html">Terms and Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 col-sm-6 col-12">
            <div className="footer-widget footer-about-widget">
              <h4 className="footer-title">About Our Shop</h4>
              <div className="footer-logo d-none">
                <div className="site-logo">
                  <img src="img/logo.png" alt="Logo" />
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmo incididunt ut labore et dolore
              </p>
              <div className="footer-address">
                <ul>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-location-pin" />
                    </div>
                    <div className="footer-address-info">
                      <p>Brooklyn, New York, United States</p>
                    </div>
                  </li>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-phone" />
                    </div>
                    <div className="footer-address-info">
                      <p>
                        <a href="tel:+0123-456789">+0123-456789</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-envelope" />
                    </div>
                    <div className="footer-address-info">
                      <p>
                        <a href="mailto:example@example.com">
                          example@example.com
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="ltn__social-media mt-20 d-none">
                <ul>
                  <li>
                    <a href="#" title="Facebook">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Twitter">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Linkedin">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Youtube">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-payment-img">
                <img src="img/icons/payment-6.png" alt="Payment Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="ltn__copyright-area ltn__copyright-2 section-bg-5">
      <div className="container ltn__border-top-2">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="footer-copyright-left">
              <div className="ltn__copyright-design clearfix">
                <p>
                  © <span className="current-year" /> - Just For You
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 align-self-center">
            <div className="footer-copyright-right text-end">
              <div className="ltn__copyright-menu d-none">
                <ul>
                  <li>
                    <a href="#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Claim</a>
                  </li>
                  <li>
                    <a href="#">Privacy &amp; Policy</a>
                  </li>
                </ul>
              </div>
              <div className="ltn__social-media ">
                <ul>
                  <li>
                    <a href="#" title="Facebook">
                      <i className="icon-social-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Twitter">
                      <i className="icon-social-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Pinterest">
                      <i className="icon-social-pinterest" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Instagram">
                      <i className="icon-social-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* FOOTER AREA END */}
</>


  );
}

export default Footer;