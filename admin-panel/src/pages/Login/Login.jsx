import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (error) {
            setError("");
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            await login(form);

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to sign in. Please check your credentials."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: `
                    radial-gradient(
                        circle at 10% 10%,
                        rgba(233, 83, 115, 0.14),
                        transparent 32%
                    ),
                    radial-gradient(
                        circle at 90% 90%,
                        rgba(233, 83, 115, 0.1),
                        transparent 30%
                    ),
                    linear-gradient(
                        135deg,
                        #fffafb 0%,
                        #ffffff 50%,
                        #fff5f7 100%
                    )
                `,
                padding: "32px 20px",
                position: "relative",
                overflow: "hidden",
            }}
        >

            {/* Decorative Background */}

            <div
                style={{
                    position: "absolute",
                    width: "320px",
                    height: "320px",
                    borderRadius: "50%",
                    background: "rgba(233, 83, 115, 0.06)",
                    top: "-150px",
                    right: "-100px",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    border: "1px solid rgba(233, 83, 115, 0.12)",
                    bottom: "-120px",
                    left: "-80px",
                    pointerEvents: "none",
                }}
            />


            <div
                className="w-100"
                style={{
                    maxWidth: "470px",
                    position: "relative",
                    zIndex: 1,
                }}
            >

                {/* Brand */}

                <div className="text-center mb-4">

                   
                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#1f1f1f",
                            letterSpacing: "-0.7px",
                        }}
                    >

                        LassanaFlora

                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#8b8b8b",
                            fontSize: "14px",
                        }}
                    >

                        Administration Portal

                    </p>

                </div>


                {/* Login Card */}

                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.96)",
                        borderRadius: "24px",
                        border: "1px solid rgba(0, 0, 0, 0.06)",
                        boxShadow:
                            "0 25px 70px rgba(42, 27, 31, 0.1)",
                        overflow: "hidden",
                    }}
                >

                    {/* Accent Line */}

                    <div
                        style={{
                            height: "4px",
                            background:
                                "linear-gradient(90deg, #f58aa1, #e95373, #d94364)",
                        }}
                    />


                    <div
                        style={{
                            padding: "42px",
                        }}
                    >

                        {/* Heading */}

                        <div className="mb-4">

                            <h3
                                className="fw-bold mb-2"
                                style={{
                                    color: "#1d1d1f",
                                    letterSpacing: "-0.5px",
                                }}
                            >

                                Welcome back

                            </h3>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#8a8a8a",
                                    fontSize: "15px",
                                }}
                            >

                                Sign in securely to manage LassanaFlora.

                            </p>

                        </div>


                        {/* Error */}

                        {

                            error && (

                                <div
                                    className="d-flex align-items-start mb-4"
                                    role="alert"
                                    style={{
                                        background: "#fff2f4",
                                        border: "1px solid #ffd5dd",
                                        borderLeft: "4px solid #e95373",
                                        borderRadius: "10px",
                                        padding: "14px 16px",
                                        color: "#b42343",
                                        fontSize: "14px",
                                    }}
                                >

                                    <i
                                        className="fas fa-circle-exclamation me-3 mt-1"
                                    ></i>

                                    <span>

                                        {error}

                                    </span>

                                </div>

                            )

                        }


                        <form onSubmit={handleSubmit}>

                            {/* Email */}

                            <div className="mb-4">

                                <label
                                    htmlFor="admin-email"
                                    className="form-label fw-semibold"
                                    style={{
                                        color: "#333333",
                                        fontSize: "14px",
                                    }}
                                >

                                    Email Address

                                </label>

                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        height: "56px",
                                        border: "1px solid #e2e2e2",
                                        borderRadius: "12px",
                                        background: "#fafafa",
                                        overflow: "hidden",
                                    }}
                                >

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "55px",
                                            color: "#a2a2a2",
                                        }}
                                    >

                                        <i className="fas fa-envelope"></i>

                                    </div>

                                    <input
                                        id="admin-email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="admin@lassanaflora.com"
                                        autoComplete="email"
                                        required
                                        style={{
                                            flex: 1,
                                            height: "100%",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            padding: "0 16px 0 0",
                                            color: "#242424",
                                            fontSize: "15px",
                                        }}
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div className="mb-4">

                                <label
                                    htmlFor="admin-password"
                                    className="form-label fw-semibold"
                                    style={{
                                        color: "#333333",
                                        fontSize: "14px",
                                    }}
                                >

                                    Password

                                </label>

                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        height: "56px",
                                        border: "1px solid #e2e2e2",
                                        borderRadius: "12px",
                                        background: "#fafafa",
                                        overflow: "hidden",
                                    }}
                                >

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "55px",
                                            color: "#a2a2a2",
                                        }}
                                    >

                                        <i className="fas fa-lock"></i>

                                    </div>

                                    <input
                                        id="admin-password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                        style={{
                                            flex: 1,
                                            height: "100%",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#242424",
                                            fontSize: "15px",
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        style={{
                                            width: "55px",
                                            height: "100%",
                                            border: "none",
                                            background: "transparent",
                                            color: "#999999",
                                            cursor: "pointer",
                                        }}
                                    >

                                        <i
                                            className={
                                                showPassword
                                                    ? "fas fa-eye-slash"
                                                    : "fas fa-eye"
                                            }
                                        ></i>

                                    </button>

                                </div>

                            </div>


                            {/* Login Button */}

                            <button
                                type="submit"
                                className="w-100 border-0 text-white fw-semibold"
                                disabled={loading}
                                style={{
                                    height: "56px",
                                    borderRadius: "12px",
                                    background: loading
                                        ? "#ef8da2"
                                        : "linear-gradient(135deg, #f26684, #e95373)",
                                    boxShadow: loading
                                        ? "none"
                                        : "0 12px 28px rgba(233, 83, 115, 0.28)",
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                    cursor: loading
                                        ? "not-allowed"
                                        : "pointer",
                                    transition: "all 0.25s ease",
                                }}
                            >

                                {

                                    loading ? (

                                        <>

                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            ></span>

                                            Signing in...

                                        </>

                                    ) : (

                                        <>

                                            Sign In to Dashboard

                                            <i className="fas fa-arrow-right ms-2"></i>

                                        </>

                                    )

                                }

                            </button>

                        </form>


                        {/* Security */}

                        <div
                            className="d-flex align-items-center justify-content-center mt-4"
                            style={{
                                color: "#999999",
                                fontSize: "13px",
                            }}
                        >

                            <i
                                className="fas fa-shield-halved me-2"
                                style={{
                                    color: "#e95373",
                                }}
                            ></i>

                            Secure access for authorized administrators only

                        </div>

                    </div>

                </div>


                {/* Footer */}

                <p
                    className="text-center mb-0 mt-4"
                    style={{
                        color: "#a0a0a0",
                        fontSize: "13px",
                    }}
                >

                    © {new Date().getFullYear()} LassanaFlora

                    <span className="mx-2">•</span>

                    Admin Management System

                </p>

            </div>

        </div>

    );

}

export default Login;