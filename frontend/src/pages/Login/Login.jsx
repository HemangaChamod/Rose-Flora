import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../hooks/useAuth";


export default function Login() {
  const navigate = useNavigate();

  const {
    login,
    user,
    loading,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);


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


  const handleRegisterNavigation = () => {
    setIsLeaving(true);

    setTimeout(() => {
      navigate("/register");
    }, 420);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setIsSubmitting(true);

      await login(formData);

      navigate("/account");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to sign in. Please check your details."
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
            .lassana-login-page,
            .lassana-login-page * {
              box-sizing: border-box;
            }

            .lassana-login-page {
              min-height: 720px;
              display: flex;
              align-items: stretch;
              overflow: hidden;
              background: #ffffff;
              animation: lassanaLoginEnter 0.7s cubic-bezier(.22, 1, .36, 1);
            }

            .lassana-login-page.is-leaving {
              animation: lassanaLoginLeave 0.42s ease forwards;
              pointer-events: none;
            }

            @keyframes lassanaLoginEnter {
              from {
                opacity: 0;
                transform: translateY(18px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes lassanaLoginLeave {
              from {
                opacity: 1;
                transform: translateY(0);
              }

              to {
                opacity: 0;
                transform: translateY(-12px);
              }
            }


            /* VISUAL SIDE */

            .lassana-login-visual {
              width: 50%;
              min-height: 720px;
              position: relative;
              overflow: hidden;
              background:
                url("/img/bg/login-bg.webp")
                center center / cover no-repeat;
              animation: lassanaVisualEnter 0.9s cubic-bezier(.22, 1, .36, 1);
            }

            @keyframes lassanaVisualEnter {
              from {
                opacity: 0;
                transform: translateX(-40px) scale(1.03);
              }

              to {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }

            .lassana-login-visual::after {
              content: "";
              position: absolute;
              inset: 0;
              background:
                linear-gradient(
                  180deg,
                  rgba(20, 10, 15, 0.05) 0%,
                  rgba(20, 10, 15, 0.58) 100%
                );
            }

            .lassana-login-visual-content {
              position: absolute;
              left: 65px;
              right: 65px;
              top: 50%;
              z-index: 2;
              color: #ffffff;
              transform: translateY(-50%);
            }

            .lassana-login-visual-label {
              display: inline-block;
              margin-bottom: 18px;
              color: #ffffff;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 2.5px;
              text-transform: uppercase;
            }

            .lassana-login-visual-content h2 {
              max-width: 520px;
              margin: 0 0 18px;
              color: #ffffff;
              font-size: 46px;
              font-weight: 500;
              line-height: 1.2;
            }

            .lassana-login-visual-content p {
              max-width: 470px;
              margin: 0;
              color: rgba(255, 255, 255, 0.88);
              font-size: 15px;
              line-height: 1.8;
            }


            /* FORM SIDE */

            .lassana-login-form-side {
              width: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 70px 50px;
              animation: lassanaFormEnter 0.85s cubic-bezier(.22, 1, .36, 1);
            }

            @keyframes lassanaFormEnter {
              from {
                opacity: 0;
                transform: translateX(35px);
              }

              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            .lassana-login-form-wrapper {
              width: 100%;
              max-width: 470px;
            }

            .lassana-login-small-title {
              margin-bottom: 12px;
              color: #ef5b78;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 2.5px;
              text-transform: uppercase;
            }

            .lassana-login-title {
              margin: 0 0 12px;
              color: #222222;
              font-size: 40px;
              font-weight: 600;
              line-height: 1.2;
            }

            .lassana-login-description {
              margin: 0 0 38px;
              color: #777777;
              font-size: 15px;
              line-height: 1.7;
            }


            /* FIELDS */

            .lassana-auth-field {
              margin-bottom: 22px;
            }

            .lassana-auth-label {
              display: block;
              position: static !important;
              margin: 0 0 9px !important;
              padding: 0 !important;
              color: #333333;
              font-size: 13px;
              font-weight: 600;
              line-height: 1.4;
              transform: none !important;
            }

            .lassana-auth-input-wrapper {
              width: 100%;
              height: 58px;
              display: flex;
              align-items: center;
              position: relative;
              padding: 0 18px;
              border: 1px solid #e5e5e5;
              background: #fafafa;
              transition:
                border-color 0.3s ease,
                background 0.3s ease,
                box-shadow 0.3s ease;
            }

            .lassana-auth-input-wrapper:focus-within {
              border-color: #ef5b78;
              background: #ffffff;
              box-shadow: 0 0 0 3px rgba(239, 91, 120, 0.08);
            }

            .lassana-auth-field-icon {
              width: 20px;
              min-width: 20px;
              height: 20px;
              color: #999999;
            }


            /* IMPORTANT INPUT RESET */

            .lassana-login-page .lassana-auth-input {
              flex: 1 !important;
              width: 100% !important;
              height: 56px !important;
              min-height: 56px !important;

              position: static !important;
              top: auto !important;
              left: auto !important;

              display: block !important;

              margin: 0 !important;
              padding: 0 14px !important;

              border: 0 !important;
              outline: 0 !important;

              background: transparent !important;
              box-shadow: none !important;

              color: #333333 !important;

              font-family: inherit !important;
              font-size: 15px !important;
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

            .lassana-login-page .lassana-auth-input::placeholder {
              position: static !important;
              color: #aaaaaa !important;
              opacity: 1 !important;
              font-size: 15px !important;
              font-weight: 400 !important;
              line-height: normal !important;
              transform: none !important;
            }

            .lassana-login-page .lassana-auth-input:focus {
              border: 0 !important;
              outline: 0 !important;
              box-shadow: none !important;
            }

            .lassana-login-page .lassana-auth-input:-webkit-autofill,
            .lassana-login-page .lassana-auth-input:-webkit-autofill:hover,
            .lassana-login-page .lassana-auth-input:-webkit-autofill:focus {
              -webkit-text-fill-color: #333333 !important;
              -webkit-box-shadow:
                0 0 0 1000px transparent inset !important;
              transition:
                background-color 9999s ease-in-out 0s;
            }


            /* PASSWORD EYE */

            .lassana-auth-eye {
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
              font-size: 19px;
              cursor: pointer;
            }

            .lassana-auth-eye:hover {
              color: #ef5b78;
            }


            /* ERROR */

            .lassana-auth-error {
              margin-bottom: 22px;
              padding: 13px 16px;
              border-left: 3px solid #dc3545;
              background: #fff4f5;
              color: #c73746;
              font-size: 13px;
              line-height: 1.6;
            }


            /* BUTTON */

            .lassana-login-button {
              width: 100%;
              height: 58px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              margin: 0 !important;
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

            .lassana-login-button:hover:not(:disabled) {
              background: #df4967;
              transform: translateY(-2px);
              box-shadow: 0 12px 28px rgba(239, 91, 120, 0.25);
            }

            .lassana-login-button:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }


            /* REGISTER LINK */

            .lassana-login-register {
              margin-top: 30px;
              padding-top: 25px;
              border-top: 1px solid #eeeeee;
              text-align: center;
              color: #777777;
              font-size: 14px;
            }

            .lassana-auth-link-button {
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

            .lassana-auth-link-button:hover {
              color: #df4967;
            }


            @media (max-width: 991.98px) {
              .lassana-login-page {
                min-height: auto;
              }

              .lassana-login-visual {
                width: 42%;
              }

              .lassana-login-form-side {
                width: 58%;
                padding: 60px 35px;
              }

              .lassana-login-visual-content {
                left: 35px;
                right: 35px;
              }

              .lassana-login-visual-content h2 {
                font-size: 36px;
              }
            }


            @media (max-width: 767.98px) {
              .lassana-login-page {
                display: block;
              }

              .lassana-login-visual {
                width: 100%;
                min-height: 300px;
              }

              .lassana-login-visual-content {
                left: 25px;
                right: 25px;
              }

              .lassana-login-visual-content h2 {
                font-size: 30px;
                margin-bottom: 10px;
              }

              .lassana-login-visual-content p {
                font-size: 13px;
                line-height: 1.6;
              }

              .lassana-login-form-side {
                width: 100%;
                padding: 50px 22px 65px;
              }

              .lassana-login-title {
                font-size: 32px;
              }

              .lassana-login-description {
                margin-bottom: 30px;
              }
            }


            @media (prefers-reduced-motion: reduce) {
              .lassana-login-page,
              .lassana-login-visual,
              .lassana-login-form-side {
                animation: none !important;
              }
            }
          `}
        </style>


        <main
          className={`lassana-login-page ${
            isLeaving ? "is-leaving" : ""
          }`}
        >
          {/* VISUAL */}

          <section className="lassana-login-visual">
            <div className="lassana-login-visual-content">
              <span className="lassana-login-visual-label">
                Welcome to Rose Flora
              </span>

              <h2>
                Beautiful flowers for life's special moments.
              </h2>

              <p>
                Sign in to continue shopping, manage your orders,
                and discover flowers made for every occasion.
              </p>
            </div>
          </section>


          {/* LOGIN */}

          <section className="lassana-login-form-side">
            <div className="lassana-login-form-wrapper">
              <div className="lassana-login-small-title">
                My Account
              </div>

              <h1 className="lassana-login-title">
                Welcome back
              </h1>

              <p className="lassana-login-description">
                Enter your account details to continue to Rose Flora.
              </p>


              <form onSubmit={handleSubmit}>
                <div className="lassana-auth-field">
                  <label
                    className="lassana-auth-label"
                    htmlFor="login-email"
                  >
                    Email Address
                  </label>

                  <div className="lassana-auth-input-wrapper">
                    <FiMail className="lassana-auth-field-icon" />

                    <input
                      id="login-email"
                      type="email"
                      name="email"
                      className="lassana-auth-input"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>


                <div className="lassana-auth-field">
                  <label
                    className="lassana-auth-label"
                    htmlFor="login-password"
                  >
                    Password
                  </label>

                  <div className="lassana-auth-input-wrapper">
                    <FiLock className="lassana-auth-field-icon" />

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="lassana-auth-input"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      className="lassana-auth-eye"
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


                {error && (
                  <div className="lassana-auth-error">
                    {error}
                  </div>
                )}


                <button
                  type="submit"
                  className="lassana-login-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight />
                    </>
                  )}
                </button>


                <div className="lassana-login-register">
                  New to Rose Flora?

                  <button
                    type="button"
                    className="lassana-auth-link-button"
                    onClick={handleRegisterNavigation}
                  >
                    Create an account
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