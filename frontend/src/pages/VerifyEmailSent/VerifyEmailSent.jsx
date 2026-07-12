import React from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

function VerifyEmailSent() {

    const { state } = useLocation();

    const email = state?.email || "";

    return (

        <Layout>

            <div
                className="container"
                style={{
                    padding: "100px 0",
                    maxWidth: "700px",
                }}
            >

                <div
                    className="card border-0 shadow-sm"
                    style={{
                        borderRadius: "12px",
                    }}
                >

                    <div
                        className="card-body text-center p-5"
                    >

                        <div
                            style={{
                                width: "90px",
                                height: "90px",
                                borderRadius: "50%",
                                background: "#e8f5e9",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "0 auto 30px",
                            }}
                        >

                            <i
                                className="fas fa-envelope"
                                style={{
                                    fontSize: "42px",
                                    color: "#2e7d32",
                                }}
                            ></i>

                        </div>

                        <h2 className="mb-3">

                            Verify Your Email

                        </h2>

                        <p
                            className="text-muted mb-4"
                            style={{
                                fontSize: "18px",
                            }}
                        >

                            Your account has been created successfully.

                        </p>

                        <p>

                            We've sent a verification email to

                        </p>

                        <h5
                            className="mb-4"
                            style={{
                                color: "#2e7d32",
                            }}
                        >

                            {email}

                        </h5>

                        <p
                            className="text-muted mb-4"
                        >

                            Please click the verification link in your email before logging into your account.

                        </p>

                        <div
                            className="alert alert-warning text-start"
                        >

                            <strong>Didn't receive the email?</strong>

                            <br />

                            • Check your Spam or Junk folder.

                            <br />

                            • Wait a few minutes.

                        </div>

                        <div className="mt-4">

                            <Link
                                to="/login"
                                className="btn theme-btn-1 btn-effect-1"
                            >

                                Go to Login

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default VerifyEmailSent;