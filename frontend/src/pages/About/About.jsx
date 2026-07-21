import { Link } from "react-router-dom";

import Layout from "../../components/layout/Layout";


function About() {

  return (

    <Layout>

      <>

        <style>
          {`

            .about-story-section {
              padding: 100px 0;
            }

            .about-image-wrapper {
              position: relative;
              padding-right: 40px;
              padding-bottom: 40px;
            }

            .about-main-image {
              width: 100%;
              height: 620px;
              object-fit: cover;
            }

            .about-image-shape {
              position: absolute;
              width: 70%;
              height: 70%;
              right: 0;
              bottom: 0;
              background: #fbe7ec;
              z-index: -1;
            }

            .about-experience-box {
              position: absolute;
              right: 0;
              bottom: 70px;
              background: #ef5b78;
              color: #ffffff;
              width: 180px;
              padding: 30px 20px;
              text-align: center;
            }

            .about-experience-box h3 {
              color: #ffffff;
              font-size: 36px;
              margin-bottom: 5px;
            }

            .about-experience-box p {
              color: #ffffff;
              font-size: 14px;
              margin: 0;
              line-height: 1.6;
            }

            .about-small-title {
              color: #ef5b78;
              font-size: 14px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 3px;
              margin-bottom: 15px;
            }

            .about-main-title {
              font-size: 42px;
              line-height: 1.25;
              font-weight: 600;
              margin-bottom: 25px;
              color: #252525;
            }

            .about-description {
              color: #666666;
              font-size: 16px;
              line-height: 1.9;
              margin-bottom: 20px;
            }

            .about-feature-list {
              margin-top: 30px;
              margin-bottom: 35px;
            }

            .about-feature-item {
              display: flex;
              align-items: center;
              gap: 15px;
              margin-bottom: 18px;
              font-size: 16px;
              color: #444444;
            }

            .about-feature-icon {
              width: 36px;
              height: 36px;
              min-width: 36px;
              border-radius: 50%;
              background: #fbe7ec;
              color: #ef5b78;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
            }

            .about-shop-btn {
              display: inline-block;
              background: #ef5b78;
              color: #ffffff;
              padding: 15px 35px;
              text-decoration: none;
              font-size: 14px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
              transition: 0.3s ease;
            }

            .about-shop-btn:hover {
              background: #252525;
              color: #ffffff;
            }


            /* VALUES */

            .about-values-section {
              padding: 90px 0;
              background: #fcf8f9;
            }

            .about-section-header {
              max-width: 650px;
              margin: 0 auto 55px;
              text-align: center;
            }

            .about-section-title {
              font-size: 38px;
              font-weight: 600;
              color: #252525;
              margin-bottom: 18px;
            }

            .about-section-text {
              color: #777777;
              font-size: 16px;
              line-height: 1.8;
            }

            .about-value-card {
              background: #ffffff;
              padding: 45px 30px;
              text-align: center;
              height: 100%;
              transition: transform 0.35s ease,
                          box-shadow 0.35s ease;
            }

            .about-value-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
            }

            .about-value-icon {
              width: 75px;
              height: 75px;
              border-radius: 50%;
              background: #fbe7ec;
              color: #ef5b78;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 25px;
              font-size: 28px;
              transition: 0.3s ease;
            }

            .about-value-card:hover .about-value-icon {
              background: #ef5b78;
              color: #ffffff;
            }

            .about-value-card h4 {
              font-size: 21px;
              font-weight: 600;
              margin-bottom: 15px;
            }

            .about-value-card p {
              color: #777777;
              font-size: 15px;
              line-height: 1.8;
              margin: 0;
            }


            /* FLOWER MESSAGE */

            .about-message-section {
              padding: 110px 0;
              position: relative;
              background:
                linear-gradient(
                  rgba(35, 35, 35, 0.68),
                  rgba(35, 35, 35, 0.68)
                ),
                url("/img/slider/3.jpeg");

              background-size: cover;
              background-position: center;
              background-attachment: fixed;
            }

            .about-message-content {
              max-width: 750px;
              margin: auto;
              text-align: center;
            }

            .about-message-content span {
              color: #ffffff;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 4px;
            }

            .about-message-content h2 {
              color: #ffffff;
              font-size: 44px;
              line-height: 1.4;
              font-weight: 500;
              margin: 20px 0 25px;
            }

            .about-message-content p {
              color: rgba(255, 255, 255, 0.85);
              font-size: 16px;
              line-height: 1.8;
              margin-bottom: 35px;
            }


            /* RESPONSIVE */

            @media (max-width: 991.98px) {

              .about-story-section {
                padding: 70px 0;
              }

              .about-image-wrapper {
                margin-bottom: 60px;
              }

              .about-main-image {
                height: 520px;
              }

              .about-main-title {
                font-size: 36px;
              }

              .about-message-section {
                background-attachment: scroll;
              }

              .about-message-content h2 {
                font-size: 38px;
              }

            }


            @media (max-width: 767.98px) {

              .about-story-section {
                padding: 55px 0;
              }

              .about-image-wrapper {
                padding-right: 25px;
                padding-bottom: 25px;
                margin-bottom: 50px;
              }

              .about-main-image {
                height: 430px;
              }

              .about-experience-box {
                width: 150px;
                padding: 22px 15px;
                bottom: 45px;
              }

              .about-experience-box h3 {
                font-size: 28px;
              }

              .about-main-title {
                font-size: 30px;
              }

              .about-values-section {
                padding: 60px 0;
              }

              .about-section-title {
                font-size: 30px;
              }

              .about-value-card {
                padding: 35px 25px;
              }

              .about-message-section {
                padding: 75px 20px;
              }

              .about-message-content h2 {
                font-size: 30px;
              }

            }


            @media (max-width: 575.98px) {

              .about-main-image {
                height: 360px;
              }

              .about-experience-box {
                width: 135px;
                bottom: 35px;
              }

              .about-experience-box h3 {
                font-size: 25px;
              }

              .about-experience-box p {
                font-size: 12px;
              }

              .about-small-title {
                font-size: 12px;
                letter-spacing: 2px;
              }

              .about-main-title {
                font-size: 27px;
              }

              .about-description {
                font-size: 15px;
              }

              .about-section-title {
                font-size: 27px;
              }

              .about-message-content h2 {
                font-size: 27px;
              }

            }

          `}
        </style>


        {/* BREADCRUMB AREA */}

        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4">

         
        </div>


        {/* OUR STORY */}

        <section className="about-story-section">

          <div className="container">

            <div className="row align-items-center">


              {/* IMAGE */}

              <div className="col-lg-6">

                <div className="about-image-wrapper">

                  <img
                    src="/img/slider/1.jpeg"
                    alt="Beautiful fresh flowers"
                    className="about-main-image"
                  />

                  <div className="about-image-shape"></div>

                  <div className="about-experience-box">

                    <h3>
                      Fresh
                    </h3>

                    <p>
                      Flowers selected with care for every special moment.
                    </p>

                  </div>

                </div>

              </div>


              {/* CONTENT */}

              <div className="col-lg-6">

                <div>

                  <div className="about-small-title">

                    Our Story

                  </div>

                  <h2 className="about-main-title">

                    Bringing Beauty and Joy Through Flowers

                  </h2>

                  <p className="about-description">

                    At Rose Flora, we believe flowers are more than
                    beautiful gifts. They are a simple and meaningful way
                    to express love, celebrate happiness, and make special
                    moments unforgettable.

                  </p>

                  <p className="about-description">

                    Our collection brings together fresh flowers and
                    beautifully arranged floral designs created for
                    birthdays, celebrations, congratulations, and every
                    moment worth remembering.

                  </p>


                  <div className="about-feature-list">

                    <div className="about-feature-item">

                      <div className="about-feature-icon">

                        <i className="fas fa-check"></i>

                      </div>

                      Fresh and carefully selected flowers

                    </div>


                    <div className="about-feature-item">

                      <div className="about-feature-icon">

                        <i className="fas fa-check"></i>

                      </div>

                      Beautiful arrangements for special occasions

                    </div>


                    <div className="about-feature-item">

                      <div className="about-feature-icon">

                        <i className="fas fa-check"></i>

                      </div>

                      Made with care and attention to every detail

                    </div>

                  </div>


                  <Link
                    to="/Shop"
                    className="about-shop-btn"
                  >

                    Explore Flowers

                  </Link>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* OUR VALUES */}

        <section className="about-values-section">

          <div className="container">


            <div className="about-section-header">

              <div className="about-small-title">

                Why Choose Us

              </div>

              <h2 className="about-section-title">

                Flowers Made for Meaningful Moments

              </h2>

              <p className="about-section-text">

                From choosing beautiful flowers to creating elegant
                arrangements, we focus on making every floral gift feel
                special.

              </p>

            </div>


            <div className="row g-4">


              <div className="col-lg-4 col-md-6">

                <div className="about-value-card">

                  <div className="about-value-icon">

                    <i className="fas fa-seedling"></i>

                  </div>

                  <h4>

                    Fresh Flowers

                  </h4>

                  <p>

                    We carefully select beautiful flowers to create
                    arrangements that look fresh, colourful, and full of
                    life.

                  </p>

                </div>

              </div>


              <div className="col-lg-4 col-md-6">

                <div className="about-value-card">

                  <div className="about-value-icon">

                    <i className="far fa-heart"></i>

                  </div>

                  <h4>

                    Made with Care

                  </h4>

                  <p>

                    Every floral arrangement is prepared with care and
                    attention to make your gift feel personal and
                    meaningful.

                  </p>

                </div>

              </div>


              <div className="col-lg-4 col-md-6">

                <div className="about-value-card">

                  <div className="about-value-icon">

                    <i className="fas fa-gift"></i>

                  </div>

                  <h4>

                    Perfect for Every Moment

                  </h4>

                  <p>

                    From birthdays and celebrations to simple expressions
                    of love, find flowers for every special occasion.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* MESSAGE SECTION */}

        <section className="about-message-section">

          <div className="container">

            <div className="about-message-content">

              <span>

                Share Something Beautiful

              </span>

              <h2>

                Every Special Moment Deserves Beautiful Flowers

              </h2>

              <p>

                Celebrate love, happiness, friendship, and life's memorable
                moments with flowers chosen to make someone smile.

              </p>

              <Link
                to="/Shop"
                className="about-shop-btn"
              >

                Shop Flowers

              </Link>

            </div>

          </div>

        </section>

      </>

    </Layout>

  );

}


export default About;