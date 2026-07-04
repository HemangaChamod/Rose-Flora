import { useState } from "react";
import Layout from "../../components/layout/Layout";

function ProductDetails() {
  const images = [
    "img/product/1.png",
    "img/product/1.png",
    "img/product/1.png",
    "img/product/1.png",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [qty, setQty] = useState(2);

  return (
    <Layout>
      <>
        {/* Breadcrumb */}
        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ltn__breadcrumb-inner text-center">
                  <h1 className="ltn__page-title">Products</h1>

                  <div className="ltn__breadcrumb-list">
                    <ul>
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>Products</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="container py-5">
          <div className="row">

            {/* Left Images */}
            <div className="col-lg-6">
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                }}
              >
                {/* Thumbnails */}
                <div
                  style={{
                    width: "110px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      style={{
                        border:
                          selectedImage === img
                            ? "1px solid #ff6b81"
                            : "1px solid #eee",
                        cursor: "pointer",
                        padding: "5px",
                        background: "#fff",
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "110px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Main Image */}
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
                    src={selectedImage}
                    alt=""
                    style={{
                      maxWidth: "85%",
                      maxHeight: "85%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-lg-6">

              <h2
                style={{
                  fontSize: "48px",
                  fontWeight: 500,
                  marginBottom: "20px",
                }}
              >
                Pink Flower Tree Red
              </h2>

              {/* Price */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "25px",
                }}
              >
                <span
                  style={{
                    fontSize: "42px",
                    color: "#ff5d73",
                    fontWeight: 600,
                  }}
                >
                  $49.00
                </span>

                <del
                  style={{
                    color: "#bbb",
                    fontSize: "30px",
                  }}
                >
                  $65.00
                </del>

                <span
                  style={{
                    color: "#f6a623",
                    marginLeft: "15px",
                    fontSize: "18px",
                  }}
                >
                  ★★★★★ (95 Reviews)
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "34px",
                  color: "#555",
                  marginBottom: "40px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dignissimos repellendus repudiandae incidunt quidem pariatur
                expedita, quo quis modi tempore non.
              </p>

              {/* Quantity + Cart */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "45px",
                }}
              >
                {/* Quantity */}
                <div
                  style={{
                    display: "flex",
                    width: "150px",
                    height: "60px",
                    border: "1px solid #eee",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#fafafa",
                  }}
                >
                  <button
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    style={{
                      border: "none",
                      background: "transparent",
                      width: "50px",
                      fontSize: "24px",
                    }}
                  >
                    -
                  </button>

                  <span
                    style={{
                      fontSize: "24px",
                    }}
                  >
                    {qty}
                  </span>

                  <button
                    onClick={() => setQty(qty + 1)}
                    style={{
                      border: "none",
                      background: "transparent",
                      width: "50px",
                      fontSize: "24px",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Add Cart */}
                <button
                  style={{
                    background: "#ef5b78",
                    color: "#fff",
                    border: "none",
                    padding: "18px 45px",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  ADD TO CART
                </button>

                {/* Wishlist */}
                <button
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "1px solid #eee",
                    background: "#fafafa",
                    fontSize: "22px",
                  }}
                >
                  ♡
                </button>
              </div>

              {/* Product Info */}
              <table
                style={{
                  width: "100%",
                  fontSize: "18px",
                }}
              >
                <tbody>
                  <tr style={{ height: "50px" }}>
                    <td
                      style={{
                        width: "130px",
                        color: "#777",
                      }}
                    >
                      SKU:
                    </td>
                    <td>12345</td>
                  </tr>

                  <tr style={{ height: "50px" }}>
                    <td
                      style={{
                        color: "#777",
                      }}
                    >
                      Categories:
                    </td>
                    <td>Flower</td>
                  </tr>

                  <tr style={{ height: "50px" }}>
                    <td
                      style={{
                        color: "#777",
                      }}
                    >
                      Tags:
                    </td>
                    <td>Love, Flower, Heart</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
        {/* =====================================
    PRODUCT DESCRIPTION TABS
===================================== */}
<div className="container pb-5">
  <div className="row">
    <div className="col-lg-12">

      {/* Tabs */}
      <ul
        className="nav justify-content-center"
        style={{
          borderTop: "1px solid #e5e5e5",
          borderBottom: "1px solid #e5e5e5",
          padding: "0",
          marginBottom: "45px",
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
              padding: "14px 28px",
              fontSize: "18px",
            }}
          >
            Description
          </button>
        </li>

        <li className="nav-item">
          <button
            className="nav-link"
            style={{
              background: "#444",
              color: "#fff",
              borderRadius: 0,
              border: "none",
              padding: "14px 28px",
              marginLeft: "5px",
              fontSize: "18px",
            }}
          >
            Reviews
          </button>
        </li>

        <li className="nav-item">
          <button
            className="nav-link"
            style={{
              background: "#444",
              color: "#fff",
              borderRadius: 0,
              border: "none",
              padding: "14px 28px",
              marginLeft: "5px",
              fontSize: "18px",
            }}
          >
            Shipping
          </button>
        </li>
      </ul>

      {/* Description Content */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            lineHeight: "2",
            color: "#333",
            marginBottom: 0,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
          quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit.
        </p>
      </div>

    </div>
  </div>
</div>
      </>
    </Layout>
  );
}

export default ProductDetails;