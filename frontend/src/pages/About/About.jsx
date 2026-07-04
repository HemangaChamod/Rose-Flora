import Layout from "../../components/layout/Layout";

function About() {
  return (
    <Layout>

        <>
  {/* BREADCRUMB AREA START */}
  <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4 ltn__breadcrumb-color-white---">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="ltn__breadcrumb-inner text-center">
            <h1 className="ltn__page-title">About Us</h1>
            <div className="ltn__breadcrumb-list">
              <ul>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* BREADCRUMB AREA END */}
  
</>

    </Layout>
  );
}

export default About;