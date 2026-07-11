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


function FeaturedProducts() {

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

    loadFeaturedProducts();

  }, []);


  const loadFeaturedProducts = async () => {

    try {

      const res = await getProducts({
        featured: true,
        limit: 100,
      });


      setProducts(
        res.data?.products || []
      );

    } catch (error) {

      console.error(
        "Unable to load featured products:",
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

          .featured-cart-backdrop {
            position: fixed;
            inset: 0;
            z-index: 9998;

            background:
              rgba(0, 0, 0, 0.45);

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 20px;
          }


          .featured-cart-modal {
            position: relative;

            width: 100%;
            max-width: 430px;

            background: #ffffff;

            border-radius: 14px;

            padding: 40px 35px;

            text-align: center;

            box-shadow:
              0 20px 60px
              rgba(0, 0, 0, 0.2);

            animation:
              featuredCartModalIn
              0.3s ease;
          }


          @keyframes featuredCartModalIn {

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


          .featured-cart-icon {
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


          .featured-cart-modal h3 {
            font-size: 24px;

            margin-bottom: 10px;
          }


          .featured-cart-modal p {
            color: #777;

            font-size: 15px;

            margin-bottom: 28px;
          }


          .featured-cart-actions {
            display: flex;

            gap: 10px;
          }


          .featured-cart-actions a,
          .featured-cart-actions button {
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


          .featured-continue-button {
            background: #f5f5f5;

            color: #333;
          }


          .featured-view-cart-button {
            background: #ef5b78;

            color: #ffffff;
          }


          .featured-view-cart-button:hover {
            background: #df4967;

            color: #ffffff;
          }


          @media (max-width: 575px) {

            .featured-cart-modal {
              padding: 35px 22px;
            }


            .featured-cart-actions {
              flex-direction: column;
            }

          }

        `}
      </style>


      {/* PRODUCT AREA START */}

      <div className="ltn__product-area ltn__product-gutter pt-65 pb-40">

        <div className="container">

          <div className="row">

            <div className="col-lg-12">

              <div className="section-title-area text-center">

                <h1 className="section-title section-title-border">

                  Featured Items

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

                    No featured products available.

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


                        <div className="product-badge">

                          {product.quantity <= 0 && (

                            <ul>

                              <li className="soldout-badge">

                                Sold Out

                              </li>

                            </ul>

                          )}

                        </div>


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

      {/* PRODUCT AREA END */}


      {/* ADD TO CART SUCCESS MODAL */}

      {addedProduct && (

        <div
          className="featured-cart-backdrop"
          onClick={() =>
            setAddedProduct(null)
          }
        >

          <div
            className="featured-cart-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="featured-cart-icon">

              <i className="fas fa-check"></i>

            </div>


            <h3>

              Added to Cart!

            </h3>


            <p>

              {addedProduct.name} has been
              successfully added to your cart.

            </p>


            <div className="featured-cart-actions">

              <button
                type="button"
                className="featured-continue-button"
                onClick={() =>
                  setAddedProduct(null)
                }
              >

                Continue Shopping

              </button>


              <Link
                to="/Cart"
                className="featured-view-cart-button"
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


export default FeaturedProducts;