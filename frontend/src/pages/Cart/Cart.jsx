import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import {
  useCart,
} from "../../hooks/useCart";

import {
  useAuth,
} from "../../hooks/useAuth";


function Cart() {

  const navigate = useNavigate();


  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartSubtotal,
  } = useCart();


  const {
    user,
    loading: authLoading,
  } = useAuth();


  const [
    showLoginModal,
    setShowLoginModal,
  ] = useState(false);


  const formatPrice = (price) => {

    return Number(
      price || 0
    ).toLocaleString(
      "en-LK",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );

  };


  const handleCheckout = () => {

    if (authLoading) {

      return;

    }


    if (!user) {

      setShowLoginModal(true);

      return;

    }


    navigate("/Checkout");

  };


  const handleLoginRegister = () => {

    setShowLoginModal(false);

    navigate("/Login");

  };


  return (

    <Layout>

      <>

        <style>
          {`

            .cart-empty-wrapper {
              text-align: center;
              padding: 20px 20px 110px;
            }


            .cart-empty-icon {
              width: 100px;
              height: 100px;

              margin: 0 auto 25px;

              border-radius: 50%;

              background: #fbe5ea;
              color: #ef5b78;

              display: flex;
              align-items: center;
              justify-content: center;

              font-size: 38px;
            }


            .cart-empty-wrapper h3 {
              font-size: 28px;
              margin-bottom: 12px;
            }


            .cart-empty-wrapper p {
              color: #777;
              margin-bottom: 30px;
            }


            .cart-shop-button {
              display: inline-flex;

              align-items: center;
              justify-content: center;

              padding: 14px 32px;

              background: #ef5b78;
              color: #ffffff;

              text-decoration: none;

              font-weight: 600;
            }


            .cart-shop-button:hover {
              background: #252525;
              color: #ffffff;
            }


            .cart-remove-button {
              border: none;
              background: transparent;

              color: #ef5b78;

              font-size: 20px;

              cursor: pointer;
            }


            .custom-cart-quantity {
              display: inline-flex;

              align-items: center;
              justify-content: space-between;

              width: 130px;
              height: 48px;

              border: 1px solid #eeeeee;

              background: #fafafa;
            }


            .custom-cart-quantity button {
              width: 42px;
              height: 100%;

              border: none;
              background: transparent;

              font-size: 18px;
            }


            .custom-cart-quantity span {
              font-size: 16px;
              font-weight: 600;
            }


            .cart-checkout-wrapper {
              width: 100%;
            }


            .cart-checkout-button {
              width: 100%;

              display: flex;

              align-items: center;
              justify-content: center;

              margin: 0;

              border: none;

              box-sizing: border-box;
            }


            .cart-checkout-button:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }


            .checkout-login-backdrop {
              position: fixed;

              inset: 0;

              z-index: 9999;

              background:
                rgba(0, 0, 0, 0.5);

              backdrop-filter: blur(3px);

              display: flex;

              align-items: center;
              justify-content: center;

              padding: 20px;
            }


            .checkout-login-modal {
              position: relative;

              width: 100%;
              max-width: 460px;

              background: #ffffff;

              border-radius: 18px;

              padding: 42px 38px;

              text-align: center;

              box-shadow:
                0 25px 70px
                rgba(0, 0, 0, 0.2);

              animation:
                checkoutLoginModalIn
                0.3s ease;
            }


            @keyframes checkoutLoginModalIn {

              from {
                opacity: 0;

                transform:
                  translateY(20px)
                  scale(0.96);
              }

              to {
                opacity: 1;

                transform:
                  translateY(0)
                  scale(1);
              }

            }


            .checkout-login-close {
              position: absolute;

              top: 15px;
              right: 18px;

              width: 35px;
              height: 35px;

              border: none;

              background: transparent;

              color: #999999;

              font-size: 25px;

              cursor: pointer;

              display: flex;
              align-items: center;
              justify-content: center;
            }


            .checkout-login-close:hover {
              color: #ef5b78;
            }


            .checkout-login-icon {
              width: 82px;
              height: 82px;

              margin: 0 auto 22px;

              border-radius: 50%;

              background: #fbe5ea;

              color: #ef5b78;

              display: flex;
              align-items: center;
              justify-content: center;

              font-size: 32px;
            }


            .checkout-login-modal h3 {
              font-size: 26px;

              font-weight: 600;

              color: #222222;

              margin-bottom: 13px;
            }


            .checkout-login-modal p {
              color: #777777;

              font-size: 15px;

              line-height: 1.7;

              margin-bottom: 30px;
            }


            .checkout-login-actions {
              display: flex;

              gap: 12px;
            }


            .checkout-login-actions button {
              flex: 1;

              min-height: 50px;

              border: none;

              border-radius: 6px;

              font-size: 14px;
              font-weight: 600;

              cursor: pointer;

              transition:
                all 0.3s ease;
            }


            .checkout-continue-shopping {
              background: #f5f5f5;

              color: #333333;
            }


            .checkout-continue-shopping:hover {
              background: #eeeeee;
            }


            .checkout-login-register {
              background: #ef5b78;

              color: #ffffff;
            }


            .checkout-login-register:hover {
              background: #df4967;

              transform:
                translateY(-1px);
            }


            @media (max-width: 575px) {

              .checkout-login-modal {
                padding:
                  38px 22px 28px;
              }


              .checkout-login-modal h3 {
                font-size: 23px;
              }


              .checkout-login-actions {
                flex-direction: column;
              }

            }

          `}
        </style>


        {/* BREADCRUMB */}

        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4">

        </div>


        {cartItems.length === 0 ? (

          <div className="cart-empty-wrapper">

            <div className="cart-empty-icon">

              <i className="icon-handbag"></i>

            </div>


            <h3>

              Your Cart is Empty

            </h3>


            <p>

              Looks like you haven't added
              any flowers to your cart yet.

            </p>


            <Link
              to="/Shop"
              className="cart-shop-button"
            >

              Explore Flowers

            </Link>

          </div>

        ) : (

          <div className="liton__shoping-cart-area mb-100">

            <div className="container">

              <div className="row">

                <div className="col-lg-12">

                  <div className="shoping-cart-inner">

                    <div className="shoping-cart-table table-responsive">

                      <table className="table">

                        <thead>

                          <tr>

                            <th>
                              Remove
                            </th>

                            <th>
                              Image
                            </th>

                            <th>
                              Product
                            </th>

                            <th>
                              Price
                            </th>

                            <th>
                              Quantity
                            </th>

                            <th>
                              Subtotal
                            </th>

                          </tr>

                        </thead>


                        <tbody>

                          {cartItems.map(
                            (item) => {

                              const price =
                                item.salePrice ||
                                item.regularPrice;


                              const subtotal =
                                price *
                                item.cartQuantity;


                              return (

                                <tr key={item.id}>

                                  <td className="cart-product-remove">

                                    <button
                                      type="button"
                                      className="cart-remove-button"
                                      onClick={() =>
                                        removeFromCart(
                                          item.id
                                        )
                                      }
                                    >

                                      ×

                                    </button>

                                  </td>


                                  <td className="cart-product-image">

                                    <Link
                                      to={`/ProductDetails/${item.id}`}
                                    >

                                      <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                      />

                                    </Link>

                                  </td>


                                  <td className="cart-product-info">

                                    <h4>

                                      <Link
                                        to={`/ProductDetails/${item.id}`}
                                      >

                                        {item.name}

                                      </Link>

                                    </h4>


                                    <small className="text-muted">

                                      SKU: {item.sku}

                                    </small>

                                  </td>


                                  <td className="cart-product-price">

                                    Rs.{" "}

                                    {formatPrice(price)}

                                  </td>


                                  <td className="cart-product-quantity">

                                    <div className="custom-cart-quantity">

                                      <button
                                        type="button"
                                        onClick={() =>
                                          decreaseQuantity(
                                            item.id
                                          )
                                        }
                                      >

                                        -

                                      </button>


                                      <span>

                                        {item.cartQuantity}

                                      </span>


                                      <button
                                        type="button"
                                        disabled={
                                          item.cartQuantity >=
                                          item.stockQuantity
                                        }
                                        onClick={() =>
                                          increaseQuantity(
                                            item.id
                                          )
                                        }
                                      >

                                        +

                                      </button>

                                    </div>

                                  </td>


                                  <td className="cart-product-subtotal">

                                    Rs.{" "}

                                    {formatPrice(
                                      subtotal
                                    )}

                                  </td>

                                </tr>

                              );

                            }
                          )}

                        </tbody>

                      </table>

                    </div>


                    <div className="shoping-cart-total mt-50">

                      <h4>

                        Cart Totals

                      </h4>


                      <table className="table">

                        <tbody>

                          <tr>

                            <td>
                              Cart Subtotal
                            </td>

                            <td>

                              Rs.{" "}

                              {formatPrice(
                                cartSubtotal
                              )}

                            </td>

                          </tr>


                          <tr>

                            <td>
                              Shipping
                            </td>

                            <td>
                              Calculated at checkout
                            </td>

                          </tr>


                          <tr>

                            <td>

                              <strong>
                                Order Total
                              </strong>

                            </td>

                            <td>

                              <strong>

                                Rs.{" "}

                                {formatPrice(
                                  cartSubtotal
                                )}

                              </strong>

                            </td>

                          </tr>

                        </tbody>

                      </table>


                      <div className="cart-checkout-wrapper">

                        <button
                          type="button"
                          className="theme-btn-1 btn btn-effect-1 cart-checkout-button"
                          onClick={handleCheckout}
                          disabled={authLoading}
                        >

                          {authLoading
                            ? "Checking Account..."
                            : "Proceed to Checkout"}

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* LOGIN REQUIRED MODAL */}

        {showLoginModal && (

          <div
            className="checkout-login-backdrop"
            onClick={() =>
              setShowLoginModal(false)
            }
          >

            <div
              className="checkout-login-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                type="button"
                className="checkout-login-close"
                onClick={() =>
                  setShowLoginModal(false)
                }
                aria-label="Close"
              >

                ×

              </button>


              <div className="checkout-login-icon">

                <i className="fas fa-user-lock"></i>

              </div>


              <h3>

                Login Required

              </h3>


              <p>

                Please login or create an account
                before proceeding to checkout.

              </p>


              <div className="checkout-login-actions">

                <button
                  type="button"
                  className="checkout-continue-shopping"
                  onClick={() =>
                    setShowLoginModal(false)
                  }
                >

                  Continue Shopping

                </button>


                <button
                  type="button"
                  className="checkout-login-register"
                  onClick={
                    handleLoginRegister
                  }
                >

                  Login / Register

                </button>

              </div>

            </div>

          </div>

        )}

      </>

    </Layout>

  );

}


export default Cart;