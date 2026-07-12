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

        <div className="product-details-loading">

          <div
            className="spinner-border"
            role="status"
          >

            <span className="visually-hidden">

              Loading...

            </span>

          </div>

          <p>

            Loading product...

          </p>

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

        <div className="container">

          <div className="product-error-state">

            <div className="product-error-icon">

              <i className="fas fa-seedling"></i>

            </div>

            <h2>

              Product Not Found

            </h2>

            <p>

              {error ||
                "Unable to find this product."}

            </p>

            <Link
              to="/Shop"
              className="product-back-shop"
            >

              Back to Shop

            </Link>

          </div>

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

            .product-details-page {
              background: #ffffff;
              padding: 65px 0 80px;
            }


            .product-details-container {
              max-width: 1380px;
            }


            .product-details-loading {
              min-height: 600px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 18px;
            }


            .product-details-loading .spinner-border {
              color: #ef5b78;
            }


            .product-details-loading p {
              color: #777;
              margin: 0;
            }


            .product-error-state {
              min-height: 550px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 50px 20px;
            }


            .product-error-icon {
              width: 85px;
              height: 85px;
              border-radius: 50%;
              background: #fff0f3;
              color: #ef5b78;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 32px;
              margin-bottom: 25px;
            }


            .product-error-state h2 {
              font-size: 32px;
              margin-bottom: 12px;
            }


            .product-error-state p {
              color: #777;
              margin-bottom: 25px;
            }


            .product-back-shop {
              background: #ef5b78;
              color: #ffffff;
              padding: 14px 30px;
              text-decoration: none;
              font-weight: 600;
            }


            .product-back-shop:hover {
              background: #df4967;
              color: #ffffff;
            }


            .product-gallery {
              display: flex;
              gap: 20px;
            }


            .product-thumbnails {
              width: 88px;
              flex-shrink: 0;
              display: flex;
              flex-direction: column;
              gap: 12px;
            }


            .product-thumbnail {
              width: 88px;
              height: 88px;
              border: 1px solid #eeeeee;
              border-radius: 10px;
              background: #ffffff;
              padding: 6px;
              cursor: pointer;
              transition: all 0.25s ease;
              overflow: hidden;
            }


            .product-thumbnail:hover {
              border-color: #ef5b78;
              transform: translateY(-2px);
            }


            .product-thumbnail.active {
              border: 2px solid #ef5b78;
              box-shadow:
                0 5px 18px
                rgba(239, 91, 120, 0.12);
            }


            .product-thumbnail img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }


            .product-main-image {
              flex: 1;
              height: 560px;
              background: #ffffff;
              border: 1px solid #f0f0f0;
              border-radius: 18px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 35px;
              overflow: hidden;
              position: relative;
              box-shadow:
                0 12px 45px
                rgba(28, 20, 22, 0.05);
            }


            .product-main-image img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              transition: transform 0.4s ease;
            }


            .product-main-image:hover img {
              transform: scale(1.035);
            }


            .product-sale-badge {
              position: absolute;
              top: 20px;
              left: 20px;
              background: #ef5b78;
              color: #ffffff;
              padding: 8px 16px;
              border-radius: 30px;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 1px;
              z-index: 2;
            }


            .product-information {
              padding-left: 45px;
              padding-top: 10px;
            }


            .product-category-label {
              color: #ef5b78;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 14px;
            }


            .product-details-title {
              font-size: 44px;
              line-height: 1.18;
              font-weight: 600;
              color: #171717;
              margin-bottom: 22px;
            }


            .product-price-row {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 14px;
              margin-bottom: 20px;
            }


            .product-current-price {
              color: #ef5b78;
              font-size: 31px;
              font-weight: 700;
            }


            .product-old-price {
              color: #aaaaaa;
              font-size: 20px;
              font-weight: 400;
            }


            .product-rating {
              display: flex;
              align-items: center;
              gap: 3px;
              color: #f5a623;
              font-size: 14px;
              margin-left: 5px;
            }


            .product-short-description {
              font-size: 16px;
              color: #686868;
              line-height: 1.8;
              margin: 25px 0 28px;
              max-width: 620px;
            }


            .product-stock-status {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 28px;
              font-size: 14px;
              font-weight: 600;
            }


            .product-stock-status.in-stock {
              color: #248c59;
            }


            .product-stock-status.out-stock {
              color: #dc3545;
            }


            .product-stock-dot {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: currentColor;
            }


            .product-purchase-row {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 12px;
              margin-bottom: 38px;
            }


            .product-quantity {
              height: 58px;
              width: 145px;
              border: 1px solid #e5e5e5;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #ffffff;
              overflow: hidden;
            }


            .product-quantity button {
              width: 45px;
              height: 100%;
              border: none;
              background: transparent;
              font-size: 20px;
              color: #333333;
              cursor: pointer;
              transition: background 0.2s ease;
            }


            .product-quantity button:hover {
              background: #fff2f5;
              color: #ef5b78;
            }


            .product-quantity span {
              font-size: 17px;
              font-weight: 600;
            }


            .product-add-cart {
              height: 58px;
              min-width: 220px;
              padding: 0 35px;
              border: none;
              border-radius: 8px;
              background: #ef5b78;
              color: #ffffff;
              font-size: 14px;
              font-weight: 700;
              letter-spacing: 1px;
              cursor: pointer;
              transition: all 0.3s ease;
            }


            .product-add-cart:hover:not(:disabled) {
              background: #df4967;
              transform: translateY(-2px);
              box-shadow:
                0 10px 25px
                rgba(239, 91, 120, 0.25);
            }


            .product-add-cart:disabled {
              background: #b9b9b9;
              cursor: not-allowed;
            }


            .product-wishlist-button {
              width: 58px;
              height: 58px;
              border: 1px solid #e5e5e5;
              border-radius: 8px;
              background: #ffffff;
              font-size: 21px;
              cursor: pointer;
              transition: all 0.3s ease;
            }


            .product-wishlist-button:hover {
              border-color: #ef5b78;
              color: #ef5b78;
              background: #fff5f7;
            }


            .product-meta {
              border-top: 1px solid #eeeeee;
              padding-top: 27px;
            }


            .product-meta-row {
              display: flex;
              align-items: flex-start;
              margin-bottom: 17px;
              font-size: 15px;
            }


            .product-meta-label {
              width: 125px;
              flex-shrink: 0;
              color: #999999;
            }


            .product-meta-value {
              color: #333333;
              font-weight: 500;
            }


            .product-description-section {
              background: #fffafb;
              padding: 75px 0;
            }


            .product-description-content {
              max-width: 1050px;
              margin: 0 auto;
              text-align: center;
            }


            .product-description-small-title {
              color: #ef5b78;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 3px;
              text-transform: uppercase;
              margin-bottom: 12px;
            }


            .product-description-title {
              font-size: 38px;
              font-weight: 600;
              color: #1c1c1c;
              margin-bottom: 25px;
            }


            .product-description-line {
              width: 55px;
              height: 2px;
              background: #ef5b78;
              margin: 0 auto 30px;
            }


            .product-description-text {
              color: #606060;
              font-size: 17px;
              line-height: 2;
              margin: 0;
              white-space: pre-line;
            }


            .cart-success-backdrop {
              position: fixed;
              inset: 0;
              z-index: 9998;
              background: rgba(0, 0, 0, 0.48);
              backdrop-filter: blur(3px);
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
              border-radius: 18px;
              padding: 42px 35px;
              text-align: center;
              box-shadow:
                0 25px 70px
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
              margin: 0 auto 20px;
              border-radius: 50%;
              background: #fbe5ea;
              color: #ef5b78;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 30px;
            }


            .cart-success-modal h3 {
              font-size: 25px;
              margin-bottom: 10px;
              font-weight: 600;
            }


            .cart-success-modal p {
              color: #777777;
              font-size: 15px;
              line-height: 1.7;
              margin-bottom: 28px;
            }


            .cart-modal-actions {
              display: flex;
              gap: 10px;
            }


            .cart-modal-actions a,
            .cart-modal-actions button {
              flex: 1;
              min-height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: none;
              border-radius: 6px;
              text-decoration: none;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
            }


            .continue-shopping-btn {
              background: #f5f5f5;
              color: #333333;
            }


            .view-cart-btn {
              background: #ef5b78;
              color: #ffffff;
            }


            .view-cart-btn:hover {
              color: #ffffff;
              background: #df4967;
            }


            @media (max-width: 1199px) {

              .product-information {
                padding-left: 20px;
              }


              .product-details-title {
                font-size: 38px;
              }


              .product-main-image {
                height: 500px;
              }

            }


            @media (max-width: 991px) {

              .product-details-page {
                padding: 45px 0 65px;
              }


              .product-information {
                padding-left: 0;
                padding-top: 50px;
              }


              .product-main-image {
                height: 540px;
              }

            }


            @media (max-width: 767px) {

              .product-gallery {
                flex-direction: column-reverse;
              }


              .product-thumbnails {
                width: 100%;
                flex-direction: row;
                overflow-x: auto;
                padding-bottom: 5px;
              }


              .product-thumbnail {
                width: 78px;
                min-width: 78px;
                height: 78px;
              }


              .product-main-image {
                width: 100%;
                height: 440px;
                padding: 25px;
                border-radius: 14px;
              }


              .product-details-title {
                font-size: 33px;
              }


              .product-current-price {
                font-size: 27px;
              }


              .product-description-section {
                padding: 55px 0;
              }


              .product-description-title {
                font-size: 31px;
              }

            }


            @media (max-width: 575px) {

              .product-details-page {
                padding: 30px 0 50px;
              }


              .product-main-image {
                height: 370px;
                padding: 18px;
              }


              .product-information {
                padding-top: 35px;
              }


              .product-details-title {
                font-size: 29px;
              }


              .product-price-row {
                gap: 10px;
              }


              .product-current-price {
                font-size: 25px;
              }


              .product-old-price {
                font-size: 17px;
              }


              .product-rating {
                width: 100%;
                margin-left: 0;
              }


              .product-short-description {
                font-size: 15px;
                line-height: 1.75;
              }


              .product-purchase-row {
                align-items: stretch;
              }


              .product-quantity {
                width: 130px;
              }


              .product-add-cart {
                flex: 1;
                min-width: 160px;
                padding: 0 18px;
              }


              .product-meta-row {
                font-size: 14px;
              }


              .product-meta-label {
                width: 100px;
              }


              .product-description-title {
                font-size: 28px;
              }


              .product-description-text {
                font-size: 15px;
                line-height: 1.9;
              }


              .cart-success-modal {
                padding: 35px 22px;
              }


              .cart-modal-actions {
                flex-direction: column;
              }

            }

          `}
        </style>


        {/* PRODUCT DETAILS */}

        <section className="product-details-page">

          <div className="container product-details-container">

            <div className="row align-items-center">


              {/* PRODUCT GALLERY */}

              <div className="col-lg-6">

                <div className="product-gallery">


                  {/* THUMBNAILS */}

                  {images.length > 0 && (

                    <div className="product-thumbnails">

                      {images.map(
                        (image) => (

                          <button
                            key={image.id}
                            type="button"
                            className={`product-thumbnail ${
                              selectedImage ===
                              image.imageUrl
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              setSelectedImage(
                                image.imageUrl
                              )
                            }
                          >

                            <img
                              src={image.imageUrl}
                              alt={product.name}
                            />

                          </button>

                        )
                      )}

                    </div>

                  )}


                  {/* MAIN IMAGE */}

                  <div className="product-main-image">

                    {product.salePrice && (

                      <span className="product-sale-badge">

                        SALE

                      </span>

                    )}


                    <img
                      src={
                        selectedImage ||
                        "/img/product/1.png"
                      }
                      alt={product.name}
                    />

                  </div>

                </div>

              </div>


              {/* PRODUCT INFORMATION */}

              <div className="col-lg-6">

                <div className="product-information">


                  <div className="product-category-label">

                    {product.category?.name ||
                      "Flowers"}

                  </div>


                  <h1 className="product-details-title">

                    {product.name}

                  </h1>


                  <div className="product-price-row">

                    <span className="product-current-price">

                      Rs.{" "}

                      {formatPrice(
                        product.salePrice ||
                        product.regularPrice
                      )}

                    </span>


                    {product.salePrice && (

                      <del className="product-old-price">

                        Rs.{" "}

                        {formatPrice(
                          product.regularPrice
                        )}

                      </del>

                    )}


                    <div className="product-rating">

                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>

                    </div>

                  </div>


                  <p className="product-short-description">

                    {product.shortDescription}

                  </p>


                  <div
                    className={`product-stock-status ${
                      product.quantity > 0
                        ? "in-stock"
                        : "out-stock"
                    }`}
                  >

                    <span className="product-stock-dot"></span>


                    {product.quantity > 0
                      ? `${product.quantity} available in stock`
                      : "Currently out of stock"}

                  </div>


                  {/* PURCHASE ACTIONS */}

                  <div className="product-purchase-row">


                    <div className="product-quantity">

                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        aria-label="Decrease quantity"
                      >

                        −

                      </button>


                      <span>

                        {qty}

                      </span>


                      <button
                        type="button"
                        onClick={increaseQuantity}
                        aria-label="Increase quantity"
                      >

                        +

                      </button>

                    </div>


                    <button
                      type="button"
                      className="product-add-cart"
                      onClick={handleAddToCart}
                      disabled={
                        product.quantity <= 0
                      }
                    >

                      {product.quantity <= 0
                        ? "OUT OF STOCK"
                        : "ADD TO CART"}

                    </button>


                    <button
                      type="button"
                      className="product-wishlist-button"
                      aria-label="Add to wishlist"
                    >

                      ♡

                    </button>

                  </div>


                  {/* PRODUCT META */}

                  <div className="product-meta">

                    <div className="product-meta-row">

                      <span className="product-meta-label">

                        SKU

                      </span>

                      <span className="product-meta-value">

                        {product.sku}

                      </span>

                    </div>


                    <div className="product-meta-row">

                      <span className="product-meta-label">

                        Category

                      </span>

                      <span className="product-meta-value">

                        {product.category?.name ||
                          "-"}

                      </span>

                    </div>


                    <div className="product-meta-row">

                      <span className="product-meta-label">

                        Tags

                      </span>

                      <span className="product-meta-value">

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

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* PRODUCT DESCRIPTION */}

        <section className="product-description-section">

          <div className="container">

            <div className="product-description-content">

              <div className="product-description-small-title">

                Product Details

              </div>


              <h2 className="product-description-title">

                About This Flower Arrangement

              </h2>


              <div className="product-description-line"></div>


              <p className="product-description-text">

                {product.fullDescription}

              </p>

            </div>

          </div>

        </section>


        {/* ADD TO CART SUCCESS MODAL */}

        {showCartModal && (

          <div
            className="cart-success-backdrop"
            onClick={() =>
              setShowCartModal(false)
            }
          >

            <div
              className="cart-success-modal"
              onClick={(event) =>
                event.stopPropagation()
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