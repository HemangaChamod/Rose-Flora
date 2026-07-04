import Layout from "../../components/layout/Layout";

function Shop() {
  return (
    <Layout>

    <>
     {/* BREADCRUMB AREA START */}
        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4 ltn__breadcrumb-color-white---">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="ltn__breadcrumb-inner text-center">
                    <h1 className="ltn__page-title">Shop</h1>
                    <div className="ltn__breadcrumb-list">
                    <ul>
                        <li>
                        <a href="index.html">Home</a>
                        </li>
                        <li>Shop Left Sidebar</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/* BREADCRUMB AREA END */}

        
  {/* PRODUCT DETAILS AREA START */}
  <div className="ltn__product-area ">
    <div className="container">
      <div className="row">
        <div className="col-lg-9 order-lg-2 mb-100">
          <div className="ltn__shop-options">
            <ul>
              <li>
                <div className="showing-product-number text-right">
                  <span>Showing 9 of 20 results</span>
                </div>
              </li>
              <li>
                <div className="short-by text-center">
                  <select className="nice-select">
                    <option>Default sorting</option>
                    <option>Sort by popularity</option>
                    <option>Sort by new arrivals</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                  </select>
                </div>
                <div className="ltn__grid-list-tab-menu ">
                  <div className="nav">
                    <a
                      className="active show"
                      data-bs-toggle="tab"
                      href="#liton_product_grid"
                    >
                      <i className="icon-grid" />
                    </a>
                    <a data-bs-toggle="tab" href="#liton_product_list">
                      <i className="icon-menu" />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade active show" id="liton_product_grid">
              <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                <div className="row">
                  {/* ltn__product-item */}
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item text-center">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/2.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-1">Hot</li>
                          </ul>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Premium Joyful</a>
                        </h2>
                        <div className="product-price">
                          <span>$16</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item text-center">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/1.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-2">10%</li>
                          </ul>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Pink Flower Tree</a>
                        </h2>
                        <div className="product-price">
                          <span>$18</span>
                          <del>$21</del>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item text-center">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/4.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-1">Hot</li>
                          </ul>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Red Rose Bouquet</a>
                        </h2>
                        <div className="product-price">
                          <span>$16</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item text-center">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/6.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-2">10%</li>
                          </ul>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Pink Flower Tree</a>
                        </h2>
                        <div className="product-price">
                          <span>$22</span>
                          <del>$25</del>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item text-center">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/7.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-1">Hot</li>
                          </ul>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Red Rose Bouquet</a>
                        </h2>
                        <div className="product-price">
                          <span>$16</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item text-center">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/8.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-2">10%</li>
                          </ul>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Pink Flower Tree</a>
                        </h2>
                        <div className="product-price">
                          <span>$18</span>
                          <del>$21</del>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item text-center">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/4.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-1">Hot</li>
                          </ul>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Premium Joyful</a>
                        </h2>
                        <div className="product-price">
                          <span>$16</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item text-center">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/1.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-2">10%</li>
                          </ul>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Pink Flower Tree</a>
                        </h2>
                        <div className="product-price">
                          <span>$18</span>
                          <del>$21</del>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item text-center">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/5.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-1">Hot</li>
                          </ul>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Red Rose Bouquet</a>
                        </h2>
                        <div className="product-price">
                          <span>$16</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="liton_product_list">
              <div className="ltn__product-tab-content-inner ltn__product-list-view">
                <div className="row">
                  {/* ltn__product-item */}
                  <div className="col-lg-12">
                    <div className="ltn__product-item">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/2.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-1">Hot</li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Red Rose Bouquet</a>
                        </h2>
                        <div className="product-price">
                          <span>$16</span>
                        </div>
                        <div className="product-ratting">
                          <ul>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-brief">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae asperiores sit odit nesciunt,
                            aliquid, deleniti non et ut dolorem!
                          </p>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-lg-12">
                    <div className="ltn__product-item">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/1.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-2">12%</li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Red Rose Bouquet</a>
                        </h2>
                        <div className="product-price">
                          <span>$16</span>
                          <del>$19</del>
                        </div>
                        <div className="product-ratting">
                          <ul>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-brief">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae asperiores sit odit nesciunt,
                            aliquid, deleniti non et ut dolorem!
                          </p>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ltn__product-item */}
                  <div className="col-lg-12">
                    <div className="ltn__product-item">
                      <div className="product-img">
                        <a href="product-details.html">
                          <img src="img/product/4.png" alt="#" />
                        </a>
                        <div className="product-badge">
                          <ul>
                            <li className="badge-1">Hot</li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info">
                        <h2 className="product-title">
                          <a href="product-details.html">Red Rose Bouquet</a>
                        </h2>
                        <div className="product-price">
                          <span>$16</span>
                        </div>
                        <div className="product-ratting">
                          <ul>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-star" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-brief">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae asperiores sit odit nesciunt,
                            aliquid, deleniti non et ut dolorem!
                          </p>
                        </div>
                        <div className="product-hover-action product-hover-action-2">
                          <ul>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-magnifier" />
                              </a>
                            </li>
                            <li className="add-to-cart">
                              <a
                                href="#"
                                title="Add to Cart"
                                data-bs-toggle="modal"
                                data-bs-target="#add_to_cart_modal"
                              >
                                <span className="cart-text d-none d-xl-block">
                                  Add to Cart
                                </span>
                                <span className="d-block d-xl-none">
                                  <i className="icon-handbag" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view_modal"
                              >
                                <i className="icon-shuffle" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
          <div className="ltn__pagination-area text-center">
            <div className="ltn__pagination ltn__pagination-2">
              <ul>
                <li>
                  <a href="#">
                    <i className="icon-arrow-left" />
                  </a>
                </li>
                <li>
                  <a href="#">1</a>
                </li>
                <li className="active">
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">...</a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-arrow-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-3  mb-100">
          <aside className="sidebar ltn__shop-sidebar">
            {/* Search Widget */}
            <div className="widget ltn__search-widget">
              <form action="#">
                <input
                  type="text"
                  name="search"
                  placeholder="Search your keyword..."
                />
                <button type="submit">
                  <i className="icon-magnifier" />
                </button>
              </form>
            </div>
            {/* Price Filter Widget */}
            <div className="widget ltn__price-filter-widget">
              <h4 className="ltn__widget-title">Price</h4>
              <div className="price_filter">
                <div className="price_slider_amount">
                  <input type="submit" defaultValue="Your range:" />
                  <input
                    type="text"
                    className="amount"
                    name="price"
                    placeholder="Add Your Price"
                  />
                </div>
                <div className="slider-range" />
              </div>
            </div>
            {/* Category Widget */}
            <div className="widget ltn__menu-widget">
              <h4 className="ltn__widget-title">categories</h4>
              <ul>
                <li>
                  <a href="#">Clothing</a>
                </li>
                <li>
                  <a href="#">Bags</a>
                </li>
                <li>
                  <a href="#">Shoes</a>
                </li>
                <li>
                  <a href="#">Jewelry</a>
                </li>
                <li>
                  <a href="#">Accessories</a>
                </li>
                <li>
                  <a href="#">Food / Drink Store</a>
                </li>
                <li>
                  <a href="#">Gift Store</a>
                </li>
                <li>
                  <a href="#">Accessories</a>
                </li>
                <li>
                  <a href="#">Watch</a>
                </li>
                <li>
                  <a href="#">Uncategorized</a>
                </li>
                <li>
                  <a href="#">Other</a>
                </li>
              </ul>
            </div>
            {/* Color Widget */}
            <div className="widget ltn__color-widget">
              <h4 className="ltn__widget-title">Color</h4>
              <ul>
                <li className="theme">
                  <a href="#" />
                </li>
                <li className="green-2">
                  <a href="#" />
                </li>
                <li className="blue-2">
                  <a href="#" />
                </li>
                <li className="white">
                  <a href="#" />
                </li>
                <li className="red">
                  <a href="#" />
                </li>
                <li className="yellow">
                  <a href="#" />
                </li>
                {/* <li class="black"><a href="#"></a></li>
                          <li class="silver"><a href="#"></a></li>
                          <li class="gray"><a href="#"></a></li>
                          <li class="maroon"><a href="#"></a></li>
                          <li class="olive"><a href="#"></a></li>
                          <li class="lime"><a href="#"></a></li>
                          <li class="aqua"><a href="#"></a></li>
                          <li class="teal"><a href="#"></a></li>
                          <li class="blue"><a href="#"></a></li>
                          <li class="navy"><a href="#"></a></li>
                          <li class="fuchsia"><a href="#"></a></li>
                          <li class="purple"><a href="#"></a></li>
                          <li class="pink"><a href="#"></a></li>
                          <li class="nude"><a href="#"></a></li>
                          <li class="orange"><a href="#"></a></li> */}
              </ul>
            </div>
            {/* Size Widget */}
            <div className="widget ltn__size-widget">
              <h4 className="ltn__widget-title">Size</h4>
              <ul>
                <li>
                  <a href="#">S</a>
                </li>
                <li>
                  <a href="#">M</a>
                </li>
                <li>
                  <a href="#">L</a>
                </li>
                <li>
                  <a href="#">XL</a>
                </li>
                <li>
                  <a href="#">XXL</a>
                </li>
              </ul>
            </div>
            {/* Tagcloud Widget */}
            <div className="widget ltn__tagcloud-widget">
              <h4 className="ltn__widget-title">Tags</h4>
              <ul>
                <li>
                  <a href="#">Popular</a>
                </li>
                <li>
                  <a href="#">desgin</a>
                </li>
                <li>
                  <a href="#">ux</a>
                </li>
                <li>
                  <a href="#">usability</a>
                </li>
                <li>
                  <a href="#">develop</a>
                </li>
                <li>
                  <a href="#">icon</a>
                </li>
                <li>
                  <a href="#">Car</a>
                </li>
                <li>
                  <a href="#">Service</a>
                </li>
                <li>
                  <a href="#">Repairs</a>
                </li>
                <li>
                  <a href="#">Auto Parts</a>
                </li>
                <li>
                  <a href="#">Oil</a>
                </li>
                <li>
                  <a href="#">Dealer</a>
                </li>
                <li>
                  <a href="#">Oil Change</a>
                </li>
                <li>
                  <a href="#">Body Color</a>
                </li>
              </ul>
            </div>
            {/* Top Rated Product Widget */}
            <div className="widget ltn__top-rated-product-widget d-none">
              <h4 className="ltn__widget-title ltn__widget-title-border---">
                Top Rated Product
              </h4>
              <ul>
                <li>
                  <div className="top-rated-product-item clearfix">
                    <div className="top-rated-product-img">
                      <a href="product-details.html">
                        <img src="img/product/1.png" alt="#" />
                      </a>
                    </div>
                    <div className="top-rated-product-info">
                      <div className="product-ratting">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <h6>
                        <a href="product-details.html">
                          Mixel Solid Seat Cover
                        </a>
                      </h6>
                      <div className="product-price">
                        <span>$49.00</span>
                        <del>$65.00</del>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="top-rated-product-item clearfix">
                    <div className="top-rated-product-img">
                      <a href="product-details.html">
                        <img src="img/product/2.png" alt="#" />
                      </a>
                    </div>
                    <div className="top-rated-product-info">
                      <div className="product-ratting">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <h6>
                        <a href="product-details.html">Brake Conversion Kit</a>
                      </h6>
                      <div className="product-price">
                        <span>$49.00</span>
                        <del>$65.00</del>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="top-rated-product-item clearfix">
                    <div className="top-rated-product-img">
                      <a href="product-details.html">
                        <img src="img/product/3.png" alt="#" />
                      </a>
                    </div>
                    <div className="top-rated-product-info">
                      <div className="product-ratting">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-star" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <h6>
                        <a href="product-details.html">
                          Coil Spring Conversion
                        </a>
                      </h6>
                      <div className="product-price">
                        <span>$49.00</span>
                        <del>$65.00</del>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* Banner Widget */}
            <div className="widget ltn__banner-widget d-none">
              <a href="shop.html">
                <img src="#" alt="#" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
  {/* PRODUCT DETAILS AREA END */}

    </>


    </Layout>

    );
}

export default Shop;