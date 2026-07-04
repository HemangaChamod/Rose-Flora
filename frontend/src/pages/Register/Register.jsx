import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";


import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
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

        .register-page{
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

        .register-card{
          position:relative;
          z-index:2;
          width:540px;
          background:rgba(255,255,255,.97);
          border-radius:14px;
          padding:50px;
          margin:40px auto;
          box-shadow:0 25px 60px rgba(0,0,0,.18);
        }

        .register-card h2{
          font-family:'Cormorant Garamond',serif;
          font-size:52px;
          font-weight:500;
          text-align:center;
          line-height:1.1;
          color:#222;
        }

        .register-card h2 span{
          color:#4d2b8a;
        }

        .subtitle{
          font-family:'Cormorant Garamond',serif;
          font-size:28px;
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
          margin-bottom:22px;
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

        .signup-btn{
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
          margin-top:8px;
        }

        .signup-btn:hover{
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

        .login{
          margin-top:28px;
          text-align:center;
          font-size:17px;
          color:#444;
        }

        .login span{
          margin-left:8px;
          font-weight:600;
          color:#4d2b8a;
          cursor:pointer;
        }

        @media(max-width:768px){

          .register-page{
            padding:40px 15px;
          }

          .register-card{
            width:100%;
            padding:35px 25px;
          }

          .register-card h2{
            font-size:42px;
          }

          .subtitle{
            font-size:24px;
          }

        }
        `}</style>

        <div className="register-page">
          <div className="overlay"></div>

          <div className="register-card">
            <h2>
              Welcome to
              <br />
              <span>Flora</span>
            </h2>

            <p className="subtitle">
              Create your floral account.
            </p>

            {/* Full Name */}
            <label>Full Name</label>

            <div className="input-box">
              <FiUser />
              <input
                type="text"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <label>Email Address</label>

            <div className="input-box">
              <FiMail />
              <input
                type="email"
                placeholder="flower@poetry.com"
              />
            </div>

            {/* Password */}
            <label>Password</label>

            <div className="input-box">
              <FiLock />
              <input
                type="password"
                placeholder="••••••••"
              />
              <FiEye className="eye" />
            </div>

            {/* Confirm Password */}
            <label>Confirm Password</label>

            <div className="input-box">
              <FiLock />
              <input
                type="password"
                placeholder="••••••••"
              />
              <FiEye className="eye" />
            </div>

            <button className="signup-btn">
              SIGN UP
            </button>

            <button className="google-btn">
              <FcGoogle />
              SIGN UP WITH GOOGLE
            </button>

            <div className="login">
              Already have an account?
              <Link to="/Login">
            <span>Sign In</span>
          </Link>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}