import Layout from "../../components/layout/Layout";

function Contact() {
  return (
    <Layout>

        <>
  {/* BREADCRUMB AREA START */}
  <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4 ltn__breadcrumb-color-white---">
   
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
              contact@lassanaflora.lk <br />
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
              +94 74 287 0823 <br />
  
            </p>
          </div>
        </div>
      
        <div className="col-lg-3">
          <div className="ltn__contact-address-item ltn__contact-address-item-4 box-shadow">
            <div className="ltn__contact-address-icon">
             <i className="fas fa-business-time"></i>
            </div>
            <h3>Opening Hours</h3>
            <p>
              Mon to Sat: 9:00 Am to 6:00 Pm <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* CONTACT ADDRESS AREA END */}

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