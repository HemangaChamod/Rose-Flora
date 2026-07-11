import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();
  const { login, user, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/account");
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        err?.response?.data?.message || "Login failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <>
        <style>{`

    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

*{
margin:0;
padding:0;
box-sizing:border-box;
}

.login-page{
width:100%;
min-height:calc(100vh - 220px);
display:flex;
justify-content:center;
align-items:center;
position:relative;
overflow:hidden;
font-family:'Inter',sans-serif;
background:url("img/bg/login-bg.png") center/cover no-repeat;
padding:30px 20px;
}

.overlay{
position:absolute;
inset:0;
background:rgba(255,255,255,.15);
}

.login-card{
position:relative;
z-index:2;
width:540px;
background:rgba(255,255,255,.97);
border-radius:14px;
padding:60px;
margin:40px auto;
box-shadow:0 25px 60px rgba(0,0,0,.18);
}

.logo-section{
display:flex;
flex-direction:column;
align-items:center;
margin-bottom:25px;
}

.flower{
font-size:30px;
color:#5d2f91;
margin-bottom:5px;
}

.logo-section h1{
font-family:'Cormorant Garamond',serif;
font-size:64px;
font-weight:600;
color:#4d2b8a;
line-height:1;
}

.logo-section h1 span{
font-weight:500;
}

.line{
width:85px;
height:1px;
background:#cfcfcf;
margin:8px 0;
}

.logo-section p{
font-size:10px;
letter-spacing:3px;
color:#666;
}

.login-card h2{
font-family:'Cormorant Garamond',serif;
font-size:54px;
font-weight:500;
text-align:center;
line-height:1.1;
color:#222;
margin-top:20px;
}

.login-card h2 span{
color:#4d2b8a;
}

.subtitle{
font-family:'Cormorant Garamond',serif;
font-size:30px;
font-style:italic;
text-align:center;
margin:15px 0 35px;
color:#666;
}

label{
display:block;
margin-bottom:10px;
font-size:13px;
font-weight:700;
letter-spacing:3px;
text-transform:uppercase;
color:#4d2b8a;
}

.input-box{
display:flex;
align-items:center;
height:58px;
border:1px solid #ddd;
border-radius:5px;
padding:0 18px;
margin-bottom:25px;
background:#fff;
}

.input-box svg{
font-size:20px;
color:#888;
}

.input-box input{
flex:1;
margin-left:15px;
border:none;
outline:none;
font-size:16px;
background:transparent;
}

.eye{
cursor:pointer;
}

.forgot{
text-align:right;
color:#4d2b8a;
font-size:15px;
margin-top:-8px;
margin-bottom:25px;
cursor:pointer;
}

.signin-btn{
width:100%;
height:58px;
border:none;
border-radius:5px;
background:#4d2b8a;
color:#fff;
font-size:18px;
letter-spacing:5px;
cursor:pointer;
transition:.3s;
}

.signin-btn:hover{
background:#40206f;
}

.google-btn{
margin-top:18px;
width:100%;
height:58px;
background:#fff;
border:1px solid #ccc;
border-radius:5px;
display:flex;
justify-content:center;
align-items:center;
gap:15px;
font-size:17px;
letter-spacing:3px;
cursor:pointer;
}

.google-btn svg{
font-size:22px;
}

.register{
margin-top:30px;
text-align:center;
font-size:17px;
color:#444;
}

.register span{
margin-left:8px;
font-weight:600;
color:#4d2b8a;
cursor:pointer;
}

.footer{
position:absolute;
bottom:25px;
left:30px;
right:30px;
display:flex;
justify-content:space-between;
font-size:13px;
color:#444;
z-index:2;
}

.links{
display:flex;
gap:15px;
}

@media(max-width:768px){

.login-page{
padding:50px 15px;
min-height:auto;
}

.login-card{
width:100%;
padding:35px 25px;
margin:20px auto;
}

.logo-section h1{
font-size:48px;
}

.login-card h2{
font-size:42px;
}

.subtitle{
font-size:24px;
}

.footer{
display:none;
}

}
        
        `}</style>

        <div className="login-page">
          <div className="overlay"></div>

          <div className="login-card">
            <form onSubmit={handleSubmit}>
              <h2>
                Welcome Back,
                <br />
                <span>Flora</span>
              </h2>

              <p className="subtitle">
                Continue your floral journey.
              </p>

              {/* Email */}
              <label>Email Address</label>

              <div className="input-box">
                <FiMail />
                <input
                  type="email"
                  name="email"
                  
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <label>Password</label>

              <div className="input-box">
                <FiLock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {showPassword ? (
                  <FiEyeOff
                    className="eye"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FiEye
                    className="eye"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <div className="forgot">
                Forgot Password?
              </div>

              {error && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "15px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                className="signin-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "SIGN IN"}
              </button>

              <button className="google-btn">
                <FcGoogle />
                SIGN IN WITH GOOGLE
              </button>

              <div className="register">
                Don't have an account?
                <Link to="/register">
                  <span>Create an Account</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    </Layout>
  );
}