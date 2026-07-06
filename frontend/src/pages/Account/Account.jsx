import React from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Account() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <>
        {/* BREADCRUMB AREA START */}
        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4 ltn__breadcrumb-color-white---">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ltn__breadcrumb-inner text-center">
                  <h1 className="ltn__page-title">My Account</h1>
                  <div className="ltn__breadcrumb-list">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>My Account</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}

        {/* WISHLIST AREA START */}
        <div className="liton__wishlist-area pb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* PRODUCT TAB AREA START */}
                <div className="ltn__product-tab-area">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="ltn__tab-menu-list mb-50">
                          <div className="nav">
                            <a
                              className="active show"
                              data-bs-toggle="tab"
                              href="#liton_tab_1_1"
                            >
                              Dashboard <i className="fas fa-home" />
                            </a>
                            <a data-bs-toggle="tab" href="#liton_tab_1_2">
                              Orders <i className="fas fa-file-alt" />
                            </a>
                            <a data-bs-toggle="tab" href="#liton_tab_1_3">
                              Account Details <i className="fas fa-user" />
                            </a>
                            <button
                              onClick={handleLogout}
                              style={{
                                border: "none",
                                background: "transparent",
                                textAlign: "left",
                                padding: "12px 20px",
                                width: "100%",
                                fontSize: "16px",
                                cursor: "pointer",
                              }}
                            >
                              Logout <i className="fas fa-sign-out-alt" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="tab-content">
                          {/* Dashboard Tab */}
                          <div
                            className="tab-pane fade active show"
                            id="liton_tab_1_1"
                          >
                            <div className="ltn__myaccount-tab-content-inner">
                              
                              <p>
                                Hello,{" "}
                                <strong>
                                  {user?.firstName} {user?.lastName}
                                </strong>
                                .
                              </p>
                              <p>
                                From your account dashboard you can view your{" "}
                                <span>recent orders</span> and manage your{" "}
                                <span>account information</span>.
                              </p>
                            </div>
                          </div>

                          {/* Orders Tab */}
                          <div className="tab-pane fade" id="liton_tab_1_2">
                            <div className="ltn__myaccount-tab-content-inner">
                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Order</th>
                                      <th>Date</th>
                                      <th>Status</th>
                                      <th>Total</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td
                                        colSpan="5"
                                        style={{ textAlign: "center" }}
                                      >
                                        You haven't placed any orders yet.
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          {/* Account Details Tab */}
                          <div className="tab-pane fade" id="liton_tab_1_3">
                            <div className="ltn__myaccount-tab-content-inner mb-50">
                              <div className="ltn__form-box">
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>First Name</label>
                                    <input
                                      type="text"
                                      value={user?.firstName || ""}
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Last Name</label>
                                    <input
                                      type="text"
                                      value={user?.lastName || ""}
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Email</label>
                                    <input
                                      type="email"
                                      value={user?.email || ""}
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Phone Number</label>
                                    <input
                                      type="text"
                                      value={user?.phone || ""}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* PRODUCT TAB AREA END */}
              </div>
            </div>
          </div>
        </div>
        {/* WISHLIST AREA END */}
      </>
    </Layout>
  );
}

export default Account;