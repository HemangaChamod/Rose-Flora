import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";

import {
    getOrder,
    updateOrderStatus,
    updatePaymentStatus,
} from "../../services/orderService";

function ViewOrder() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    const [statusLoading, setStatusLoading] =
        useState(false);

    const [paymentLoading, setPaymentLoading] =
        useState(false);

    const loadOrder = async () => {

        try {

            const res = await getOrder(id);

            setOrder(res.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load order.");

            navigate("/orders");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadOrder();

    }, [id]);

    const handleOrderStatus = async (e) => {

        const orderStatus = e.target.value;

        try {

            setStatusLoading(true);

            const res = await updateOrderStatus(
                id,
                orderStatus
            );

            setOrder((prev) => ({
                ...prev,
                orderStatus:
                    res.data.orderStatus,
            }));

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update order status."
            );

            await loadOrder();

        } finally {

            setStatusLoading(false);

        }

    };

    const handlePaymentStatus = async (e) => {

        const paymentStatus = e.target.value;

        try {

            setPaymentLoading(true);

            const res = await updatePaymentStatus(
                id,
                paymentStatus
            );

            setOrder((prev) => ({
                ...prev,
                paymentStatus:
                    res.data.paymentStatus,
            }));

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update payment status."
            );

            await loadOrder();

        } finally {

            setPaymentLoading(false);

        }

    };

    const formatPrice = (price) => {

        return Number(price || 0).toLocaleString(
            "en-LK",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        );

    };

    const formatDate = (date) => {

        return new Date(date).toLocaleString(
            "en-LK"
        );

    };

    if (loading) {

        return (

            <AdminLayout>

                <div className="text-center py-5">

                    <div className="spinner-border text-success"></div>

                    <p className="mt-3">

                        Loading order...

                    </p>

                </div>

            </AdminLayout>

        );

    }

    if (!order) return null;

    return (

        <AdminLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">

                            Order {order.orderNumber}

                        </h2>

                        <p className="text-muted mb-0">

                            Placed on {formatDate(order.createdAt)}

                        </p>

                    </div>

                    <Link
                        to="/orders"
                        className="btn btn-outline-secondary"
                    >

                        <i className="fas fa-arrow-left me-2"></i>

                        Back to Orders

                    </Link>

                </div>

                <div className="row g-4">

                    <div className="col-lg-8">

                        <div className="card border-0 shadow-sm mb-4">

                            <div className="card-header bg-white">

                                <h5 className="mb-0">

                                    Ordered Products

                                </h5>

                            </div>

                            <div className="card-body">

                                {

                                    order.items.map((item) => (

                                        <div
                                            key={item.id}
                                            className="d-flex align-items-center border-bottom py-3"
                                        >

                                            <img
                                                src={item.productImage}
                                                alt={item.productName}
                                                style={{
                                                    width: "75px",
                                                    height: "75px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px",
                                                }}
                                            />

                                            <div className="ms-3 flex-grow-1">

                                                <h6 className="fw-bold mb-1">

                                                    {item.productName}

                                                </h6>

                                                <small className="text-muted">

                                                    SKU: {item.sku}

                                                </small>

                                                <div className="mt-1">

                                                    Rs. {formatPrice(item.price)}
                                                    {" × "}
                                                    {item.quantity}

                                                </div>

                                            </div>

                                            <div className="fw-bold">

                                                Rs. {formatPrice(item.subtotal)}

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        </div>

                        <div className="card border-0 shadow-sm">

                            <div className="card-header bg-white">

                                <h5 className="mb-0">

                                    Order Summary

                                </h5>

                            </div>

                            <div className="card-body">

                                <div className="d-flex justify-content-between mb-2">

                                    <span>Subtotal</span>

                                    <span>
                                        Rs. {formatPrice(order.subtotal)}
                                    </span>

                                </div>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>Shipping</span>

                                    <span>
                                        Rs. {formatPrice(order.shippingCost)}
                                    </span>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-between">

                                    <h5 className="fw-bold">
                                        Total
                                    </h5>

                                    <h5 className="fw-bold text-success">

                                        Rs. {formatPrice(order.total)}

                                    </h5>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="card border-0 shadow-sm mb-4">

                            <div className="card-header bg-white">

                                <h5 className="mb-0">

                                    Order Management

                                </h5>

                            </div>

                            <div className="card-body">

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">

                                        Order Status

                                    </label>

                                    <select
                                        className="form-select"
                                        value={order.orderStatus}
                                        onChange={handleOrderStatus}
                                        disabled={statusLoading}
                                    >

                                        <option value="PENDING">
                                            Pending
                                        </option>

                                        <option value="PROCESSING">
                                            Processing
                                        </option>

                                        <option value="SHIPPED">
                                            Shipped
                                        </option>

                                        <option value="DELIVERED">
                                            Delivered
                                        </option>

                                    </select>

                                </div>

                                <div>

                                    <label className="form-label fw-semibold">

                                        Payment Status

                                    </label>

                                    <select
                                        className="form-select"
                                        value={order.paymentStatus}
                                        onChange={handlePaymentStatus}
                                        disabled={
                                            paymentLoading ||
                                            order.paymentMethod === "CARD"
                                        }
                                    >

                                        <option value="PENDING">
                                            Pending
                                        </option>

                                        <option value="PAID">
                                            Paid
                                        </option>

                                        <option value="FAILED">
                                            Failed
                                        </option>

                                        <option value="REFUNDED">
                                            Refunded
                                        </option>

                                    </select>

                                    {
                                        order.paymentMethod === "CARD" && (

                                            <small className="text-muted d-block mt-2">

                                                Card payment status is managed by the payment gateway.

                                            </small>

                                        )
                                    }

                                </div>

                            </div>

                        </div>

                        <div className="card border-0 shadow-sm mb-4">

                            <div className="card-header bg-white">

                                <h5 className="mb-0">

                                    Customer

                                </h5>

                            </div>

                            <div className="card-body">

                                <p className="fw-semibold mb-1">

                                    {order.customer?.firstName}{" "}
                                    {order.customer?.lastName}

                                </p>

                                <p className="text-muted mb-1">

                                    {order.shippingEmail}

                                </p>

                                <p className="text-muted mb-0">

                                    {order.shippingPhone}

                                </p>

                            </div>

                        </div>

                        <div className="card border-0 shadow-sm">

                            <div className="card-header bg-white">

                                <h5 className="mb-0">

                                    Shipping Address

                                </h5>

                            </div>

                            <div className="card-body">

                                <p className="fw-semibold mb-1">

                                    {order.shippingFirstName}{" "}
                                    {order.shippingLastName}

                                </p>

                                <p className="mb-1">

                                    {order.streetAddress}

                                </p>

                                <p className="mb-1">

                                    {order.city}

                                </p>

                                <p className="mb-1">

                                    {order.state}

                                </p>

                                <p className="mb-0">

                                    {order.zipCode}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default ViewOrder;