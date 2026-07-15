import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import {
  getProducts,
} from "../../services/productService";

import {
  getCategories,
} from "../../services/categoryService";

import {
  useCart,
} from "../../hooks/useCart";


function Shop() {

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [sort, setSort] =
    useState("default");

  const [minPrice, setMinPrice] =
    useState(0);

  const [maxPrice, setMaxPrice] =
    useState(10000);

  const [view, setView] =
    useState("grid");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    addedProduct,
    setAddedProduct,
  ] = useState(null);

  const [
    mobileFiltersOpen,
    setMobileFiltersOpen,
  ] = useState(false);


  const {
    addToCart,
  } = useCart();


  const productsPerPage = 9;

  const PRICE_MIN = 0;

  const PRICE_MAX = 10000;


  useEffect(() => {

    loadShopData();

  }, []);


  useEffect(() => {

    if (!mobileFiltersOpen) {

      return undefined;

    }


    const previousOverflow =
      document.body.style.overflow;


    document.body.style.overflow =
      "hidden";


    return () => {

      document.body.style.overflow =
        previousOverflow;

    };

  }, [mobileFiltersOpen]);


  const loadShopData = async () => {

    try {

      setLoading(true);


      const [
        productResponse,
        categoryResponse,
      ] = await Promise.all([

        getProducts({
          limit: 1000,
        }),

        getCategories(),

      ]);


      setProducts(
        productResponse.data.products || []
      );


      setCategories(
        categoryResponse.data || []
      );

    } catch (error) {

      console.error(
        "Unable to load shop data:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  const getProductPrice = (product) => {

    return Number(
      product.salePrice ||
      product.regularPrice ||
      0
    );

  };


  const filteredProducts = useMemo(() => {

    let result = [...products];


    if (search.trim()) {

      const searchValue =
        search
          .toLowerCase()
          .trim();


      result = result.filter(
        (product) =>

          product.name
            ?.toLowerCase()
            .includes(searchValue) ||

          product.shortDescription
            ?.toLowerCase()
            .includes(searchValue) ||

          product.sku
            ?.toLowerCase()
            .includes(searchValue)
      );

    }


    if (selectedCategory) {

      result = result.filter(
        (product) =>
          product.categoryId ===
          selectedCategory
      );

    }


    result = result.filter(
      (product) => {

        const price =
          getProductPrice(product);


        return (
          price >= minPrice &&
          price <= maxPrice
        );

      }
    );


    switch (sort) {

      case "new-arrivals":

        result.sort((a, b) => {

          if (
            a.newArrival &&
            !b.newArrival
          ) {

            return -1;

          }


          if (
            !a.newArrival &&
            b.newArrival
          ) {

            return 1;

          }


          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );

        });

        break;


      case "price-low":

        result.sort(
          (a, b) =>
            getProductPrice(a) -
            getProductPrice(b)
        );

        break;


      case "price-high":

        result.sort(
          (a, b) =>
            getProductPrice(b) -
            getProductPrice(a)
        );

        break;


      case "popularity":

        result.sort(
          (a, b) =>
            Number(b.featured) -
            Number(a.featured)
        );

        break;


      default:

        break;

    }


    return result;

  }, [
    products,
    search,
    selectedCategory,
    minPrice,
    maxPrice,
    sort,
  ]);


  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    selectedCategory,
    minPrice,
    maxPrice,
    sort,
  ]);


  const totalPages = Math.ceil(
    filteredProducts.length /
    productsPerPage
  );


  const startIndex =
    (currentPage - 1) *
    productsPerPage;


  const displayedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );


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


  const handleSearch = (event) => {

    event.preventDefault();

  };


  const handlePageChange = (page) => {

    setCurrentPage(page);


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  const handleAddToCart = (
    event,
    product
  ) => {

    event.preventDefault();

    event.stopPropagation();


    if (product.quantity <= 0) {

      return;

    }


    const added = addToCart(
      product,
      1
    );


    if (added) {

      setAddedProduct(product);

    }

  };


  const handleClearFilters = () => {

    setSearch("");

    setSelectedCategory("");

    setMinPrice(PRICE_MIN);

    setMaxPrice(PRICE_MAX);

  };


  const activeFilterCount = [

    search.trim() !== "",

    selectedCategory !== "",

    minPrice !== PRICE_MIN ||
    maxPrice !== PRICE_MAX,

  ].filter(Boolean).length;


  const minPricePercent =
    ((minPrice - PRICE_MIN) /
      (PRICE_MAX - PRICE_MIN)) *
    100;


  const maxPricePercent =
    ((maxPrice - PRICE_MIN) /
      (PRICE_MAX - PRICE_MIN)) *
    100;


  return (

    <Layout>

      <>

        <style>
          {`

            .shop-price-slider {
              position: relative;
              width: 100%;
              height: 30px;
              display: flex;
              align-items: center;
            }


            .shop-price-track {
              position: absolute;
              left: 0;
              right: 0;
              height: 5px;
              background: #eeeeee;
              border-radius: 20px;
              z-index: 1;
            }


            .shop-price-progress {
              position: absolute;
              height: 5px;
              background: #e54d74;
              border-radius: 20px;
              z-index: 2;
            }


            .shop-price-range {
              position: absolute !important;
              left: 0 !important;

              width: 100% !important;
              height: 30px !important;

              margin: 0 !important;
              padding: 0 !important;

              border: 0 !important;
              outline: 0 !important;

              background: none !important;

              -webkit-appearance: none !important;
              appearance: none !important;

              pointer-events: none;

              z-index: 3;
            }


            .shop-price-range::-webkit-slider-runnable-track {
              width: 100%;
              height: 5px;

              background: transparent !important;

              border: none !important;
              box-shadow: none !important;

              -webkit-appearance: none !important;
            }


            .shop-price-range::-webkit-slider-thumb {
              width: 20px !important;
              height: 20px !important;

              margin-top: -7.5px !important;

              border-radius: 50% !important;

              background: #e54d74 !important;

              border: 3px solid #ffffff !important;

              box-shadow:
                0 2px 7px
                rgba(0, 0, 0, 0.25) !important;

              cursor: grab !important;

              pointer-events: auto;

              -webkit-appearance: none !important;
              appearance: none !important;
            }


            .shop-price-range::-webkit-slider-thumb:active {
              cursor: grabbing !important;
              transform: scale(1.08);
            }


            .shop-price-range::-moz-range-track {
              width: 100%;
              height: 5px;

              background: transparent !important;

              border: none !important;
              box-shadow: none !important;
            }


            .shop-price-range::-moz-range-progress {
              background: transparent !important;
            }


            .shop-price-range::-moz-range-thumb {
              width: 20px !important;
              height: 20px !important;

              border-radius: 50% !important;

              background: #e54d74 !important;

              border: 3px solid #ffffff !important;

              box-shadow:
                0 2px 7px
                rgba(0, 0, 0, 0.25) !important;

              cursor: grab !important;

              pointer-events: auto;
            }


            .shop-price-range-min {
              z-index: 4;
            }


            .shop-price-range-max {
              z-index: 5;
            }


            .shop-cart-backdrop {
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


            .shop-cart-modal {
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
                shopCartModalIn
                0.3s ease;
            }


            @keyframes shopCartModalIn {

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


            .shop-cart-icon {
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


            .shop-cart-modal h3 {
              font-size: 24px;
              margin-bottom: 10px;
            }


            .shop-cart-modal p {
              color: #777;

              font-size: 15px;

              margin-bottom: 28px;
            }


            .shop-cart-actions {
              display: flex;
              gap: 10px;
            }


            .shop-cart-actions a,
            .shop-cart-actions button {
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


            .shop-continue-button {
              background: #f5f5f5;
              color: #333;
            }


            .shop-view-cart-button {
              background: #ef5b78;
              color: #ffffff;
            }


            .shop-view-cart-button:hover {
              background: #df4967;
              color: #ffffff;
            }


            .shop-mobile-controls {
              display: none;
            }


            .shop-mobile-filter-backdrop {
              display: none;
            }


            .shop-mobile-filter-header,
            .shop-mobile-filter-footer {
              display: none;
            }


            @media (max-width: 575px) {

              .shop-cart-modal {
                padding: 35px 22px;
              }


              .shop-cart-actions {
                flex-direction: column;
              }


              .ltn__shop-options {
                display: none;
              }


              .shop-mobile-controls {
                display: block;

                margin-bottom: 24px;
              }


              .shop-mobile-result-count {
                margin-bottom: 12px;

                color: #777777;

                font-size: 13px;

                line-height: 1.4;
              }


              .shop-mobile-control-row {
                display: grid;

                grid-template-columns:
                  minmax(0, 1fr)
                  minmax(0, 1fr);

                gap: 10px;
              }


              .shop-mobile-filter-button {
                position: relative;

                width: 100%;
                height: 48px;

                padding: 0 15px;

                border:
                  1px solid #e5e5e5;

                background: #ffffff;

                color: #222222;

                display: flex;
                align-items: center;
                justify-content: center;

                gap: 9px;

                font-size: 14px;
                font-weight: 600;

                cursor: pointer;
              }


              .shop-mobile-filter-button i {
                font-size: 15px;
              }


              .shop-mobile-filter-count {
                min-width: 20px;
                height: 20px;

                padding: 0 6px;

                border-radius: 20px;

                background: #ef5b78;

                color: #ffffff;

                display: inline-flex;
                align-items: center;
                justify-content: center;

                font-size: 11px;
                font-weight: 600;
              }


              .shop-mobile-sort {
                position: relative;

                width: 100%;
              }


              .shop-mobile-sort select {
                width: 100%;
                height: 48px;

                margin: 0;

                padding:
                  0 38px 0 15px;

                border:
                  1px solid #e5e5e5;

                border-radius: 0;

                outline: none;

                background: #ffffff;

                color: #222222;

                font-size: 13px;
                font-weight: 500;

                cursor: pointer;

                -webkit-appearance: none;
                appearance: none;
              }


              .shop-mobile-sort::after {
                content: "⌄";

                position: absolute;

                top: 50%;
                right: 15px;

                transform:
                  translateY(-58%);

                color: #555555;

                font-size: 17px;

                pointer-events: none;
              }


              .shop-mobile-filter-backdrop {
                position: fixed;

                inset: 0;

                z-index: 9998;

                display: block;

                background:
                  rgba(0, 0, 0, 0.48);

                opacity: 0;

                visibility: hidden;

                transition:
                  opacity 0.3s ease,
                  visibility 0.3s ease;
              }


              .shop-mobile-filter-backdrop.open {
                opacity: 1;

                visibility: visible;
              }


              .ltn__shop-sidebar {
                position: fixed;

                top: 0;
                left: 0;

                z-index: 9999;

                width: 88%;
                max-width: 360px;
                height: 100dvh;

                margin: 0;

                padding:
                  0 22px 100px;

                background: #ffffff;

                overflow-y: auto;

                overscroll-behavior: contain;

                transform:
                  translateX(-105%);

                transition:
                  transform 0.3s ease;

                box-shadow:
                  8px 0 35px
                  rgba(0, 0, 0, 0.12);
              }


              .ltn__shop-sidebar.mobile-open {
                transform:
                  translateX(0);
              }


              .shop-mobile-filter-header {
                position: sticky;

                top: 0;

                z-index: 10;

                min-height: 72px;

                margin:
                  0 -22px 25px;

                padding:
                  0 18px 0 22px;

                border-bottom:
                  1px solid #eeeeee;

                background: #ffffff;

                display: flex;
                align-items: center;
                justify-content: space-between;
              }


              .shop-mobile-filter-header h3 {
                margin: 0;

                color: #222222;

                font-size: 20px;
                font-weight: 600;
              }


              .shop-mobile-filter-close {
                width: 40px;
                height: 40px;

                padding: 0;

                border: none;

                background: transparent;

                color: #333333;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 28px;
                font-weight: 300;

                line-height: 1;

                cursor: pointer;
              }


              .ltn__shop-sidebar .widget {
                margin-bottom: 30px;
              }


              .ltn__shop-sidebar
              .ltn__widget-title {
                margin-bottom: 18px;

                font-size: 17px;
              }


              .ltn__shop-sidebar
              .ltn__search-widget {
                margin-bottom: 30px;
              }


              .ltn__shop-sidebar
              .ltn__search-widget form {
                position: relative;
              }


              .ltn__shop-sidebar
              .ltn__search-widget input {
                width: 100%;
                height: 50px;

                padding:
                  0 50px 0 15px;
              }


              .ltn__shop-sidebar
              .ltn__search-widget button {
                position: absolute;

                top: 0;
                right: 0;

                width: 50px;
                height: 50px;
              }


              .ltn__shop-sidebar
              .ltn__menu-widget ul {
                margin: 0;
              }


              .ltn__shop-sidebar
              .ltn__menu-widget ul li {
                margin: 0;

                border-bottom:
                  1px solid #eeeeee;
              }


              .ltn__shop-sidebar
              .ltn__menu-widget ul li button {
                width: 100%;

                padding:
                  13px 0;

                border: none;

                background: transparent;

                color: #555555;

                text-align: left;

                font-size: 14px;

                cursor: pointer;
              }


              .ltn__shop-sidebar
              .ltn__menu-widget
              ul
              li
              button.shop-category-active {
                color: #ef5b78;

                font-weight: 600;
              }


              .shop-mobile-filter-footer {
                position: fixed;

                bottom: 0;
                left: 0;

                z-index: 11;

                width: 88%;
                max-width: 360px;

                padding:
                  14px 18px;

                border-top:
                  1px solid #eeeeee;

                background: #ffffff;

                display: grid;

                grid-template-columns:
                  0.8fr 1.2fr;

                gap: 10px;

                transform:
                  translateX(-105%);

                transition:
                  transform 0.3s ease;
              }


              .shop-mobile-filter-footer.open {
                transform:
                  translateX(0);
              }


              .shop-mobile-clear-button,
              .shop-mobile-apply-button {
                min-height: 48px;

                padding: 0 12px;

                border: none;

                font-size: 13px;
                font-weight: 600;

                cursor: pointer;
              }


              .shop-mobile-clear-button {
                background: #f5f5f5;

                color: #333333;
              }


              .shop-mobile-apply-button {
                background: #ef5b78;

                color: #ffffff;
              }

            }

          `}
        </style>


        {/* BREADCRUMB AREA */}

        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4 ltn__breadcrumb-color-white---">

        </div>


        {/* PRODUCT AREA */}

        <div className="ltn__product-area">

          <div className="container">

            <div className="row">


              {/* PRODUCTS */}

              <div className="col-lg-9 order-lg-2 mb-100">

                <div className="ltn__shop-options">

                  <ul>

                    <li>

                      <div className="showing-product-number text-right">

                        <span>

                          Showing{" "}

                          {displayedProducts.length}

                          {" "}of{" "}

                          {filteredProducts.length}

                          {" "}results

                        </span>

                      </div>

                    </li>


                    <li>

                      <div className="short-by text-center">

                        <select
                          className="nice-select"
                          value={sort}
                          onChange={(event) =>
                            setSort(
                              event.target.value
                            )
                          }
                        >

                          <option value="default">
                            Default sorting
                          </option>

                          <option value="popularity">
                            Sort by popularity
                          </option>

                          <option value="new-arrivals">
                            Sort by new arrivals
                          </option>

                          <option value="price-low">
                            Sort by price: low to high
                          </option>

                          <option value="price-high">
                            Sort by price: high to low
                          </option>

                        </select>

                      </div>


                      <div className="ltn__grid-list-tab-menu">

                        <div className="nav">

                          <button
                            type="button"
                            className={
                              view === "grid"
                                ? "active show"
                                : ""
                            }
                            onClick={() =>
                              setView("grid")
                            }
                          >

                            <i className="icon-grid" />

                          </button>


                          <button
                            type="button"
                            className={
                              view === "list"
                                ? "active show"
                                : ""
                            }
                            onClick={() =>
                              setView("list")
                            }
                          >

                            <i className="icon-menu" />

                          </button>

                        </div>

                      </div>

                    </li>

                  </ul>

                </div>


                {/* MOBILE FILTER AND SORT */}

                <div className="shop-mobile-controls">

                  <div className="shop-mobile-result-count">

                    Showing{" "}

                    {displayedProducts.length}

                    {" "}of{" "}

                    {filteredProducts.length}

                    {" "}results

                  </div>


                  <div className="shop-mobile-control-row">

                    <button
                      type="button"
                      className="shop-mobile-filter-button"
                      onClick={() =>
                        setMobileFiltersOpen(true)
                      }
                    >

                      <i className="fas fa-sliders-h"></i>

                      <span>
                        Filter
                      </span>


                      {activeFilterCount > 0 && (

                        <span className="shop-mobile-filter-count">

                          {activeFilterCount}

                        </span>

                      )}

                    </button>


                    <div className="shop-mobile-sort">

                      <select
                        value={sort}
                        onChange={(event) =>
                          setSort(
                            event.target.value
                          )
                        }
                        aria-label="Sort products"
                      >

                        <option value="default">
                          Default sorting
                        </option>

                        <option value="popularity">
                          Popularity
                        </option>

                        <option value="new-arrivals">
                          New arrivals
                        </option>

                        <option value="price-low">
                          Price: low to high
                        </option>

                        <option value="price-high">
                          Price: high to low
                        </option>

                      </select>

                    </div>

                  </div>

                </div>


                {loading ? (

                  <div className="text-center py-5">

                    <div
                      className="spinner-border"
                      role="status"
                    ></div>

                  </div>

                ) : displayedProducts.length === 0 ? (

                  <div className="text-center py-5">

                    <h4>
                      No Products Found
                    </h4>

                    <p>
                      No products match your current filters.
                    </p>

                  </div>

                ) : view === "grid" ? (

                  <div className="ltn__product-tab-content-inner ltn__product-grid-view">

                    <div className="row">

                      {displayedProducts.map(
                        (product) => (

                          <div
                            className="col-xl-4 col-sm-6 col-12"
                            key={product.id}
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


                                {(product.newArrival ||
                                  product.featured) && (

                                  <div className="product-badge">

                                    <ul>

                                      {product.newArrival && (

                                        <li className="badge-1">

                                          New

                                        </li>

                                      )}

                                    </ul>

                                  </div>

                                )}


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
                                        onClick={(event) =>
                                          handleAddToCart(
                                            event,
                                            product
                                          )
                                        }
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

                                  <span>

                                    Rs.{" "}

                                    {formatPrice(
                                      product.salePrice ||
                                      product.regularPrice
                                    )}

                                  </span>


                                  {product.salePrice && (

                                    <del>

                                      Rs.{" "}

                                      {formatPrice(
                                        product.regularPrice
                                      )}

                                    </del>

                                  )}

                                </div>

                              </div>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                ) : (

                  <div className="ltn__product-tab-content-inner ltn__product-list-view">

                    <div className="row">

                      {displayedProducts.map(
                        (product) => (

                          <div
                            className="col-lg-12"
                            key={product.id}
                          >

                            <div className="ltn__product-item">

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


                                {product.newArrival && (

                                  <div className="product-badge">

                                    <ul>

                                      <li className="badge-1">

                                        New

                                      </li>

                                    </ul>

                                  </div>

                                )}

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

                                  <span>

                                    Rs.{" "}

                                    {formatPrice(
                                      product.salePrice ||
                                      product.regularPrice
                                    )}

                                  </span>


                                  {product.salePrice && (

                                    <del>

                                      Rs.{" "}

                                      {formatPrice(
                                        product.regularPrice
                                      )}

                                    </del>

                                  )}

                                </div>


                                <div className="product-brief">

                                  <p>

                                    {product.shortDescription}

                                  </p>

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
                                        onClick={(event) =>
                                          handleAddToCart(
                                            event,
                                            product
                                          )
                                        }
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

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}


                {/* PAGINATION */}

                {totalPages > 1 && (

                  <div className="ltn__pagination-area text-center">

                    <div className="ltn__pagination ltn__pagination-2">

                      <ul>

                        <li>

                          <button
                            type="button"
                            disabled={
                              currentPage === 1
                            }
                            onClick={() =>
                              handlePageChange(
                                currentPage - 1
                              )
                            }
                          >

                            <i className="icon-arrow-left" />

                          </button>

                        </li>


                        {Array.from(
                          {
                            length: totalPages,
                          },
                          (_, index) =>
                            index + 1
                        ).map((page) => (

                          <li
                            key={page}
                            className={
                              currentPage === page
                                ? "active"
                                : ""
                            }
                          >

                            <button
                              type="button"
                              onClick={() =>
                                handlePageChange(page)
                              }
                            >

                              {page}

                            </button>

                          </li>

                        ))}


                        <li>

                          <button
                            type="button"
                            disabled={
                              currentPage ===
                              totalPages
                            }
                            onClick={() =>
                              handlePageChange(
                                currentPage + 1
                              )
                            }
                          >

                            <i className="icon-arrow-right" />

                          </button>

                        </li>

                      </ul>

                    </div>

                  </div>

                )}

              </div>


              {/* MOBILE FILTER BACKDROP */}

              <div
                className={
                  `shop-mobile-filter-backdrop ${
                    mobileFiltersOpen
                      ? "open"
                      : ""
                  }`
                }
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
              ></div>


              {/* SIDEBAR */}

              <div className="col-lg-3 mb-100">

                <aside
                  className={
                    `sidebar ltn__shop-sidebar ${
                      mobileFiltersOpen
                        ? "mobile-open"
                        : ""
                    }`
                  }
                >


                  {/* MOBILE FILTER HEADER */}

                  <div className="shop-mobile-filter-header">

                    <h3>

                      Filters

                    </h3>


                    <button
                      type="button"
                      className="shop-mobile-filter-close"
                      onClick={() =>
                        setMobileFiltersOpen(false)
                      }
                      aria-label="Close filters"
                    >

                      ×

                    </button>

                  </div>


                  {/* SEARCH */}

                  <div className="widget ltn__search-widget">

                    <form onSubmit={handleSearch}>

                      <input
                        type="text"
                        name="search"
                        placeholder="Search your keyword..."
                        value={search}
                        onChange={(event) =>
                          setSearch(
                            event.target.value
                          )
                        }
                      />

                      <button type="submit">

                        <i className="icon-magnifier" />

                      </button>

                    </form>

                  </div>


                  {/* PRICE */}

                  <div className="widget ltn__price-filter-widget">

                    <h4 className="ltn__widget-title">

                      Price

                    </h4>


                    <div className="price_filter">

                      <div className="d-flex justify-content-between align-items-center mb-3">

                        <span className="fw-semibold">

                          Rs. {formatPrice(minPrice)}

                        </span>


                        <span className="text-muted">

                          -

                        </span>


                        <span className="fw-semibold">

                          Rs. {formatPrice(maxPrice)}

                        </span>

                      </div>


                      <div className="shop-price-slider">

                        <div className="shop-price-track"></div>


                        <div
                          className="shop-price-progress"
                          style={{
                            left:
                              `${minPricePercent}%`,

                            right:
                              `${100 - maxPricePercent}%`,
                          }}
                        ></div>


                        <input
                          type="range"
                          min={PRICE_MIN}
                          max={PRICE_MAX}
                          step="500"
                          value={minPrice}
                          className="shop-price-range shop-price-range-min"
                          onChange={(event) => {

                            const value = Math.min(
                              Number(
                                event.target.value
                              ),
                              maxPrice - 500
                            );


                            setMinPrice(value);

                          }}
                        />


                        <input
                          type="range"
                          min={PRICE_MIN}
                          max={PRICE_MAX}
                          step="500"
                          value={maxPrice}
                          className="shop-price-range shop-price-range-max"
                          onChange={(event) => {

                            const value = Math.max(
                              Number(
                                event.target.value
                              ),
                              minPrice + 500
                            );


                            setMaxPrice(value);

                          }}
                        />

                      </div>

                    </div>

                  </div>


                  {/* CATEGORIES */}

                  <div className="widget ltn__menu-widget">

                    <h4 className="ltn__widget-title">

                      Categories

                    </h4>


                    <ul>

                      <li>

                        <button
                          type="button"
                          className={
                            selectedCategory === ""
                              ? "shop-category-active"
                              : ""
                          }
                          onClick={() =>
                            setSelectedCategory("")
                          }
                        >

                          All Products

                        </button>

                      </li>


                      {categories.map(
                        (category) => (

                          <li key={category.id}>

                            <button
                              type="button"
                              className={
                                selectedCategory ===
                                category.id
                                  ? "shop-category-active"
                                  : ""
                              }
                              onClick={() =>
                                setSelectedCategory(
                                  category.id
                                )
                              }
                            >

                              {category.name}

                            </button>

                          </li>

                        )
                      )}

                    </ul>

                  </div>

                </aside>


                {/* MOBILE FILTER FOOTER */}

                <div
                  className={
                    `shop-mobile-filter-footer ${
                      mobileFiltersOpen
                        ? "open"
                        : ""
                    }`
                  }
                >

                  <button
                    type="button"
                    className="shop-mobile-clear-button"
                    onClick={handleClearFilters}
                  >

                    Clear All

                  </button>


                  <button
                    type="button"
                    className="shop-mobile-apply-button"
                    onClick={() =>
                      setMobileFiltersOpen(false)
                    }
                  >

                    Show {filteredProducts.length} Products

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ADD TO CART SUCCESS MODAL */}

        {addedProduct && (

          <div
            className="shop-cart-backdrop"
            onClick={() =>
              setAddedProduct(null)
            }
          >

            <div
              className="shop-cart-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="shop-cart-icon">

                <i className="fas fa-check"></i>

              </div>


              <h3>

                Added to Cart!

              </h3>


              <p>

                {addedProduct.name} has been
                successfully added to your cart.

              </p>


              <div className="shop-cart-actions">

                <button
                  type="button"
                  className="shop-continue-button"
                  onClick={() =>
                    setAddedProduct(null)
                  }
                >

                  Continue Shopping

                </button>


                <Link
                  to="/Cart"
                  className="shop-view-cart-button"
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


export default Shop;