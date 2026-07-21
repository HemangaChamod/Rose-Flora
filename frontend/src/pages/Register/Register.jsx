import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../hooks/useAuth";


export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    user,
    loading,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);


  useEffect(() => {
    if (!loading && user) {
      navigate("/account");
    }
  }, [user, loading, navigate]);


  const handleChange = (e) => {
    setFormData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));

    if (error) {
      setError("");
    }
  };


  const handleLoginNavigation = () => {
    setIsLeaving(true);

    setTimeout(() => {
      navigate("/Login");
    }, 420);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      await register(formData);

      navigate("/verify-email-sent", {

          state: {

              email: formData.email,

          },

      });
      
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to create your account."
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Layout>
      <>
        <style>
          {`
            .lassana-register-page,
            .lassana-register-page * {
              box-sizing: border-box;
            }

            .lassana-register-page {
              min-height: 820px;
              display: flex;
              align-items: stretch;
              overflow: hidden;
              background: #ffffff;
              animation: lassanaRegisterEnter 0.7s cubic-bezier(.22, 1, .36, 1);
            }

            .lassana-register-page.is-leaving {
              animation: lassanaRegisterLeave 0.42s ease forwards;
              pointer-events: none;
            }

            @keyframes lassanaRegisterEnter {
              from {
                opacity: 0;
                transform: translateY(18px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes lassanaRegisterLeave {
              from {
                opacity: 1;
                transform: translateY(0);
              }

              to {
                opacity: 0;
                transform: translateY(-12px);
              }
            }


            /* VISUAL */

            .lassana-register-visual {
              width: 45%;
              min-height: 820px;
              position: relative;
              overflow: hidden;
              background:
                url("/img/bg/login-bg.webp")
                center center / cover no-repeat;
              animation: lassanaRegisterVisualEnter
                0.9s cubic-bezier(.22, 1, .36, 1);
            }

            @keyframes lassanaRegisterVisualEnter {
              from {
                opacity: 0;
                transform: translateX(-40px) scale(1.03);
              }

              to {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }

            .lassana-register-visual::after {
              content: "";
              position: absolute;
              inset: 0;
              background:
                linear-gradient(
                  180deg,
                  rgba(20, 10, 15, 0.04) 0%,
                  rgba(20, 10, 15, 0.6) 100%
                );
            }

            .lassana-register-visual-content {
              position: absolute;
              left: 60px;
              right: 60px;
              top: 50%;
              z-index: 2;
              transform: translateY(-50%);
            }

            .lassana-register-visual-label {
              display: inline-block;
              margin-bottom: 18px;
              color: #ffffff;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 2.5px;
              text-transform: uppercase;
            }

            .lassana-register-visual-content h2 {
              max-width: 500px;
              margin: 0 0 18px;
              color: #ffffff;
              font-size: 44px;
              font-weight: 500;
              line-height: 1.2;
            }

            .lassana-register-visual-content p {
              max-width: 460px;
              margin: 0;
              color: rgba(255, 255, 255, 0.88);
              font-size: 15px;
              line-height: 1.8;
            }


            /* FORM */

            .lassana-register-form-side {
              width: 55%;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 65px 50px;
              animation: lassanaRegisterFormEnter
                0.85s cubic-bezier(.22, 1, .36, 1);
            }

            @keyframes lassanaRegisterFormEnter {
              from {
                opacity: 0;
                transform: translateX(35px);
              }

              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            .lassana-register-wrapper {
              width: 100%;
              max-width: 610px;
            }

            .lassana-register-small-title {
              margin-bottom: 12px;
              color: #ef5b78;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 2.5px;
              text-transform: uppercase;
            }

            .lassana-register-title {
              margin: 0 0 12px;
              color: #222222;
              font-size: 40px;
              font-weight: 600;
              line-height: 1.2;
            }

            .lassana-register-description {
              margin: 0 0 35px;
              color: #777777;
              font-size: 15px;
              line-height: 1.7;
            }


            /* FIELDS */

            .lassana-register-field {
              margin-bottom: 20px;
            }

            .lassana-register-label {
              display: block;
              position: static !important;
              margin: 0 0 8px !important;
              padding: 0 !important;
              color: #333333;
              font-size: 13px;
              font-weight: 600;
              line-height: 1.4;
              transform: none !important;
            }

            .lassana-register-input-wrapper {
              width: 100%;
              height: 56px;
              display: flex;
              align-items: center;
              position: relative;
              padding: 0 17px;
              border: 1px solid #e5e5e5;
              background: #fafafa;
              transition:
                border-color 0.3s ease,
                background 0.3s ease,
                box-shadow 0.3s ease;
            }

            .lassana-register-input-wrapper:focus-within {
              border-color: #ef5b78;
              background: #ffffff;
              box-shadow: 0 0 0 3px rgba(239, 91, 120, 0.08);
            }

            .lassana-register-field-icon {
              width: 19px;
              min-width: 19px;
              height: 19px;
              color: #999999;
            }


            /* IMPORTANT INPUT RESET */

            .lassana-register-page .lassana-register-input {
              flex: 1 !important;
              width: 100% !important;
              height: 54px !important;
              min-height: 54px !important;

              position: static !important;
              top: auto !important;
              left: auto !important;

              display: block !important;

              margin: 0 !important;
              padding: 0 13px !important;

              border: 0 !important;
              outline: 0 !important;

              background: transparent !important;
              box-shadow: none !important;

              color: #333333 !important;

              font-family: inherit !important;
              font-size: 14px !important;
              font-weight: 400 !important;
              font-style: normal !important;

              line-height: normal !important;
              letter-spacing: normal !important;

              text-indent: 0 !important;
              text-transform: none !important;

              transform: none !important;

              appearance: none !important;
              -webkit-appearance: none !important;
            }

            .lassana-register-page
            .lassana-register-input::placeholder {
              position: static !important;
              color: #aaaaaa !important;
              opacity: 1 !important;
              font-size: 14px !important;
              font-weight: 400 !important;
              line-height: normal !important;
              transform: none !important;
            }

            .lassana-register-page .lassana-register-input:focus {
              border: 0 !important;
              outline: 0 !important;
              box-shadow: none !important;
            }

            .lassana-register-page
            .lassana-register-input:-webkit-autofill,
            .lassana-register-page
            .lassana-register-input:-webkit-autofill:hover,
            .lassana-register-page
            .lassana-register-input:-webkit-autofill:focus {
              -webkit-text-fill-color: #333333 !important;
              -webkit-box-shadow:
                0 0 0 1000px transparent inset !important;
              transition:
                background-color 9999s ease-in-out 0s;
            }


            /* EYE */

            .lassana-register-eye {
              width: 35px;
              height: 35px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              margin: 0 !important;
              padding: 0 !important;
              border: 0 !important;
              outline: 0 !important;
              background: transparent !important;
              box-shadow: none !important;
              color: #888888;
              font-size: 18px;
              cursor: pointer;
            }

            .lassana-register-eye:hover {
              color: #ef5b78;
            }


            /* ERROR */

            .lassana-register-error {
              margin-bottom: 20px;
              padding: 13px 16px;
              border-left: 3px solid #dc3545;
              background: #fff4f5;
              color: #c73746;
              font-size: 13px;
              line-height: 1.6;
            }


            /* BUTTON */

            .lassana-register-button {
              width: 100%;
              height: 58px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              margin: 5px 0 0 !important;
              padding: 0 25px !important;
              border: none !important;
              background: #ef5b78;
              color: #ffffff;
              font-size: 14px;
              font-weight: 600;
              letter-spacing: 0.5px;
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .lassana-register-button:hover:not(:disabled) {
              background: #df4967;
              transform: translateY(-2px);
              box-shadow: 0 12px 28px rgba(239, 91, 120, 0.25);
            }

            .lassana-register-button:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }


            /* LOGIN */

            .lassana-register-login {
              margin-top: 28px;
              padding-top: 24px;
              border-top: 1px solid #eeeeee;
              text-align: center;
              color: #777777;
              font-size: 14px;
            }

            .lassana-register-link-button {
              margin: 0 0 0 6px !important;
              padding: 0 !important;
              border: 0 !important;
              outline: 0 !important;
              background: transparent !important;
              color: #ef5b78;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              transition: color 0.3s ease;
            }

            .lassana-register-link-button:hover {
              color: #df4967;
            }


            @media (max-width: 991.98px) {
              .lassana-register-visual {
                width: 38%;
              }

              .lassana-register-form-side {
                width: 62%;
                padding: 55px 30px;
              }

              .lassana-register-visual-content {
                left: 35px;
                right: 35px;
              }

              .lassana-register-visual-content h2 {
                font-size: 34px;
              }
            }


            @media (max-width: 767.98px) {
              .lassana-register-page {
                display: block;
                min-height: auto;
              }

              .lassana-register-visual {
                width: 100%;
                min-height: 300px;
              }

              .lassana-register-visual-content {
                left: 25px;
                right: 25px;
              }

              .lassana-register-visual-content h2 {
                font-size: 30px;
                margin-bottom: 10px;
              }

              .lassana-register-visual-content p {
                font-size: 13px;
                line-height: 1.6;
              }

              .lassana-register-form-side {
                width: 100%;
                padding: 50px 22px 65px;
              }

              .lassana-register-title {
                font-size: 32px;
              }
            }


            @media (prefers-reduced-motion: reduce) {
              .lassana-register-page,
              .lassana-register-visual,
              .lassana-register-form-side {
                animation: none !important;
              }
            }
          `}
        </style>


        <main
          className={`lassana-register-page ${
            isLeaving ? "is-leaving" : ""
          }`}
        >
          {/* VISUAL */}

          <section className="lassana-register-visual">
            <div className="lassana-register-visual-content">
              <span className="lassana-register-visual-label">
                Join Rose Flora
              </span>

              <h2>
                Make every special moment bloom.
              </h2>

              <p>
                Create your account to enjoy a smoother shopping
                experience and easily manage your flower orders.
              </p>
            </div>
          </section>


          {/* FORM */}

          <section className="lassana-register-form-side">
            <div className="lassana-register-wrapper">
              <div className="lassana-register-small-title">
                Create Account
              </div>

              <h1 className="lassana-register-title">
                Join Rose Flora today
              </h1>

              <p className="lassana-register-description">
                Enter your details below to create your customer account.
              </p>


              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="lassana-register-field">
                      <label
                        className="lassana-register-label"
                        htmlFor="register-first-name"
                      >
                        First Name
                      </label>

                      <div className="lassana-register-input-wrapper">
                        <FiUser className="lassana-register-field-icon" />

                        <input
                          id="register-first-name"
                          type="text"
                          name="firstName"
                          className="lassana-register-input"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleChange}
                          autoComplete="given-name"
                          required
                        />
                      </div>
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="lassana-register-field">
                      <label
                        className="lassana-register-label"
                        htmlFor="register-last-name"
                      >
                        Last Name
                      </label>

                      <div className="lassana-register-input-wrapper">
                        <FiUser className="lassana-register-field-icon" />

                        <input
                          id="register-last-name"
                          type="text"
                          name="lastName"
                          className="lassana-register-input"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleChange}
                          autoComplete="family-name"
                          required
                        />
                      </div>
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="lassana-register-field">
                      <label
                        className="lassana-register-label"
                        htmlFor="register-phone"
                      >
                        Phone Number
                      </label>

                      <div className="lassana-register-input-wrapper">
                        <FiPhone className="lassana-register-field-icon" />

                        <input
                          id="register-phone"
                          type="tel"
                          name="phone"
                          className="lassana-register-input"
                          placeholder="07X XXX XXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                          required
                        />
                      </div>
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="lassana-register-field">
                      <label
                        className="lassana-register-label"
                        htmlFor="register-email"
                      >
                        Email Address
                      </label>

                      <div className="lassana-register-input-wrapper">
                        <FiMail className="lassana-register-field-icon" />

                        <input
                          id="register-email"
                          type="email"
                          name="email"
                          className="lassana-register-input"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="lassana-register-field">
                      <label
                        className="lassana-register-label"
                        htmlFor="register-password"
                      >
                        Password
                      </label>

                      <div className="lassana-register-input-wrapper">
                        <FiLock className="lassana-register-field-icon" />

                        <input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="lassana-register-input"
                          placeholder="Create password"
                          value={formData.password}
                          onChange={handleChange}
                          autoComplete="new-password"
                          required
                        />

                        <button
                          type="button"
                          className="lassana-register-eye"
                          onClick={() =>
                            setShowPassword((current) => !current)
                          }
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="lassana-register-field">
                      <label
                        className="lassana-register-label"
                        htmlFor="register-confirm-password"
                      >
                        Confirm Password
                      </label>

                      <div className="lassana-register-input-wrapper">
                        <FiLock className="lassana-register-field-icon" />

                        <input
                          id="register-confirm-password"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          name="confirmPassword"
                          className="lassana-register-input"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          autoComplete="new-password"
                          required
                        />

                        <button
                          type="button"
                          className="lassana-register-eye"
                          onClick={() =>
                            setShowConfirmPassword(
                              (current) => !current
                            )
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <FiEyeOff />
                          ) : (
                            <FiEye />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>


                {error && (
                  <div className="lassana-register-error">
                    {error}
                  </div>
                )}


                <button
                  type="submit"
                  className="lassana-register-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Creating account..."
                  ) : (
                    <>
                      Create Account
                      <FiArrowRight />
                    </>
                  )}
                </button>


                <div className="lassana-register-login">
                  Already have an account?

                  <button
                    type="button"
                    className="lassana-register-link-button"
                    onClick={handleLoginNavigation}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </>
    </Layout>
  );
}