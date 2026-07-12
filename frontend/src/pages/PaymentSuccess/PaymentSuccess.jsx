import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import {
  verifyCheckoutSuccess,
} from "../../services/orderService";

import {
  useCart,
} from "../../hooks/useCart";


function PaymentSuccess() {

  const [searchParams] =
    useSearchParams();


  const {
    clearCart,
  } = useCart();


  const sessionId =
    searchParams.get("session_id");


  const [order, setOrder] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  const verificationStarted =
    useRef(false);


  useEffect(() => {

    if (
      verificationStarted.current
    ) {

      return;

    }


    verificationStarted.current =
      true;


    const verifyPayment = async () => {

      try {

        setLoading(true);

        setError("");


        if (!sessionId) {

          throw new Error(
            "Payment session information is missing."
          );

        }


        const paymentData =
          await verifyCheckoutSuccess(
            sessionId
          );


        if (
          !paymentData.paymentConfirmed
        ) {

          throw new Error(
            "Unable to confirm your payment."
          );

        }


        setOrder(
          paymentData.order
        );


        clearCart();

      } catch (error) {

        console.error(
          "Unable to verify Stripe payment:",
          error
        );


        setError(

          error.response?.data?.message ||
          error.message ||
          "Unable to verify your payment."

        );

      } finally {

        setLoading(false);

      }

    };


    verifyPayment();

  }, [
    sessionId,
    clearCart,
  ]);


  if (loading) {

    return (

      <Layout>

        <div className="payment-success-loading">

          <div
            className="spinner-border text-success"
            role="status"
          ></div>


          <h4>

            Confirming Your Payment

          </h4>


          <p>

            Please wait while we verify
            your secure payment.

          </p>

        </div>

      </Layout>

    );

  }


  if (
    error ||
    !order
  ) {

    return (

      <Layout>

        <>

          <style>
            {`

              .payment-error-page {
                min-height: 600px;

                display: flex;
                align-items: center;
                justify-content: center;

                padding: 50px 20px;

                text-align: center;
              }


              .payment-error-card {
                width: 100%;
                max-width: 520px;

                padding: 45px 35px;

                background: #ffffff;

                border: 1px solid #eeeeee;

                box-shadow:
                  0 20px 60px
                  rgba(0, 0, 0, 0.08);
              }


              .payment-error-icon {
                width: 85px;
                height: 85px;

                margin:
                  0 auto 25px;

                border-radius: 50%;

                background: #fbe5ea;

                color: #ef5b78;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 34px;
              }


              .payment-error-card h3 {
                font-size: 27px;

                margin-bottom: 15px;
              }


              .payment-error-card p {
                color: #777777;

                line-height: 1.7;

                margin-bottom: 30px;
              }

            `}
          </style>


          <div className="payment-error-page">

            <div className="payment-error-card">

              <div className="payment-error-icon">

                <i className="fas fa-exclamation"></i>

              </div>


              <h3>

                Unable to Confirm Payment

              </h3>


              <p>

                {error}

              </p>


              <Link
                to="/Account"
                className="btn theme-btn-1 btn-effect-1"
              >

                View My Orders

              </Link>

            </div>

          </div>

        </>

      </Layout>

    );

  }


  return (

    <Layout>

      <>

        <style>
          {`

            .payment-success-page {
              min-height: 650px;

              display: flex;
              align-items: center;
              justify-content: center;

              padding: 60px 20px 100px;

              background: #fafafa;
            }


            .payment-success-card {
              width: 100%;
              max-width: 590px;

              background: #ffffff;

              border-radius: 18px;

              padding: 52px 48px;

              text-align: center;

              box-shadow:
                0 25px 70px
                rgba(0, 0, 0, 0.1);

              animation:
                paymentSuccessIn
                0.4s ease;
            }


            @keyframes paymentSuccessIn {

              from {
                opacity: 0;

                transform:
                  translateY(25px)
                  scale(0.97);
              }

              to {
                opacity: 1;

                transform:
                  translateY(0)
                  scale(1);
              }

            }


            .payment-success-icon {
              width: 102px;
              height: 102px;

              margin:
                0 auto 28px;

              border-radius: 50%;

              background: #e9f8ef;

              color: #28a745;

              display: flex;
              align-items: center;
              justify-content: center;

              font-size: 43px;
            }


            .payment-success-card h1 {
              font-size: 34px;

              font-weight: 600;

              color: #111111;

              margin-bottom: 18px;
            }


            .payment-success-message {
              color: #888888;

              font-size: 17px;

              line-height: 1.7;

              max-width: 440px;

              margin:
                0 auto 35px;
            }


            .payment-success-order {
              background: #f8f8f8;

              padding: 25px 20px;

              margin-bottom: 35px;
            }


            .payment-success-order span {
              display: block;

              color: #888888;

              font-size: 14px;

              margin-bottom: 8px;
            }


            .payment-success-order strong {
              display: block;

              color: #222222;

              font-size: 22px;

              word-break: break-word;
            }


            .payment-success-payment {
              display: inline-flex;

              align-items: center;

              gap: 8px;

              margin-bottom: 35px;

              padding: 9px 15px;

              border-radius: 30px;

              background: #e9f8ef;

              color: #198754;

              font-size: 14px;
              font-weight: 600;
            }


            .payment-success-actions {
              display: flex;

              gap: 15px;
            }


            .payment-success-actions a {
              flex: 1;

              min-height: 58px;

              display: flex;
              align-items: center;
              justify-content: center;

              border-radius: 6px;

              text-decoration: none;

              font-size: 15px;
              font-weight: 600;

              transition:
                all 0.3s ease;
            }


            .payment-success-shop {
              background: #f5f5f5;

              color: #333333;
            }


            .payment-success-shop:hover {
              background: #eeeeee;

              color: #333333;
            }


            .payment-success-orders {
              background: #ef5b78;

              color: #ffffff;
            }


            .payment-success-orders:hover {
              background: #df4967;

              color: #ffffff;

              transform:
                translateY(-1px);
            }


            .payment-success-loading {
              min-height: 650px;

              display: flex;
              flex-direction: column;

              align-items: center;
              justify-content: center;

              text-align: center;

              padding: 40px 20px;
            }


            .payment-success-loading h4 {
              margin-top: 25px;

              margin-bottom: 10px;
            }


            .payment-success-loading p {
              color: #777777;
            }


            @media (max-width: 575px) {

              .payment-success-card {
                padding:
                  42px 22px;
              }


              .payment-success-card h1 {
                font-size: 27px;
              }


              .payment-success-actions {
                flex-direction: column;
              }


              .payment-success-icon {
                width: 85px;
                height: 85px;

                font-size: 35px;
              }

            }

          `}
        </style>


        <div className="payment-success-page">

          <div className="payment-success-card">


            <div className="payment-success-icon">

              <i className="fas fa-check"></i>

            </div>


            <h1>

              Order Placed Successfully!

            </h1>


            <p className="payment-success-message">

              Thank you for your order.
              Your payment has been confirmed
              and your order will be prepared
              for delivery.

            </p>


            <div className="payment-success-order">

              <span>

                Order Number

              </span>


              <strong>

                {order.orderNumber}

              </strong>

            </div>

            <div className="payment-success-actions">

              <Link
                to="/Shop"
                className="payment-success-shop"
              >

                Continue Shopping

              </Link>


              <Link
                to="/Account"
                className="payment-success-orders"
              >

                View My Orders

              </Link>

            </div>

          </div>

        </div>

      </>

    </Layout>

  );

}


export default PaymentSuccess;