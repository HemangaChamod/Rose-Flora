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


  const {
    addToCart,
  } = useCart();


  const productsPerPage = 9;

  const PRICE_MIN = 0;

  const PRICE_MAX = 10000;


  useEffect(() => {

    loadShopData();

  }, []);


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


            @media (max-width: 575px) {

              .shop-cart-modal {
                padding: 35px 22px;
              }


              .shop-cart-actions {
                flex-direction: column;
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


              {/* SIDEBAR */}

              <div className="col-lg-3 mb-100">

                <aside className="sidebar ltn__shop-sidebar">


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