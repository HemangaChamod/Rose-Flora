import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import {
  getProduct,
} from "../../services/productService";

import {
  useCart,
} from "../../hooks/useCart";


function ProductDetails() {

  const { id } = useParams();

  const {
    addToCart,
  } = useCart();


  const [product, setProduct] =
    useState(null);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState("");

  const [qty, setQty] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    showCartModal,
    setShowCartModal,
  ] = useState(false);


  useEffect(() => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });


    const loadProduct = async () => {

      try {

        setLoading(true);

        setError("");


        const res =
          await getProduct(id);

        const productData =
          res.data || res;


        setProduct(productData);

        setQty(1);


        if (
          productData.images &&
          productData.images.length > 0
        ) {

          const sortedImages = [
            ...productData.images,
          ].sort(
            (a, b) =>
              a.displayOrder -
              b.displayOrder
          );


          setSelectedImage(
            sortedImages[0].imageUrl
          );

        }

      } catch (err) {

        console.error(
          "Unable to load product:",
          err
        );


        setError(
          err.response?.data?.message ||
          "Unable to load product."
        );

      } finally {

        setLoading(false);

      }

    };


    if (id) {

      loadProduct();

    }

  }, [id]);


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


  const increaseQuantity = () => {

    if (
      qty < product.quantity
    ) {

      setQty(
        (currentQty) =>
          currentQty + 1
      );

    }

  };


  const decreaseQuantity = () => {

    if (qty > 1) {

      setQty(
        (currentQty) =>
          currentQty - 1
      );

    }

  };


  const handleAddToCart = () => {

    const added = addToCart(
      product,
      qty
    );


    if (added) {

      setShowCartModal(true);

    }

  };


  if (loading) {

    return (

      <Layout>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            minHeight: "600px",
          }}
        >

          <div
            className="spinner-border text-danger"
            role="status"
          ></div>

        </div>

      </Layout>

    );

  }


  if (
    error ||
    !product
  ) {

    return (

      <Layout>

        <div
          className="container text-center py-5"
          style={{
            minHeight: "500px",
          }}
        >

          <h3>
            Product Not Found
          </h3>

          <p className="text-muted">

            {error ||
              "Unable to find this product."}

          </p>

          <Link
            to="/Shop"
            className="btn btn-danger"
          >

            Back to Shop

          </Link>

        </div>

      </Layout>

    );

  }


  const images = [
    ...(product.images || []),
  ].sort(
    (a, b) =>
      a.displayOrder -
      b.displayOrder
  );


  return (

    <Layout>

      <>

        <style>
          {`

            .cart-success-backdrop {
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

            .cart-success-modal {
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
                cartModalIn 0.3s ease;
            }

            @keyframes cartModalIn {

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

            .cart-success-icon {
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

            .cart-success-modal h3 {
              font-size: 24px;
              margin-bottom: 10px;
            }

            .cart-success-modal p {
              color: #777;
              font-size: 15px;
              margin-bottom: 28px;
            }

            .cart-modal-actions {
              display: flex;
              gap: 10px;
            }

            .cart-modal-actions a,
            .cart-modal-actions button {
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

            .continue-shopping-btn {
              background: #f5f5f5;
              color: #333;
            }

            .view-cart-btn {
              background: #ef5b78;
              color: #ffffff;
            }

            .view-cart-btn:hover {
              color: #ffffff;
              background: #df4967;
            }

            @media (max-width: 575px) {

              .cart-success-modal {
                padding: 35px 22px;
              }

              .cart-modal-actions {
                flex-direction: column;
              }

            }

          `}
        </style>


        {/* BREADCRUMB */}

        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4">

        </div>


        {/* PRODUCT DETAILS */}

        <div className="container py-5">

          <div className="row">


            <div className="col-lg-6">

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                }}
              >

                <div
                  style={{
                    width: "110px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >

                  {images.map(
                    (image) => (

                      <div
                        key={image.id}
                        onClick={() =>
                          setSelectedImage(
                            image.imageUrl
                          )
                        }
                        style={{
                          border:
                            selectedImage ===
                            image.imageUrl
                              ? "1px solid #ff6b81"
                              : "1px solid #eee",
                          cursor: "pointer",
                          padding: "5px",
                          background: "#fff",
                        }}
                      >

                        <img
                          src={image.imageUrl}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "110px",
                            objectFit: "contain",
                          }}
                        />

                      </div>

                    )
                  )}

                </div>


                <div
                  style={{
                    flex: 1,
                    background: "#fafafa",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "650px",
                  }}
                >

                  <img
                    src={
                      selectedImage ||
                      "/img/product/1.png"
                    }
                    alt={product.name}
                    style={{
                      maxWidth: "85%",
                      maxHeight: "85%",
                      objectFit: "contain",
                    }}
                  />

                </div>

              </div>

            </div>


            <div className="col-lg-6">

              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: 500,
                  marginBottom: "20px",
                }}
              >

                {product.name}

              </h2>


              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "25px",
                }}
              >

                <span
                  style={{
                    fontSize: "30px",
                    color: "#ff5d73",
                    fontWeight: 600,
                  }}
                >

                  Rs.{" "}
                  {formatPrice(
                    product.salePrice ||
                    product.regularPrice
                  )}

                </span>


                {product.salePrice && (

                  <del
                    style={{
                      color: "#bbb",
                      fontSize: "22px",
                    }}
                  >

                    Rs.{" "}
                    {formatPrice(
                      product.regularPrice
                    )}

                  </del>

                )}


                <span
                  style={{
                    color: "#f6a623",
                    marginLeft: "10px",
                    fontSize: "15px",
                  }}
                >

                  ★★★★★

                </span>

              </div>


              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "28px",
                  color: "#555",
                  marginBottom: "35px",
                }}
              >

                {product.shortDescription}

              </p>


              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "15px",
                  marginBottom: "40px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    width: "140px",
                    height: "55px",
                    border: "1px solid #eee",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#fafafa",
                  }}
                >

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    style={{
                      border: "none",
                      background: "transparent",
                      width: "45px",
                      fontSize: "20px",
                    }}
                  >
                    -
                  </button>

                  <span
                    style={{
                      fontSize: "18px",
                    }}
                  >
                    {qty}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    style={{
                      border: "none",
                      background: "transparent",
                      width: "45px",
                      fontSize: "20px",
                    }}
                  >
                    +
                  </button>

                </div>


                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={
                    product.quantity <= 0
                  }
                  style={{
                    background: "#ef5b78",
                    color: "#fff",
                    border: "none",
                    padding: "16px 38px",
                    fontSize: "15px",
                    fontWeight: 600,
                    minHeight: "55px",
                  }}
                >

                  {product.quantity <= 0
                    ? "OUT OF STOCK"
                    : "ADD TO CART"}

                </button>


                <button
                  type="button"
                  style={{
                    width: "55px",
                    height: "55px",
                    border: "1px solid #eee",
                    background: "#fafafa",
                    fontSize: "20px",
                  }}
                >
                  ♡
                </button>

              </div>


              <table
                style={{
                  width: "100%",
                  fontSize: "16px",
                }}
              >

                <tbody>

                  <tr style={{ height: "45px" }}>

                    <td
                      style={{
                        width: "130px",
                        color: "#777",
                      }}
                    >
                      SKU:
                    </td>

                    <td>
                      {product.sku}
                    </td>

                  </tr>


                  <tr style={{ height: "45px" }}>

                    <td
                      style={{
                        color: "#777",
                      }}
                    >
                      Categories:
                    </td>

                    <td>
                      {product.category?.name ||
                        "-"}
                    </td>

                  </tr>


                  <tr style={{ height: "45px" }}>

                    <td
                      style={{
                        color: "#777",
                      }}
                    >
                      Tags:
                    </td>

                    <td>

                      {product.tags?.length > 0
                        ? product.tags
                            .map(
                              (productTag) =>
                                productTag.tag
                                  ?.name
                            )
                            .filter(Boolean)
                            .join(", ")
                        : "-"}

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>


        {/* DESCRIPTION */}

        <div className="container pb-5">

          <div className="row">

            <div className="col-lg-12">

              <ul
                className="nav justify-content-center"
                style={{
                  borderTop: "1px solid #e5e5e5",
                  borderBottom: "1px solid #e5e5e5",
                  padding: "0",
                  marginBottom: "40px",
                  listStyle: "none",
                }}
              >

                <li className="nav-item">

                  <button
                    className="nav-link active"
                    style={{
                      background: "#ef5b78",
                      color: "#fff",
                      borderRadius: 0,
                      border: "none",
                      padding: "12px 25px",
                      fontSize: "16px",
                    }}
                  >
                    Description
                  </button>

                </li>

              </ul>


              <div
                style={{
                  textAlign: "center",
                  maxWidth: "1200px",
                  margin: "0 auto",
                }}
              >

                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.8",
                    color: "#333",
                    marginBottom: 0,
                  }}
                >

                  {product.fullDescription}

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* SUCCESS MODAL */}

        {showCartModal && (

          <div
            className="cart-success-backdrop"
            onClick={() =>
              setShowCartModal(false)
            }
          >

            <div
              className="cart-success-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="cart-success-icon">

                <i className="fas fa-check"></i>

              </div>


              <h3>

                Added to Cart!

              </h3>


              <p>

                {product.name} has been
                successfully added to your cart.

              </p>


              <div className="cart-modal-actions">

                <button
                  type="button"
                  className="continue-shopping-btn"
                  onClick={() =>
                    setShowCartModal(false)
                  }
                >

                  Continue Shopping

                </button>


                <Link
                  to="/Cart"
                  className="view-cart-btn"
                >

                  View Cart

                </Link>

              </div>

            </div>

          </div>

        )}

      </>

    </Layout>

  );

}


export default ProductDetails;