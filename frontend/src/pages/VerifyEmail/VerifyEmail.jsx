import { useEffect, useRef, useState } from "react";

import {
    Link,
    useSearchParams,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import api from "../../services/api";

function VerifyEmail() {

    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);

    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");

    const hasVerified = useRef(false);

    useEffect(() => {

    if (hasVerified.current) return;

    hasVerified.current = true;

    const verify = async () => {

        const token = searchParams.get("token");

        if (!token) {

            setLoading(false);

            setSuccess(false);

            setMessage("Verification token is missing.");

            return;

        }

        try {

            const response = await api.get(

                `/auth/verify-email?token=${token}`

            );

            setSuccess(true);

            setMessage(response.data.message);

        } catch (error) {

            setSuccess(false);

            setMessage(

                error.response?.data?.message ||

                "Email verification failed."

            );

        } finally {

            setLoading(false);

        }

    };

    verify();

}, [searchParams]);

    return (

        <Layout>

            <div
                className="container"
                style={{
                    maxWidth: "700px",
                    padding: "100px 0",
                }}
            >

                <div className="card shadow-sm border-0">

                    <div className="card-body text-center p-5">

                        {

                            loading && (

                                <>

                                    <div
                                        className="spinner-border text-success mb-4"
                                        role="status"
                                    />

                                    <h3>

                                        Verifying your email...

                                    </h3>

                                </>

                            )

                        }

                        {

                            !loading && success && (

                                <>

                                    <div
                                        style={{
                                            fontSize: "80px",
                                            color: "#28a745",
                                        }}
                                    >

                                        <i className="fas fa-check-circle"></i>

                                    </div>

                                    <h2 className="mt-4">

                                        Email Verified

                                    </h2>

                                    <p
                                        className="mt-3 text-muted"
                                    >

                                        {message}

                                    </p>

                                    <Link
                                        to="/login"
                                        className="btn theme-btn-1 btn-effect-1 mt-4"
                                    >

                                        Login

                                    </Link>

                                </>

                            )

                        }

                        {

                            !loading && !success && (

                                <>

                                    <div
                                        style={{
                                            fontSize: "80px",
                                            color: "#dc3545",
                                        }}
                                    >

                                        <i className="fas fa-times-circle"></i>

                                    </div>

                                    <h2 className="mt-4">

                                        Verification Failed

                                    </h2>

                                    <p
                                        className="mt-3 text-muted"
                                    >

                                        {message}

                                    </p>

                                    <Link
                                        to="/register"
                                        className="btn theme-btn-1 btn-effect-1 mt-4"
                                    >

                                        Register Again

                                    </Link>

                                </>

                            )

                        }

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default VerifyEmail;