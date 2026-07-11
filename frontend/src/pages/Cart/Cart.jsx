import {
  Link,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import {
  useCart,
} from "../../hooks/useCart";


function Cart() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartSubtotal,
  } = useCart();


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


                      <div className="btn-wrapper text-right">

                        <Link
                          to="/Checkout"
                          className="theme-btn-1 btn btn-effect-1"
                        >

                          Proceed to Checkout

                        </Link>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </>

    </Layout>

  );

}


export default Cart;