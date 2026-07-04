import Layout from "../../components/layout/Layout";

function Contact() {
  return (
    <Layout>

        <>
  {/* BREADCRUMB AREA START */}
  <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4 ltn__breadcrumb-color-white---">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="ltn__breadcrumb-inner text-center">
            <h1 className="ltn__page-title">Contact Us</h1>
            <div className="ltn__breadcrumb-list">
              <ul>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* BREADCRUMB AREA END */}
  {/* CONTACT ADDRESS AREA START */}
  <div className="ltn__contact-address-area mb-60">
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div className="ltn__contact-address-item ltn__contact-address-item-4 box-shadow">
            <div className="ltn__contact-address-icon">
              <i className="icon-location-pin" />
            </div>
            <h3>Email Address</h3>
            <p>
              info@webmail.com <br />
              jobs@webexample.com
            </p>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="ltn__contact-address-item ltn__contact-address-item-4 box-shadow">
            <div className="ltn__contact-address-icon">
              <i className="icon-phone" />
            </div>
            <h3>Phone Number</h3>
            <p>
              +1234-567 890 <br />
              +09876-543 210
            </p>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="ltn__contact-address-item ltn__contact-address-item-4 box-shadow">
            <div className="ltn__contact-address-icon">
              <i className="icon-envelope" />
            </div>
            <h3>Email &amp; Web</h3>
            <p>
              info@webmail.com <br />
              jobs@webexample.com
            </p>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="ltn__contact-address-item ltn__contact-address-item-4 box-shadow">
            <div className="ltn__contact-address-icon">
              <i className="icon-speedometer" />
            </div>
            <h3>Opening Hours</h3>
            <p>
              Fri to Wed: 6:00 Am to 8:00 Pm <br />
              Thursday - Off
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* CONTACT ADDRESS AREA END */}
  {/* GOOGLE MAP AREA START */}
  <div className="ltn_google-map-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              frameBorder={0}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* GOOGLE MAP AREA END */}
  {/* CONTACT MESSAGE AREA START */}
  <div className="ltn__contact-message-area mt-100 mb-80">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="ltn__form-box contact-form-box box-shadow--- white-bg---">
            <h3 className="text-center mb-50">
              Need Our Help! Please Send an Email.
            </h3>
            <form id="contact-form" action="mail.php" method="post">
              <div className="row">
                <div className="col-md-5">
                  <input type="text" name="name" placeholder="Name:" />
                  <input type="email" name="email" placeholder="Email:" />
                  <input type="text" name="phone" placeholder="Phone Number:" />
                  <input type="text" name="subject" placeholder="Your Title:" />
                </div>
                <div className="col-md-7">
                  <textarea
                    name="message"
                    placeholder="Enter message"
                    defaultValue={""}
                  />
                </div>
                <div className="col-lg-12">
                  <div className="btn-wrapper mt-0">
                    <button
                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                  <p className="form-messege mb-0 mt-20" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* CONTACT MESSAGE AREA END */}
</>

    </Layout>
  );
}

export default Contact;