import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import {
  useCart,
} from "../../hooks/useCart";

import {
  createCODOrder,
  createCardOrder,
} from "../../services/orderService";


function Checkout() {

  const {
    cartItems,
    cartSubtotal,
    clearCart,
  } = useCart();


  const [formData, setFormData] =
    useState({

      firstName: "",
      lastName: "",
      email: "",
      phone: "",

      addressLine1: "",
      addressLine2: "",

      city: "",
      district: "",
      postalCode: "",

      orderNotes: "",

    });


  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("COD");


  const [errors, setErrors] =
    useState({});


  const [
    submitting,
    setSubmitting,
  ] = useState(false);


  const [
    placedOrder,
    setPlacedOrder,
  ] = useState(null);


  const [
    orderError,
    setOrderError,
  ] = useState("");


  const formatPrice = (price) => {

    return Number(
      price || 0
    ).toLocaleString(
      "en-LK",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );

  };


  const shipping = 0;


  const total =
    Number(cartSubtotal || 0) +
    shipping;


  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (currentData) => ({

        ...currentData,

        [name]: value,

      })
    );


    if (errors[name]) {

      setErrors(
        (currentErrors) => ({

          ...currentErrors,

          [name]: "",

        })
      );

    }

  };


  const validateForm = () => {

    const validationErrors = {};


    if (!formData.firstName.trim()) {

      validationErrors.firstName =
        "First name is required.";

    }


    if (!formData.lastName.trim()) {

      validationErrors.lastName =
        "Last name is required.";

    }


    if (!formData.email.trim()) {

      validationErrors.email =
        "Email address is required.";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {

      validationErrors.email =
        "Enter a valid email address.";

    }


    const cleanPhone =
      formData.phone.replace(
        /[\s-]/g,
        ""
      );


    if (!cleanPhone) {

      validationErrors.phone =
        "Phone number is required.";

    } else if (
      !/^(?:\+94|0)7[0-9]{8}$/.test(
        cleanPhone
      )
    ) {

      validationErrors.phone =
        "Enter a valid Sri Lankan phone number.";

    }


    if (
      !formData.addressLine1.trim()
    ) {

      validationErrors.addressLine1 =
        "Delivery address is required.";

    }


    if (!formData.city.trim()) {

      validationErrors.city =
        "City is required.";

    }


    if (!formData.district.trim()) {

      validationErrors.district =
        "District is required.";

    }


    setErrors(validationErrors);


    return (
      Object.keys(validationErrors)
        .length === 0
    );

  };


  const createOrderData = () => {

    return {

      firstName:
        formData.firstName.trim(),

      lastName:
        formData.lastName.trim(),

      email:
        formData.email.trim(),

      phone:
        formData.phone.replace(
          /[\s-]/g,
          ""
        ),

      addressLine1:
        formData.addressLine1.trim(),

      addressLine2:
        formData.addressLine2.trim(),

      city:
        formData.city.trim(),

      district:
        formData.district.trim(),

      postalCode:
        formData.postalCode.trim(),

      orderNotes:
        formData.orderNotes.trim(),

      paymentMethod,

      items: cartItems.map(
        (item) => ({

          productId: item.id,

          quantity:
            item.cartQuantity,

        })
      ),

    };

  };


  const handleSubmit = async (event) => {

    event.preventDefault();


    if (cartItems.length === 0) {

      return;

    }


    if (!validateForm()) {

      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });


      return;

    }


    try {

      setSubmitting(true);

      setOrderError("");


      const orderData =
        createOrderData();


      /* ==============================================
         CASH ON DELIVERY
      ============================================== */

      if (paymentMethod === "COD") {

        const response =
          await createCODOrder(
            orderData
          );


        const order =
          response.data;


        setPlacedOrder(order);


        clearCart();


        return;

      }


      /* ==============================================
         STRIPE HOSTED CHECKOUT
      ============================================== */

      if (paymentMethod === "CARD") {

        const response =
          await createCardOrder(
            orderData
          );


        const paymentData =
          response.data;


        const checkoutUrl =
          paymentData.checkoutUrl;


        if (!checkoutUrl) {

          throw new Error(
            "Stripe Checkout URL was not returned."
          );

        }


        /*
         * Do not clear the cart here.
         *
         * The customer has not completed payment yet.
         * Stripe webhook remains the payment source
         * of truth.
         */


        window.location.href =
          checkoutUrl;


        return;

      }

    } catch (error) {

      console.error(
        "Unable to place order:",
        error
      );


      setOrderError(

        error.response?.data?.message ||
        error.message ||
        "Unable to place your order. Please try again."

      );

    } finally {

      setSubmitting(false);

    }

  };


  if (
    cartItems.length === 0 &&
    !placedOrder
  ) {

    return (

      <Layout>

        <>

          <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4">

          </div>


          <div className="checkout-empty">

            <div className="checkout-empty-icon">

              <i className="icon-handbag" />

            </div>


            <h3>

              Your Cart is Empty

            </h3>


            <p>

              Add some flowers to your cart
              before proceeding to checkout.

            </p>


            <Link
              to="/Shop"
              className="btn theme-btn-1 btn-effect-1"
            >

              Explore Flowers

            </Link>

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

            .checkout-page {
              padding-bottom: 100px;
            }


            .checkout-section-title {
              font-size: 24px;
              margin-bottom: 35px;
              padding-bottom: 15px;
              border-bottom: 1px solid #eeeeee;
            }


            .checkout-form-box {
              border: 1px solid #eeeeee;
              padding: 40px;
              background: #ffffff;
            }


            .checkout-form-heading {
              font-size: 19px;
              margin-bottom: 20px;
            }


            .checkout-field {
              margin-bottom: 25px;
            }


            .checkout-field input,
            .checkout-field textarea {
              width: 100%;
              height: 60px;

              padding: 0 24px;

              border: 1px solid transparent;

              background: #f7f7f7;

              font-size: 16px;

              outline: none;

              transition: 0.3s;
            }


            .checkout-field textarea {
              height: 130px;

              padding-top: 20px;

              resize: vertical;
            }


            .checkout-field input:focus,
            .checkout-field textarea:focus {
              border-color: #ef5b78;
              background: #ffffff;
            }


            .checkout-field-label {
              display: block;

              font-size: 16px;
              font-weight: 600;

              margin-bottom: 12px;
            }


            .checkout-error {
              display: block;

              color: #dc3545;

              font-size: 13px;

              margin-top: 7px;
            }


            .checkout-order-box {
              background: #f8f9fa;

              border: 1px solid #eeeeee;
            }


            .checkout-order-item {
              display: flex;
              align-items: center;
              justify-content: space-between;

              gap: 20px;

              padding: 14px 16px;

              border-bottom: 1px solid #dddddd;
            }


            .checkout-order-product {
              display: flex;
              align-items: center;

              gap: 15px;

              min-width: 0;
            }


            .checkout-order-image {
              width: 65px;
              height: 65px;

              flex-shrink: 0;

              background: #ffffff;
            }


            .checkout-order-image img {
              width: 100%;
              height: 100%;

              object-fit: contain;
            }


            .checkout-order-details {
              min-width: 0;
            }


            .checkout-order-name {
              font-size: 17px;
              font-weight: 500;

              color: #222222;

              margin-bottom: 5px;
            }


            .checkout-order-quantity {
              font-size: 14px;
              color: #777777;
            }


            .checkout-order-price {
              flex-shrink: 0;

              font-size: 16px;
              font-weight: 500;

              color: #222222;
            }


            .checkout-total-row {
              display: flex;
              align-items: center;
              justify-content: space-between;

              padding: 15px 10px;

              border-bottom: 1px solid #dddddd;

              font-size: 17px;
            }


            .checkout-total-row:last-child {
              border-bottom: none;
            }


            .checkout-grand-total {
              font-weight: 700;
              font-size: 18px;
            }


            .checkout-payment {
              margin-top: 35px;
            }


            .checkout-payment-option {
              border: 1px solid #eeeeee;

              margin-bottom: 15px;

              background: #ffffff;
            }


            .checkout-payment-header {
              width: 100%;

              display: flex;
              align-items: center;

              gap: 14px;

              padding: 22px 24px;

              cursor: pointer;

              font-size: 17px;
              font-weight: 600;

              margin: 0;
            }


            .checkout-payment-header input {
              width: 17px;
              height: 17px;

              margin: 0;

              flex-shrink: 0;
            }


            .checkout-payment-content {
              padding:
                0 24px 22px 59px;

              color: #777777;

              font-size: 14px;
            }


            .stripe-hosted-notice {
              margin-top: 18px;

              padding: 18px 20px;

              background: #f8f8f8;

              border: 1px solid #eeeeee;

              border-radius: 6px;

              display: flex;

              align-items: flex-start;

              gap: 13px;
            }


            .stripe-hosted-notice i {
              color: #28a745;

              font-size: 20px;

              margin-top: 2px;
            }


            .stripe-hosted-notice strong {
              display: block;

              color: #333333;

              font-size: 14px;

              margin-bottom: 5px;
            }


            .stripe-hosted-notice span {
              color: #777777;

              font-size: 13px;

              line-height: 1.6;
            }


            .checkout-privacy-note {
              margin: 35px 0;

              color: #555555;
            }


            .checkout-place-order {
              width: 100%;
            }


            .checkout-empty {
              text-align: center;

              padding:
                50px 20px 110px;
            }


            .checkout-empty-icon {
              width: 100px;
              height: 100px;

              margin:
                0 auto 25px;

              border-radius: 50%;

              background: #fbe5ea;
              color: #ef5b78;

              display: flex;
              align-items: center;
              justify-content: center;

              font-size: 38px;
            }


            .order-success-backdrop {
              position: fixed;
              inset: 0;

              z-index: 9999;

              background:
                rgba(0, 0, 0, 0.5);

              backdrop-filter: blur(3px);

              display: flex;
              align-items: center;
              justify-content: center;

              padding: 20px;
            }


            .order-success-modal {
              width: 100%;
              max-width: 470px;

              background: #ffffff;

              border-radius: 18px;

              padding: 45px 38px;

              text-align: center;

              box-shadow:
                0 25px 70px
                rgba(0, 0, 0, 0.2);

              animation:
                orderSuccessIn
                0.3s ease;
            }


            @keyframes orderSuccessIn {

              from {
                opacity: 0;

                transform:
                  translateY(20px)
                  scale(0.96);
              }

              to {
                opacity: 1;

                transform:
                  translateY(0)
                  scale(1);
              }

            }


            .order-success-icon {
              width: 82px;
              height: 82px;

              margin:
                0 auto 22px;

              border-radius: 50%;

              background: #e9f8ef;

              color: #28a745;

              display: flex;
              align-items: center;
              justify-content: center;

              font-size: 32px;
            }


            .order-success-modal h3 {
              font-size: 26px;

              margin-bottom: 12px;
            }


            .order-success-modal p {
              color: #777777;

              font-size: 15px;

              line-height: 1.7;

              margin-bottom: 25px;
            }


            .order-success-number {
              background: #f8f8f8;

              padding: 17px 20px;

              margin-bottom: 28px;

              display: flex;
              flex-direction: column;

              gap: 5px;
            }


            .order-success-number span {
              color: #777777;

              font-size: 13px;
            }


            .order-success-number strong {
              color: #222222;

              font-size: 18px;
            }


            .order-success-actions {
              display: flex;

              gap: 12px;
            }


            .order-success-actions a {
              flex: 1;

              min-height: 50px;

              display: flex;
              align-items: center;
              justify-content: center;

              text-decoration: none;

              font-size: 14px;
              font-weight: 600;

              border-radius: 5px;
            }


            .order-success-shop {
              background: #f5f5f5;

              color: #333333;
            }


            .order-success-shop:hover {
              color: #333333;

              background: #eeeeee;
            }


            .order-success-orders {
              background: #ef5b78;

              color: #ffffff;
            }


            .order-success-orders:hover {
              background: #df4967;

              color: #ffffff;
            }


            @media (max-width: 575px) {

              .order-success-modal {
                padding:
                  38px 22px 28px;
              }


              .order-success-actions {
                flex-direction: column;
              }

            }


            @media (max-width: 991px) {

              .checkout-order-column {
                margin-top: 50px;
              }

            }


            @media (max-width: 767px) {

              .checkout-form-box {
                padding: 25px 20px;
              }


              .checkout-order-item {
                padding: 12px;
              }


              .checkout-order-image {
                width: 55px;
                height: 55px;
              }


              .checkout-order-name {
                font-size: 15px;
              }


              .checkout-order-price {
                font-size: 14px;
              }

            }

          `}
        </style>


        <div className="ltn__breadcrumb-area ltn__breadcrumb-area-4">

        </div>


        <div className="checkout-page">

          <div className="container">

            <form onSubmit={handleSubmit}>

              <div className="row">


                {/* LEFT SIDE */}

                <div className="col-lg-7">

                  <h4 className="checkout-section-title">

                    Billing & Delivery Details

                  </h4>


                  <div className="checkout-form-box">

                    <h5 className="checkout-form-heading">

                      Personal Information

                    </h5>


                    <div className="row">


                      <div className="col-md-6">

                        <div className="checkout-field">

                          <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                          />


                          {errors.firstName && (

                            <span className="checkout-error">

                              {errors.firstName}

                            </span>

                          )}

                        </div>

                      </div>


                      <div className="col-md-6">

                        <div className="checkout-field">

                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                          />


                          {errors.lastName && (

                            <span className="checkout-error">

                              {errors.lastName}

                            </span>

                          )}

                        </div>

                      </div>


                      <div className="col-md-6">

                        <div className="checkout-field">

                          <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                          />


                          {errors.email && (

                            <span className="checkout-error">

                              {errors.email}

                            </span>

                          )}

                        </div>

                      </div>


                      <div className="col-md-6">

                        <div className="checkout-field">

                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={handleChange}
                          />


                          {errors.phone && (

                            <span className="checkout-error">

                              {errors.phone}

                            </span>

                          )}

                        </div>

                      </div>

                    </div>


                    <h5 className="checkout-form-heading">

                      Delivery Address

                    </h5>


                    <div className="checkout-field">

                      <input
                        type="text"
                        name="addressLine1"
                        placeholder="House number and street name"
                        value={formData.addressLine1}
                        onChange={handleChange}
                      />


                      {errors.addressLine1 && (

                        <span className="checkout-error">

                          {errors.addressLine1}

                        </span>

                      )}

                    </div>


                    <div className="checkout-field">

                      <input
                        type="text"
                        name="addressLine2"
                        placeholder="Apartment, suite or unit (optional)"
                        value={formData.addressLine2}
                        onChange={handleChange}
                      />

                    </div>


                    <div className="row">


                      <div className="col-md-4">

                        <label className="checkout-field-label">

                          Town / City

                        </label>


                        <div className="checkout-field">

                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                          />


                          {errors.city && (

                            <span className="checkout-error">

                              {errors.city}

                            </span>

                          )}

                        </div>

                      </div>


                      <div className="col-md-4">

                        <label className="checkout-field-label">

                          District

                        </label>


                        <div className="checkout-field">

                          <input
                            type="text"
                            name="district"
                            placeholder="District"
                            value={formData.district}
                            onChange={handleChange}
                          />


                          {errors.district && (

                            <span className="checkout-error">

                              {errors.district}

                            </span>

                          )}

                        </div>

                      </div>


                      <div className="col-md-4">

                        <label className="checkout-field-label">

                          Postal Code

                        </label>


                        <div className="checkout-field">

                          <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal code"
                            value={formData.postalCode}
                            onChange={handleChange}
                          />

                        </div>

                      </div>

                    </div>


                    <label className="checkout-field-label">

                      Order Notes (optional)

                    </label>


                    <div className="checkout-field">

                      <textarea
                        name="orderNotes"
                        placeholder="Special notes for flower preparation or delivery."
                        value={formData.orderNotes}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="col-lg-5 checkout-order-column">

                  <h4 className="checkout-section-title">

                    Your Order

                  </h4>


                  <div className="checkout-order-box">


                    {cartItems.map(
                      (item) => {

                        const price =
                          Number(
                            item.salePrice ||
                            item.regularPrice ||
                            0
                          );


                        const itemSubtotal =
                          price *
                          item.cartQuantity;


                        return (

                          <div
                            className="checkout-order-item"
                            key={item.id}
                          >

                            <div className="checkout-order-product">

                              <div className="checkout-order-image">

                                <img
                                  src={
                                    item.imageUrl ||
                                    "/img/product/1.png"
                                  }
                                  alt={item.name}
                                />

                              </div>


                              <div className="checkout-order-details">

                                <div className="checkout-order-name">

                                  {item.name}

                                </div>


                                <div className="checkout-order-quantity">

                                  Qty: {item.cartQuantity}

                                </div>

                              </div>

                            </div>


                            <div className="checkout-order-price">

                              Rs.{" "}

                              {formatPrice(
                                itemSubtotal
                              )}

                            </div>

                          </div>

                        );

                      }
                    )}


                    <div className="checkout-total-row">

                      <span>

                        Subtotal

                      </span>


                      <span>

                        Rs.{" "}

                        {formatPrice(
                          cartSubtotal
                        )}

                      </span>

                    </div>


                    <div className="checkout-total-row">

                      <span>

                        Delivery

                      </span>


                      <span>

                        Free

                      </span>

                    </div>


                    <div className="checkout-total-row checkout-grand-total">

                      <span>

                        Order Total

                      </span>


                      <span>

                        Rs.{" "}

                        {formatPrice(total)}

                      </span>

                    </div>

                  </div>


                  {/* PAYMENT */}

                  <div className="checkout-payment">

                    <h4 className="checkout-section-title">

                      Payment Method

                    </h4>


                    <div className="checkout-payment-option">

                      <label className="checkout-payment-header">

                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          checked={
                            paymentMethod === "COD"
                          }
                          onChange={(event) => {

                            setPaymentMethod(
                              event.target.value
                            );

                            setOrderError("");

                          }}
                        />


                        <span>

                          Cash on Delivery

                        </span>

                      </label>


                      {paymentMethod === "COD" && (

                        <div className="checkout-payment-content">

                          Pay with cash when your
                          flowers are delivered.

                        </div>

                      )}

                    </div>


                    <div className="checkout-payment-option">

                      <label className="checkout-payment-header">

                        <input
                          type="radio"
                          name="paymentMethod"
                          value="CARD"
                          checked={
                            paymentMethod === "CARD"
                          }
                          onChange={(event) => {

                            setPaymentMethod(
                              event.target.value
                            );

                            setOrderError("");

                          }}
                        />


                        <span>

                          Card Payment

                        </span>

                      </label>


                      {paymentMethod === "CARD" && (

                        <div className="checkout-payment-content">

                          <p>

                            Pay securely through
                            Stripe Checkout.

                          </p>


                          <div className="stripe-hosted-notice">

                            <i className="fas fa-lock"></i>


                            <div>

                              <strong>

                                Secure Stripe Checkout

                              </strong>


                              <span>

                                You will be redirected
                                to Stripe's secure
                                payment page to enter
                                your card details and
                                complete your payment.

                              </span>

                            </div>

                          </div>

                        </div>

                      )}

                    </div>


                    <p className="checkout-privacy-note">

                      Your information will only be
                      used to process and deliver
                      your order.

                    </p>


                    {orderError && (

                      <div
                        className="alert alert-danger"
                        role="alert"
                      >

                        {orderError}

                      </div>

                    )}


                    <button
                      type="submit"
                      className="btn theme-btn-1 btn-effect-1 text-uppercase checkout-place-order"
                      disabled={submitting}
                    >

                      {submitting
                        ? paymentMethod === "CARD"
                          ? "Redirecting to Stripe..."
                          : "Processing..."
                        : paymentMethod === "CARD"
                        ? "Continue to Secure Payment"
                        : "Place Order"}

                    </button>

                  </div>

                </div>

              </div>

            </form>

          </div>

        </div>


        {/* COD ORDER SUCCESS MODAL */}

        {placedOrder && (

          <div className="order-success-backdrop">

            <div className="order-success-modal">

              <div className="order-success-icon">

                <i className="fas fa-check"></i>

              </div>


              <h3>

                Order Placed Successfully!

              </h3>


              <p>

                Thank you for your order.
                Your flowers will be prepared
                for delivery.

              </p>


              <div className="order-success-number">

                <span>

                  Order Number

                </span>


                <strong>

                  {placedOrder.orderNumber}

                </strong>

              </div>


              <div className="order-success-actions">

                <Link
                  to="/Shop"
                  className="order-success-shop"
                >

                  Continue Shopping

                </Link>


                <Link
                  to="/Account"
                  className="order-success-orders"
                >

                  View My Orders

                </Link>

              </div>

            </div>

          </div>

        )}

      </>

    </Layout>

  );

}


export default Checkout;