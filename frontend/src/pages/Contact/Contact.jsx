import { useState } from "react";
import Layout from "../../components/layout/Layout";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form:", formData);
  };

  return (
    <Layout>
      <>
        <style>
          {`
            .contact-page {
              background: #ffffff;
            }

            .contact-hero {
              padding: 75px 0 55px;
              text-align: center;
              background: linear-gradient(
                135deg,
                #fff8fa 0%,
                #ffffff 55%,
                #fff3f6 100%
              );
            }

            .contact-hero-label {
              color: #ef5b78;
              font-size: 14px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 12px;
            }

            .contact-hero h1 {
              font-size: 44px;
              font-weight: 600;
              color: #222;
              margin-bottom: 15px;
            }

            .contact-hero p {
              max-width: 600px;
              margin: 0 auto;
              color: #777;
              font-size: 16px;
              line-height: 1.8;
            }


            /* CONTACT INFORMATION */

            .contact-info-section {
              padding: 75px 0 30px;
            }

            .contact-info-card {
              height: 100%;
              padding: 38px 28px;
              text-align: center;
              background: #ffffff;
              border: 1px solid #eeeeee;
              transition: all 0.35s ease;
            }

            .contact-info-card:hover {
              transform: translateY(-7px);
              border-color: #f7c5d0;
              box-shadow: 0 18px 45px rgba(0, 0, 0, 0.07);
            }

            .contact-info-icon {
              width: 70px;
              height: 70px;
              margin: 0 auto 25px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #fff1f4;
              color: #ef5b78;
              font-size: 27px;
              transition: all 0.35s ease;
            }

            .contact-info-card:hover .contact-info-icon {
              background: #ef5b78;
              color: #ffffff;
            }

            .contact-info-card h3 {
              font-size: 20px;
              font-weight: 600;
              color: #222;
              margin-bottom: 12px;
            }

            .contact-info-card p {
              margin: 0;
              color: #777;
              font-size: 15px;
              line-height: 1.7;
            }


            /* CONTACT FORM */

            .contact-form-section {
              padding: 60px 0 100px;
            }

            .contact-form-wrapper {
              border: 1px solid #eeeeee;
              background: #ffffff;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
            }

            .contact-form-left {
              height: 100%;
              padding: 60px 50px;
              background: #ef5b78;
              color: #ffffff;
            }

            .contact-form-left span {
              display: block;
              font-size: 13px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 15px;
              opacity: 0.9;
            }

            .contact-form-left h2 {
              color: #ffffff;
              font-size: 36px;
              font-weight: 600;
              line-height: 1.3;
              margin-bottom: 25px;
            }

            .contact-form-left p {
              color: rgba(255, 255, 255, 0.9);
              font-size: 15px;
              line-height: 1.8;
              margin-bottom: 35px;
            }

            .contact-help-item {
              display: flex;
              align-items: center;
              gap: 15px;
              margin-bottom: 20px;
            }

            .contact-help-icon {
              width: 45px;
              height: 45px;
              min-width: 45px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.15);
              font-size: 17px;
            }

            .contact-help-item p {
              margin: 0;
              font-size: 14px;
              line-height: 1.6;
            }


            .contact-form-content {
              padding: 60px 50px;
            }

            .contact-form-content h3 {
              font-size: 28px;
              font-weight: 600;
              color: #222;
              margin-bottom: 10px;
            }

            .contact-form-description {
              color: #888;
              font-size: 15px;
              margin-bottom: 35px;
            }

            .contact-input-group {
              margin-bottom: 22px;
            }

            .contact-input-group label {
              display: block;
              color: #444;
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 9px;
            }

            .contact-input {
              width: 100%;
              height: 55px;
              padding: 0 18px;
              border: 1px solid #e5e5e5;
              background: #fafafa;
              color: #333;
              font-size: 15px;
              outline: none;
              transition: all 0.3s ease;
            }

            textarea.contact-input {
              height: 155px;
              padding-top: 16px;
              resize: vertical;
            }

            .contact-input:focus {
              border-color: #ef5b78;
              background: #ffffff;
              box-shadow: 0 0 0 3px rgba(239, 91, 120, 0.08);
            }

            .contact-submit-btn {
              border: none;
              background: #ef5b78;
              color: #ffffff;
              padding: 16px 38px;
              font-size: 14px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .contact-submit-btn:hover {
              background: #df4967;
              transform: translateY(-2px);
              box-shadow: 0 10px 25px rgba(239, 91, 120, 0.25);
            }


            /* TABLET */

            @media (max-width: 991.98px) {
              .contact-hero h1 {
                font-size: 38px;
              }

              .contact-info-card {
                margin-bottom: 25px;
              }

              .contact-form-left,
              .contact-form-content {
                padding: 45px 35px;
              }
            }


            /* MOBILE */

            @media (max-width: 575.98px) {
              .contact-hero {
                padding: 55px 20px 45px;
              }

              .contact-hero h1 {
                font-size: 32px;
              }

              .contact-hero p {
                font-size: 14px;
              }

              .contact-info-section {
                padding: 50px 0 20px;
              }

              .contact-form-section {
                padding: 40px 0 70px;
              }

              .contact-form-left,
              .contact-form-content {
                padding: 35px 25px;
              }

              .contact-form-left h2 {
                font-size: 29px;
              }

              .contact-form-content h3 {
                font-size: 25px;
              }

              .contact-submit-btn {
                width: 100%;
              }
            }
          `}
        </style>


        <div className="contact-page">

          {/* HERO */}

          <section className="contact-hero">

            <div className="container">

              <div className="contact-hero-label">
                Get In Touch
              </div>

              <h1>
                We'd Love to Hear From You
              </h1>

              <p>
                Have a question about our flowers, an order, or a special
                arrangement? Our team is always happy to help.
              </p>

            </div>

          </section>


          {/* CONTACT INFORMATION */}

          <section className="contact-info-section">

            <div className="container">

              <div className="row justify-content-center">

                <div className="col-lg-4 col-md-6">

                  <div className="contact-info-card">

                    <div className="contact-info-icon">

                      <i className="icon-envelope" />

                    </div>

                    <h3>
                      Email Address
                    </h3>

                    <p>
                      contact@lassanaflora.lk
                    </p>

                  </div>

                </div>


                <div className="col-lg-4 col-md-6">

                  <div className="contact-info-card">

                    <div className="contact-info-icon">

                      <i className="icon-phone" />

                    </div>

                    <h3>
                      Phone Number
                    </h3>

                    <p>
                      +94 74 287 0823
                    </p>

                  </div>

                </div>


                <div className="col-lg-4 col-md-6">

                  <div className="contact-info-card">

                    <div className="contact-info-icon">

                      <i className="far fa-clock" />

                    </div>

                    <h3>
                      Opening Hours
                    </h3>

                    <p>
                      Monday - Saturday
                      <br />
                      9:00 AM - 6:00 PM
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* CONTACT FORM */}

          <section className="contact-form-section">

            <div className="container">

              <div className="contact-form-wrapper">

                <div className="row g-0">

                  {/* LEFT */}

                  <div className="col-lg-5">

                    <div className="contact-form-left">

                      <span>
                        Contact Lassana Flora
                      </span>

                      <h2>
                        Let's Make Every Moment Bloom
                      </h2>

                      <p>
                        Whether you're planning a surprise, celebrating a
                        special day, or simply sending a little love, we're
                        here to help you find the perfect flowers.
                      </p>


                      <div className="contact-help-item">

                        <div className="contact-help-icon">

                          <i className="icon-location-pin" />

                        </div>

                        <p>
                          Colombo
                          <br />
                          Sri Lanka
                        </p>

                      </div>


                      <div className="contact-help-item">

                        <div className="contact-help-icon">

                          <i className="icon-phone" />

                        </div>

                        <p>
                          Need quick assistance?
                          <br />
                          +94 74 287 0823
                        </p>

                      </div>


                      <div className="contact-help-item">

                        <div className="contact-help-icon">

                          <i className="icon-envelope" />

                        </div>

                        <p>
                          Send us an email
                          <br />
                          contact@lassanaflora.lk
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* RIGHT */}

                  <div className="col-lg-7">

                    <div className="contact-form-content">

                      <h3>
                        Send Us a Message
                      </h3>

                      <p className="contact-form-description">
                        Fill in the form below and we'll get back to you as
                        soon as possible.
                      </p>


                      <form onSubmit={handleSubmit}>

                        <div className="row">

                          <div className="col-md-6">

                            <div className="contact-input-group">

                              <label>
                                Your Name
                              </label>

                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="contact-input"
                                placeholder="Enter your name"
                                required
                              />

                            </div>

                          </div>


                          <div className="col-md-6">

                            <div className="contact-input-group">

                              <label>
                                Email Address
                              </label>

                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="contact-input"
                                placeholder="Enter your email"
                                required
                              />

                            </div>

                          </div>


                          <div className="col-md-6">

                            <div className="contact-input-group">

                              <label>
                                Phone Number
                              </label>

                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="contact-input"
                                placeholder="Enter phone number"
                              />

                            </div>

                          </div>


                          <div className="col-md-6">

                            <div className="contact-input-group">

                              <label>
                                Subject
                              </label>

                              <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="contact-input"
                                placeholder="How can we help?"
                                required
                              />

                            </div>

                          </div>


                          <div className="col-12">

                            <div className="contact-input-group">

                              <label>
                                Your Message
                              </label>

                              <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="contact-input"
                                placeholder="Write your message here..."
                                required
                              />

                            </div>

                          </div>


                          <div className="col-12">

                            <button
                              type="submit"
                              className="contact-submit-btn"
                            >

                              Send Message

                            </button>

                          </div>

                        </div>

                      </form>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>

      </>

    </Layout>
  );
}

export default Contact;