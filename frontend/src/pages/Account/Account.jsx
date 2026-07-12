import React, {
  useEffect,
  useState,
} from "react";

import Layout
  from "../../components/layout/Layout";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../hooks/useAuth";

import {
  getProfile,
  updateProfile,
  changePassword,
  getMyOrders,
} from "../../services/customerService";


function Account() {

  const navigate = useNavigate();


  const {
    user,
    logout,
    refreshUser,
  } = useAuth();


  const [profile, setProfile] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });


  const [
    loadingProfile,
    setLoadingProfile,
  ] = useState(false);


  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  const [
    passwordData,
    setPasswordData,
  ] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const [
    loadingPassword,
    setLoadingPassword,
  ] = useState(false);


  const [
    passwordMessage,
    setPasswordMessage,
  ] = useState("");


  const [
    passwordError,
    setPasswordError,
  ] = useState("");


  const [orders, setOrders] =
    useState([]);


  const [
    loadingOrders,
    setLoadingOrders,
  ] = useState(true);


  const [
    ordersError,
    setOrdersError,
  ] = useState("");


  const [
    selectedOrder,
    setSelectedOrder,
  ] = useState(null);


  const handleLogout = async () => {

    try {

      await logout();

      navigate("/");

    } catch (error) {

      console.error(error);

    }

  };


  useEffect(() => {

    if (user) {

      loadProfile();

      loadOrders();

    }

  }, [user]);


  const loadProfile = async () => {

    try {

      const data =
        await getProfile();


      setProfile(data);

    } catch (err) {

      console.error(err);

    }

  };


  const loadOrders = async () => {

    try {

      setLoadingOrders(true);

      setOrdersError("");


      const data =
        await getMyOrders();


      setOrders(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(err);


      setOrdersError(
        err.response?.data?.message ||
        "Unable to load your orders."
      );


      setOrders([]);

    } finally {

      setLoadingOrders(false);

    }

  };


  const handleProfileChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]:
        e.target.value,

    });

  };


  const handleProfileSubmit =
    async (e) => {

      e.preventDefault();


      setLoadingProfile(true);

      setMessage("");

      setError("");


      try {

        await updateProfile({

          firstName:
            profile.firstName,

          lastName:
            profile.lastName,

          phone:
            profile.phone,

        });


        await refreshUser();


        setMessage(
          "Profile updated successfully."
        );

      } catch (err) {

        setError(

          err.response?.data?.message ||

          "Failed to update profile."

        );

      } finally {

        setLoadingProfile(false);

      }

    };


  const handlePasswordChange = (e) => {

    setPasswordData({

      ...passwordData,

      [e.target.name]:
        e.target.value,

    });

  };


  const handlePasswordSubmit =
    async (e) => {

      e.preventDefault();


      setPasswordMessage("");

      setPasswordError("");


      if (
        !passwordData.currentPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmPassword
      ) {

        setPasswordError(
          "All password fields are required."
        );

        return;

      }


      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {

        setPasswordError(
          "Passwords do not match."
        );

        return;

      }


      setLoadingPassword(true);


      try {

        await changePassword(
          passwordData
        );


        setPasswordMessage(
          "Password changed successfully."
        );


        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

      } catch (err) {

        setPasswordError(

          err.response?.data?.message ||

          "Failed to change password."

        );

      } finally {

        setLoadingPassword(false);

      }

    };


  const formatPrice = (price) => {

    return Number(
      price || 0
    ).toLocaleString(
      "en-LK",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );

  };


  const formatDate = (date) => {

    return new Date(
      date
    ).toLocaleDateString(
      "en-LK",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );

  };


  const getStatusClass = (status) => {

    switch (status) {

      case "PAID":
      case "DELIVERED":

        return "bg-success";


      case "FAILED":

        return "bg-danger";


      case "SHIPPED":

        return "bg-primary";


      case "PROCESSING":

        return "bg-info text-dark";


      case "REFUNDED":

        return "bg-secondary";


      default:

        return "bg-warning text-dark";

    }

  };


  return (

    <Layout>

      <>

        <style>
          {`

            .customer-order-number {
              font-weight: 600;
              color: #222;
            }


            .customer-order-view-btn {
              border: 1px solid #ef5b78;
              background: #ffffff;
              color: #ef5b78;

              padding: 7px 16px;

              font-size: 13px;
              font-weight: 600;

              cursor: pointer;

              transition: 0.3s ease;
            }


            .customer-order-view-btn:hover {
              background: #ef5b78;
              color: #ffffff;
            }


            .customer-order-backdrop {
              position: fixed;
              inset: 0;

              z-index: 9999;

              background:
                rgba(0, 0, 0, 0.55);

              backdrop-filter: blur(3px);

              display: flex;
              align-items: center;
              justify-content: center;

              padding: 20px;

              overflow-y: auto;
            }


            .customer-order-modal {
              position: relative;

              width: 100%;
              max-width: 850px;

              max-height: 90vh;

              overflow-y: auto;

              background: #ffffff;

              border-radius: 16px;

              padding: 35px;

              box-shadow:
                0 25px 70px
                rgba(0, 0, 0, 0.25);
            }


            .customer-order-close {
              position: absolute;

              top: 15px;
              right: 18px;

              width: 38px;
              height: 38px;

              border: none;

              background: transparent;

              font-size: 28px;

              color: #999;

              cursor: pointer;
            }


            .customer-order-close:hover {
              color: #ef5b78;
            }


            .customer-order-summary {
              background: #fafafa;

              padding: 20px;

              margin-bottom: 25px;
            }


            .customer-order-product {
              display: flex;

              gap: 15px;

              align-items: center;

              padding: 15px 0;

              border-bottom:
                1px solid #eeeeee;
            }


            .customer-order-product img {
              width: 75px;
              height: 75px;

              object-fit: cover;

              border-radius: 8px;

              border:
                1px solid #eeeeee;
            }


            .customer-order-product-info {
              flex: 1;
            }


            .customer-order-product-info h6 {
              margin-bottom: 5px;

              font-weight: 600;
            }


            .customer-order-total-row {
              display: flex;

              justify-content: space-between;

              padding: 8px 0;
            }


            .customer-order-final-total {
              font-size: 18px;

              font-weight: 700;

              border-top:
                1px solid #dddddd;

              margin-top: 8px;

              padding-top: 15px;
            }


            @media (max-width: 575px) {

              .customer-order-modal {
                padding:
                  35px 20px 25px;
              }


              .customer-order-product {
                align-items: flex-start;
              }


              .customer-order-product img {
                width: 60px;
                height: 60px;
              }

            }

          `}
        </style>


        {/* BREADCRUMB AREA */}

        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4 ltn__breadcrumb-color-white---">

          <div className="container">

            <div className="row">

              <div className="col-lg-12">

                <div className="ltn__breadcrumb-inner text-center">

                  <h1 className="ltn__page-title">

                    My Account

                  </h1>

                </div>

              </div>

            </div>

          </div>

        </div>


        <div className="liton__wishlist-area pb-50">

          <div className="container">

            <div className="row">

              <div className="col-lg-12">

                <div className="ltn__product-tab-area">

                  <div className="container">

                    <div className="row">


                      {/* MENU */}

                      <div className="col-lg-4">

                        <div className="ltn__tab-menu-list mb-50">

                          <div className="nav">

                            <a
                              className="active show"
                              data-bs-toggle="tab"
                              href="#liton_tab_1_1"
                            >

                              Dashboard

                              <i className="fas fa-home" />

                            </a>


                            <a
                              data-bs-toggle="tab"
                              href="#liton_tab_1_2"
                            >

                              Orders

                              <i className="fas fa-file-alt" />

                            </a>


                            <a
                              data-bs-toggle="tab"
                              href="#liton_tab_1_3"
                            >

                              Account Details

                              <i className="fas fa-user" />

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

                              Logout

                              <i className="fas fa-sign-out-alt" />

                            </button>

                          </div>

                        </div>

                      </div>


                      <div className="col-lg-8">

                        <div className="tab-content">


                          {/* DASHBOARD */}

                          <div
                            className="tab-pane fade active show"
                            id="liton_tab_1_1"
                          >

                            <div className="ltn__myaccount-tab-content-inner">

                              <p>

                                Hello,{" "}

                                <strong>

                                  {user?.firstName}{" "}
                                  {user?.lastName}

                                </strong>

                                .

                              </p>


                              <p>

                                From your account dashboard
                                you can view your{" "}

                                <span>
                                  recent orders
                                </span>

                                {" "}and manage your{" "}

                                <span>
                                  account information
                                </span>

                                .

                              </p>

                            </div>

                          </div>


                          {/* ORDERS */}

                          <div
                            className="tab-pane fade"
                            id="liton_tab_1_2"
                          >

                            <div className="ltn__myaccount-tab-content-inner">

                              <div className="table-responsive">

                                <table className="table align-middle">

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

                                    {loadingOrders ? (

                                      <tr>

                                        <td
                                          colSpan="5"
                                          className="text-center py-5"
                                        >

                                          <div className="spinner-border text-danger"></div>

                                        </td>

                                      </tr>

                                    ) : ordersError ? (

                                      <tr>

                                        <td
                                          colSpan="5"
                                          className="text-center text-danger py-4"
                                        >

                                          {ordersError}

                                        </td>

                                      </tr>

                                    ) : orders.length === 0 ? (

                                      <tr>

                                        <td
                                          colSpan="5"
                                          className="text-center py-5"
                                        >

                                          You haven't placed
                                          any orders yet.

                                        </td>

                                      </tr>

                                    ) : (

                                      orders.map(
                                        (order) => (

                                          <tr key={order.id}>

                                            <td>

                                              <span className="customer-order-number">

                                                {order.orderNumber}

                                              </span>

                                            </td>


                                            <td>

                                              {formatDate(
                                                order.createdAt
                                              )}

                                            </td>


                                            <td>

                                              <span
                                                className={`badge ${getStatusClass(
                                                  order.orderStatus
                                                )}`}
                                              >

                                                {order.orderStatus}

                                              </span>

                                            </td>


                                            <td>

                                              Rs.{" "}

                                              {formatPrice(
                                                order.total
                                              )}

                                            </td>


                                            <td>

                                              <button
                                                type="button"
                                                className="customer-order-view-btn"
                                                onClick={() =>
                                                  setSelectedOrder(
                                                    order
                                                  )
                                                }
                                              >

                                                View

                                              </button>

                                            </td>

                                          </tr>

                                        )
                                      )

                                    )}

                                  </tbody>

                                </table>

                              </div>

                            </div>

                          </div>


                          {/* ACCOUNT DETAILS */}

                          <div
                            className="tab-pane fade"
                            id="liton_tab_1_3"
                          >

                            <div className="ltn__myaccount-tab-content-inner mb-50">

                              <div className="ltn__form-box">

                                <form
                                  onSubmit={
                                    handleProfileSubmit
                                  }
                                >

                                  <div className="row">

                                    <div className="col-md-6">

                                      <label>
                                        First Name
                                      </label>

                                      <input
                                        type="text"
                                        name="firstName"
                                        value={profile.firstName}
                                        onChange={handleProfileChange}
                                      />

                                    </div>


                                    <div className="col-md-6">

                                      <label>
                                        Last Name
                                      </label>

                                      <input
                                        type="text"
                                        name="lastName"
                                        value={profile.lastName}
                                        onChange={handleProfileChange}
                                      />

                                    </div>


                                    <div className="col-md-6">

                                      <label>
                                        Email
                                      </label>

                                      <input
                                        type="email"
                                        value={profile.email}
                                        readOnly
                                      />

                                    </div>


                                    <div className="col-md-6">

                                      <label>
                                        Phone Number
                                      </label>

                                      <input
                                        type="text"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleProfileChange}
                                      />

                                    </div>

                                  </div>


                                  {message && (

                                    <div className="alert alert-success mt-3">

                                      {message}

                                    </div>

                                  )}


                                  {error && (

                                    <div className="alert alert-danger mt-3">

                                      {error}

                                    </div>

                                  )}


                                  <div className="btn-wrapper mt-4">

                                    <button
                                      type="submit"
                                      className="btn theme-btn-1 btn-effect-1"
                                      disabled={loadingProfile}
                                    >

                                      {loadingProfile
                                        ? "Saving..."
                                        : "Save Changes"}

                                    </button>

                                  </div>

                                </form>


                                <hr className="my-5" />


                                <h4 className="mb-4">

                                  Change Password

                                </h4>


                                <form
                                  onSubmit={
                                    handlePasswordSubmit
                                  }
                                >

                                  <div className="row">

                                    <div className="col-md-12">

                                      <label>
                                        Current Password
                                      </label>

                                      <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                      />

                                    </div>


                                    <div className="col-md-12">

                                      <label>
                                        New Password
                                      </label>

                                      <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                      />

                                    </div>


                                    <div className="col-md-12">

                                      <label>
                                        Confirm Password
                                      </label>

                                      <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                      />

                                    </div>

                                  </div>


                                  {passwordMessage && (

                                    <div className="alert alert-success mt-3">

                                      {passwordMessage}

                                    </div>

                                  )}


                                  {passwordError && (

                                    <div className="alert alert-danger mt-3">

                                      {passwordError}

                                    </div>

                                  )}


                                  <div className="btn-wrapper mt-4">

                                    <button
                                      type="submit"
                                      className="btn theme-btn-1 btn-effect-1"
                                      disabled={loadingPassword}
                                    >

                                      {loadingPassword
                                        ? "Changing Password..."
                                        : "Change Password"}

                                    </button>

                                  </div>

                                </form>

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

          </div>

        </div>


        {/* ORDER DETAILS MODAL */}

        {selectedOrder && (

          <div
            className="customer-order-backdrop"
            onClick={() =>
              setSelectedOrder(null)
            }
          >

            <div
              className="customer-order-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                type="button"
                className="customer-order-close"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >

                ×

              </button>


              <h3 className="mb-4">

                Order Details

              </h3>


              <div className="customer-order-summary">

                <div className="row g-3">

                  <div className="col-md-6">

                    <small className="text-muted">

                      Order Number

                    </small>

                    <div className="fw-bold">

                      {selectedOrder.orderNumber}

                    </div>

                  </div>


                  <div className="col-md-6">

                    <small className="text-muted">

                      Order Date

                    </small>

                    <div>

                      {formatDate(
                        selectedOrder.createdAt
                      )}

                    </div>

                  </div>


                  <div className="col-md-6">

                    <small className="text-muted">

                      Payment

                    </small>

                    <div>

                      {selectedOrder.paymentMethod}

                      {" - "}

                      <span
                        className={`badge ${getStatusClass(
                          selectedOrder.paymentStatus
                        )}`}
                      >

                        {selectedOrder.paymentStatus}

                      </span>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <small className="text-muted">

                      Order Status

                    </small>

                    <div>

                      <span
                        className={`badge ${getStatusClass(
                          selectedOrder.orderStatus
                        )}`}
                      >

                        {selectedOrder.orderStatus}

                      </span>

                    </div>

                  </div>

                </div>

              </div>


              <h5>

                Ordered Products

              </h5>


              {selectedOrder.items?.map(
                (item) => (

                  <div
                    key={item.id}
                    className="customer-order-product"
                  >

                    <img
                      src={item.productImage}
                      alt={item.productName}
                    />


                    <div className="customer-order-product-info">

                      <h6>

                        {item.productName}

                      </h6>

                      <small className="text-muted">

                        SKU: {item.sku}

                      </small>

                      <div>

                        Rs.{" "}

                        {formatPrice(item.price)}

                        {" × "}

                        {item.quantity}

                      </div>

                    </div>


                    <strong>

                      Rs.{" "}

                      {formatPrice(
                        item.subtotal
                      )}

                    </strong>

                  </div>

                )
              )}


              <div className="row mt-4">

                <div className="col-md-6">

                  <h5>

                    Delivery Address

                  </h5>

                  <p className="mb-0">

                    {selectedOrder.shippingFirstName}{" "}
                    {selectedOrder.shippingLastName}

                    <br />

                    {selectedOrder.streetAddress}

                    <br />

                    {selectedOrder.city},{" "}
                    {selectedOrder.state}

                    <br />

                    {selectedOrder.zipCode}

                    <br />

                    {selectedOrder.shippingPhone}

                  </p>

                </div>


                <div className="col-md-6">

                  <div className="customer-order-total-row">

                    <span>
                      Subtotal
                    </span>

                    <span>

                      Rs.{" "}

                      {formatPrice(
                        selectedOrder.subtotal
                      )}

                    </span>

                  </div>


                  <div className="customer-order-total-row">

                    <span>
                      Shipping
                    </span>

                    <span>

                      Rs.{" "}

                      {formatPrice(
                        selectedOrder.shippingCost
                      )}

                    </span>

                  </div>


                  <div className="customer-order-total-row customer-order-final-total">

                    <span>
                      Total
                    </span>

                    <span>

                      Rs.{" "}

                      {formatPrice(
                        selectedOrder.total
                      )}

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </>

    </Layout>

  );

}


export default Account;