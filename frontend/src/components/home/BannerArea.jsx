function BannerArea() {
  return (
    <>
      {/* BANNER AREA START */}
      <div className="ltn__banner-area mt-80">
        <div className="container">
          <div className="row justify-content-center">

            <div className="col-lg-4 col-md-6">
              <div className="ltn__banner-item">
                <div className="ltn__banner-img">
                  <a href="/Shop">
                    <img src="/img/banner/1.png" alt="Banner Image" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="ltn__banner-item">
                <div className="ltn__banner-img">
                  <a href="/Shop">
                    <img src="/img/banner/2.png" alt="Banner Image" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="ltn__banner-item">
                <div className="ltn__banner-img">
                  <a href="/Shop">
                    <img src="/img/banner/3.png" alt="Banner Image" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* BANNER AREA END */}
    </>
  );
}

export default BannerArea;