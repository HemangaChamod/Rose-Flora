import { Link } from "react-router-dom";

import Layout from "../../components/layout/Layout";


function Wishlist() {

  return (

    <Layout>

      <>

        <style>
          {`

            .empty-wishlist-section {
              padding: 20px 20px 120px;
              background: #ffffff;
            }

            .empty-wishlist-wrapper {
              max-width: 650px;
              margin: 0 auto;
              text-align: center;
            }

            .empty-wishlist-icon {
              width: 120px;
              height: 120px;

              margin: 0 auto 30px;

              border-radius: 50%;

              background: #fbe7ec;

              display: flex;
              align-items: center;
              justify-content: center;

              color: #ef5b78;

              font-size: 48px;
            }

            .empty-wishlist-title {
              color: #252525;

              font-size: 34px;
              font-weight: 600;

              margin-bottom: 18px;
            }

            .empty-wishlist-text {
              max-width: 520px;

              margin: 0 auto 35px;

              color: #777777;

              font-size: 16px;
              line-height: 1.8;
            }

            .empty-wishlist-button {
              display: inline-flex;

              align-items: center;
              justify-content: center;

              gap: 10px;

              padding: 15px 35px;

              background: #ef5b78;
              color: #ffffff;

              border: none;

              text-decoration: none;

              font-size: 14px;
              font-weight: 600;

              text-transform: uppercase;
              letter-spacing: 1px;

              transition:
                background 0.3s ease,
                transform 0.3s ease;
            }

            .empty-wishlist-button:hover {
              background: #252525;
              color: #ffffff;

              transform: translateY(-2px);
            }


            @media (max-width: 767.98px) {

              .empty-wishlist-section {
                padding: 65px 20px 90px;
              }

              .empty-wishlist-icon {
                width: 100px;
                height: 100px;

                font-size: 40px;

                margin-bottom: 25px;
              }

              .empty-wishlist-title {
                font-size: 28px;
              }

              .empty-wishlist-text {
                font-size: 15px;
              }

            }


            @media (max-width: 575.98px) {

              .empty-wishlist-section {
                padding: 55px 20px 75px;
              }

              .empty-wishlist-icon {
                width: 90px;
                height: 90px;

                font-size: 35px;
              }

              .empty-wishlist-title {
                font-size: 25px;
              }

              .empty-wishlist-button {
                padding: 14px 28px;

                font-size: 13px;
              }

            }

          `}
        </style>


        {/* BREADCRUMB AREA */}

        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4">

      

        </div>


        {/* EMPTY WISHLIST */}

        <section className="empty-wishlist-section">

          <div className="container">

            <div className="empty-wishlist-wrapper">


              {/* ICON */}

              <div className="empty-wishlist-icon">

                <i className="far fa-heart"></i>

              </div>


              {/* TITLE */}

              <h2 className="empty-wishlist-title">

                Your Wishlist is Empty

              </h2>


              {/* DESCRIPTION */}

              <p className="empty-wishlist-text">

                You haven't added any flowers to your wishlist yet.
                Explore our beautiful collection and save your favourite
                flowers for later.

              </p>


              {/* BUTTON */}

              <Link
                to="/Shop"
                className="empty-wishlist-button"
              >

                Explore Flowers

                <i className="fas fa-arrow-right"></i>

              </Link>


            </div>

          </div>

        </section>

      </>

    </Layout>

  );

}


export default Wishlist;