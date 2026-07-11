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
                "Login failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-4"
            style={{
                background:
                    "linear-gradient(135deg, #f4fff8 0%, #e8f7ee 50%, #f8fffa 100%)",
            }}
        >

            <div
                className="w-100"
                style={{
                    maxWidth: "430px",
                }}
            >

                <div
                    className="card border-0 shadow-lg overflow-hidden"
                    style={{
                        borderRadius: "20px",
                    }}
                >

                    {/* Header */}

                    <div
                        className="text-center text-white px-4 py-5"
                        style={{
                            background:
                                "linear-gradient(135deg, #198754, #0f5132)",
                        }}
                    >

                        <h2 className="fw-bold mb-1">

                            LassanaFlora

                        </h2>

                        <p className="mb-0 opacity-75">

                            Admin Management Portal

                        </p>

                    </div>


                    {/* Login Form */}

                    <div className="card-body p-4 p-sm-5">

                        <div className="mb-4">

                            <h4 className="fw-bold mb-1">

                                Welcome Back

                            </h4>

                            <p className="text-muted mb-0">

                                Sign in to continue to your dashboard.

                            </p>

                        </div>


                        {

                            error && (

                                <div
                                    className="alert alert-danger d-flex align-items-center"
                                    role="alert"
                                >

                                    <i className="fas fa-circle-exclamation me-2"></i>

                                    <span>

                                        {error}

                                    </span>

                                </div>

                            )

                        }


                        <form onSubmit={handleSubmit}>

                            {/* Email */}

                            <div className="mb-3">

                                <label className="form-label fw-semibold">

                                    Email Address

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-white">

                                        <i className="fas fa-envelope text-muted"></i>

                                    </span>

                                    <input
                                        className="form-control py-2"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div className="mb-4">

                                <label className="form-label fw-semibold">

                                    Password

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-white">

                                        <i className="fas fa-lock text-muted"></i>

                                    </span>

                                    <input
                                        className="form-control py-2"
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
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
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
                                className="btn btn-success w-100 py-2 fw-semibold"
                                disabled={loading}
                                style={{
                                    borderRadius: "10px",
                                }}
                            >

                                {

                                    loading ? (

                                        <>

                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            ></span>

                                            Logging in...

                                        </>

                                    ) : (

                                        <>

                                            <i className="fas fa-right-to-bracket me-2"></i>

                                            Sign In

                                        </>

                                    )

                                }

                            </button>

                        </form>


                        <div className="text-center mt-4">

                            <small className="text-muted">

                                Authorized administrators only

                            </small>

                        </div>

                    </div>

                </div>


                <p className="text-center text-muted small mt-4 mb-0">

                    © {new Date().getFullYear()} LassanaFlora Admin Portal

                </p>

            </div>

        </div>

    );

}

export default Login;