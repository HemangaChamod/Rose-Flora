import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getProducts,
} from "../../services/productService";

import {
  useCart,
} from "../../hooks/useCart";


function NewArrivalProducts() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    addedProduct,
    setAddedProduct,
  ] = useState(null);


  const {
    addToCart,
  } = useCart();


  useEffect(() => {

    loadNewArrivalProducts();

  }, []);


  const loadNewArrivalProducts = async () => {

    try {

      setLoading(true);


      const res = await getProducts({
        newArrival: true,
        limit: 100,
      });


      setProducts(
        res.data?.products || []
      );

    } catch (error) {

      console.error(
        "Unable to load new arrival products:",
        error
      );


      setProducts([]);

    } finally {

      setLoading(false);

    }

  };


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


  const handleAddToCart = (
    event,
    product
  ) => {

    event.preventDefault();

    event.stopPropagation();


    const added = addToCart(
      product,
      1
    );


    if (added) {

      setAddedProduct(product);

    }

  };


  return (

    <>

      <style>
        {`

          .new-arrival-cart-backdrop {
            position: fixed;
            inset: 0;
            z-index: 9998;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 20px;

            background:
              rgba(0, 0, 0, 0.45);
          }


          .new-arrival-cart-modal {
            position: relative;

            width: 100%;
            max-width: 430px;

            padding: 40px 35px;

            background: #ffffff;

            border-radius: 14px;

            text-align: center;

            box-shadow:
              0 20px 60px
              rgba(0, 0, 0, 0.2);

            animation:
              newArrivalCartModalIn
              0.3s ease;
          }


          @keyframes newArrivalCartModalIn {

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


          .new-arrival-cart-icon {
            width: 75px;
            height: 75px;

            margin:
              0 auto 20px;

            border-radius: 50%;

            background: #fbe5ea;

            color: #ef5b78;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 30px;
          }


          .new-arrival-cart-modal h3 {
            margin-bottom: 10px;

            font-size: 24px;
          }


          .new-arrival-cart-modal p {
            margin-bottom: 28px;

            color: #777777;

            font-size: 15px;
          }


          .new-arrival-cart-actions {
            display: flex;

            gap: 10px;
          }


          .new-arrival-cart-actions a,
          .new-arrival-cart-actions button {
            flex: 1;

            min-height: 48px;

            display: flex;
            align-items: center;
            justify-content: center;

            border: none;

            text-decoration: none;

            font-size: 14px;
            font-weight: 600;

            cursor: pointer;
          }


          .new-arrival-continue-button {
            background: #f5f5f5;

            color: #333333;
          }


          .new-arrival-view-cart-button {
            background: #ef5b78;

            color: #ffffff;
          }


          .new-arrival-view-cart-button:hover {
            background: #df4967;

            color: #ffffff;
          }


          @media (max-width: 575px) {

            .new-arrival-cart-modal {
              padding: 35px 22px;
            }


            .new-arrival-cart-actions {
              flex-direction: column;
            }

          }

        `}
      </style>


      {/* NEW ARRIVAL PRODUCT AREA START */}

      <div className="ltn__product-area ltn__product-gutter pt-65 pb-40">

        <div className="container">

          <div className="row">

            <div className="col-lg-12">

              <div className="section-title-area text-center">

                <h1 className="section-title section-title-border">

                  New Arrivals

                </h1>

              </div>

            </div>

          </div>


          <div className="row justify-content-center">

            {

              loading ? (

                <div className="col-12 text-center py-5">

                  <div
                    className="spinner-border text-danger"
                    role="status"
                  >

                    <span className="visually-hidden">

                      Loading...

                    </span>

                  </div>

                </div>

              ) : products.length === 0 ? (

                <div className="col-12 text-center py-5">

                  <p className="text-muted">

                    No new arrival products available.

                  </p>

                </div>

              ) : (

                products.map((product) => (

                  <div
                    key={product.id}
                    className="col-lg-3 col-md-4 col-sm-6 col-6"
                  >

                    <div className="ltn__product-item text-center">

                      <div className="product-img">

                        <Link
                          to={`/ProductDetails/${product.id}`}
                        >

                          <img
                            src={
                              product.images?.[0]
                                ?.imageUrl ||
                              "/img/product/1.png"
                            }
                            alt={product.name}
                          />

                        </Link>


                        {/* PRODUCT BADGES */}

                        <div className="product-badge">

                          <ul>

                            {product.quantity <= 0 ? (

                              <li className="soldout-badge">

                                Sold Out

                              </li>

                            ) : (

                              <li className="sale-badge">

                                New

                              </li>

                            )}

                          </ul>

                        </div>


                        {/* PRODUCT ACTION */}

                        <div className="product-hover-action product-hover-action-2">

                          <ul>

                            <li className="add-to-cart">

                              <a
                                href="#"
                                title={
                                  product.quantity <= 0
                                    ? "Out of Stock"
                                    : "Add to Cart"
                                }
                                onClick={(event) => {

                                  if (
                                    product.quantity > 0
                                  ) {

                                    handleAddToCart(
                                      event,
                                      product
                                    );

                                  } else {

                                    event.preventDefault();

                                  }

                                }}
                              >

                                <span className="cart-text d-none d-xl-block">

                                  {product.quantity <= 0
                                    ? "Out of Stock"
                                    : "Add to Cart"}

                                </span>


                                <span className="d-block d-xl-none">

                                  <i className="icon-handbag" />

                                </span>

                              </a>

                            </li>

                          </ul>

                        </div>

                      </div>


                      {/* PRODUCT INFO */}

                      <div className="product-info">

                        <h2 className="product-title">

                          <Link
                            to={`/ProductDetails/${product.id}`}
                          >

                            {product.name}

                          </Link>

                        </h2>


                        <div className="product-price">

                          {

                            product.salePrice ? (

                              <>

                                <span>

                                  Rs.{" "}
                                  {formatPrice(
                                    product.salePrice
                                  )}

                                </span>


                                <del>

                                  Rs.{" "}
                                  {formatPrice(
                                    product.regularPrice
                                  )}

                                </del>

                              </>

                            ) : (

                              <span>

                                Rs.{" "}
                                {formatPrice(
                                  product.regularPrice
                                )}

                              </span>

                            )

                          }

                        </div>

                      </div>

                    </div>

                  </div>

                ))

              )

            }

          </div>

        </div>

      </div>

      {/* NEW ARRIVAL PRODUCT AREA END */}


      {/* ADD TO CART SUCCESS MODAL */}

      {addedProduct && (

        <div
          className="new-arrival-cart-backdrop"
          onClick={() =>
            setAddedProduct(null)
          }
        >

          <div
            className="new-arrival-cart-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="new-arrival-cart-icon">

              <i className="fas fa-check"></i>

            </div>


            <h3>

              Added to Cart!

            </h3>


            <p>

              {addedProduct.name} has been
              successfully added to your cart.

            </p>


            <div className="new-arrival-cart-actions">

              <button
                type="button"
                className="new-arrival-continue-button"
                onClick={() =>
                  setAddedProduct(null)
                }
              >

                Continue Shopping

              </button>


              <Link
                to="/Cart"
                className="new-arrival-view-cart-button"
              >

                View Cart

              </Link>

            </div>

          </div>

        </div>

      )}

    </>

  );

}


export default NewArrivalProducts;