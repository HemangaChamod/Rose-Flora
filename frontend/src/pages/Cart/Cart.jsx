import Layout from "../../components/layout/Layout";

function Cart() {
  return (
    <Layout>

      <>
  {/* BREADCRUMB AREA START */}
  <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4 ltn__breadcrumb-color-white---">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="ltn__breadcrumb-inner text-center">
            <h1 className="ltn__page-title">Cart</h1>
            <div className="ltn__breadcrumb-list">
              <ul>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>Cart</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* BREADCRUMB AREA END */}
  {/* SHOPING CART AREA START */}
  <div className="liton__shoping-cart-area mb-100">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="shoping-cart-inner">
            <div className="shoping-cart-table table-responsive">
              <table className="table">
                {/* <thead>
                              <th class="cart-product-remove">Remove</th>
                              <th class="cart-product-image">Image</th>
                              <th class="cart-product-info">Product</th>
                              <th class="cart-product-price">Price</th>
                              <th class="cart-product-quantity">Quantity</th>
                              <th class="cart-product-subtotal">Subtotal</th>
                          </thead> */}
                <tbody>
                  <tr>
                    <td className="cart-product-remove">x</td>
                    <td className="cart-product-image">
                      <a href="product-details.html">
                        <img src="img/product/1.png" alt="#" />
                      </a>
                    </td>
                    <td className="cart-product-info">
                      <h4>
                        <a href="product-details.html">Brake Conversion Kit</a>
                      </h4>
                    </td>
                    <td className="cart-product-price">$149.00</td>
                    <td className="cart-product-quantity">
                      <div className="cart-plus-minus">
                        <input
                          type="text"
                          defaultValue={2}
                          name="qtybutton"
                          className="cart-plus-minus-box"
                        />
                      </div>
                    </td>
                    <td className="cart-product-subtotal">$298.00</td>
                  </tr>
                  <tr>
                    <td className="cart-product-remove">x</td>
                    <td className="cart-product-image">
                      <a href="product-details.html">
                        <img src="img/product/2.png" alt="#" />
                      </a>
                    </td>
                    <td className="cart-product-info">
                      <h4>
                        <a href="product-details.html">OE Replica Wheels</a>
                      </h4>
                    </td>
                    <td className="cart-product-price">$85.00</td>
                    <td className="cart-product-quantity">
                      <div className="cart-plus-minus">
                        <input
                          type="text"
                          defaultValue={2}
                          name="qtybutton"
                          className="cart-plus-minus-box"
                        />
                      </div>
                    </td>
                    <td className="cart-product-subtotal">$170.00</td>
                  </tr>
                  <tr>
                    <td className="cart-product-remove">x</td>
                    <td className="cart-product-image">
                      <a href="product-details.html">
                        <img src="img/product/3.png" alt="#" />
                      </a>
                    </td>
                    <td className="cart-product-info">
                      <h4>
                        <a href="product-details.html">
                          Wheel Bearing Retainer
                        </a>
                      </h4>
                    </td>
                    <td className="cart-product-price">$75.00</td>
                    <td className="cart-product-quantity">
                      <div className="cart-plus-minus">
                        <input
                          type="text"
                          defaultValue={2}
                          name="qtybutton"
                          className="cart-plus-minus-box"
                        />
                      </div>
                    </td>
                    <td className="cart-product-subtotal">$150.00</td>
                  </tr>
                  <tr className="cart-coupon-row">
                    <td colSpan={6}>
                      <div className="cart-coupon">
                        <input
                          type="text"
                          name="cart-coupon"
                          placeholder="Coupon code"
                        />
                        <button
                          type="submit"
                          className="btn theme-btn-2 btn-effect-2"
                        >
                          Apply Coupon
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        type="submit"
                        className="btn theme-btn-2 btn-effect-2-- disabled"
                      >
                        Update Cart
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="shoping-cart-total mt-50">
              <h4>Cart Totals</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Cart Subtotal</td>
                    <td>$618.00</td>
                  </tr>
                  <tr>
                    <td>Shipping and Handing</td>
                    <td>$15.00</td>
                  </tr>
                  <tr>
                    <td>Vat</td>
                    <td>$00.00</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Order Total</strong>
                    </td>
                    <td>
                      <strong>$633.00</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="btn-wrapper text-right">
                <a
                  href="/Checkout"
                  className="theme-btn-1 btn btn-effect-1"
                >
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* SHOPING CART AREA END */}
</>


    </Layout>
  );
}

export default Cart;