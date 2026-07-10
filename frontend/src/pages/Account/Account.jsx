import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/customerService";

function Account() {
  const navigate = useNavigate();
  const {
    user,
    logout,
    refreshUser,
  } = useAuth();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [loadingProfile, setLoadingProfile] =
    useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loadingPassword, setLoadingPassword] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState("");

  const [passwordError, setPasswordError] = useState("");

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
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const data =
        await getProfile();
      setProfile(data);
    } catch (err) {
      console.log(err);
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
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setLoadingPassword(true);

    try {
      await changePassword(passwordData);

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
                                <form onSubmit={handleProfileSubmit}>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <label>First Name</label>
                                      <input
                                        type="text"
                                        name="firstName"
                                        value={profile.firstName}
                                        onChange={handleProfileChange}
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <label>Last Name</label>
                                      <input
                                        type="text"
                                        name="lastName"
                                        value={profile.lastName}
                                        onChange={handleProfileChange}
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <label>Email</label>
                                      <input
                                        type="email"
                                        value={profile.email}
                                        readOnly
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <label>Phone Number</label>
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
                                      {loadingProfile ? "Saving..." : "Save Changes"}
                                    </button>
                                  </div>
                                </form>

                                <hr className="my-5" />

                                <h4 className="mb-4">Change Password</h4>

                                <form onSubmit={handlePasswordSubmit}>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <label>Current Password</label>
                                      <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <label>New Password</label>
                                      <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <label>Confirm Password</label>
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
                                      {loadingPassword ? "Changing Password..." : "Change Password"}
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