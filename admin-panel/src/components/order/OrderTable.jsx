import { Link } from "react-router-dom";

function OrderTable({ orders }) {

    const formatPrice = (price) => {

        return Number(price || 0).toLocaleString(
            "en-LK",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }
        );

    };

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(
            "en-LK",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );

    };

    const getOrderStatusClass = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-warning text-dark";

            case "PROCESSING":
                return "bg-primary";

            case "SHIPPED":
                return "bg-info text-dark";

            case "DELIVERED":
                return "bg-success";

            default:
                return "bg-secondary";

        }

    };

    const getPaymentStatusClass = (status) => {

        switch (status) {

            case "PAID":
                return "bg-success";

            case "PENDING":
                return "bg-warning text-dark";

            case "FAILED":
                return "bg-danger";

            case "REFUNDED":
                return "bg-secondary";

            default:
                return "bg-secondary";

        }

    };

    if (orders.length === 0) {

        return (

            <div className="text-center py-5 px-3">

                <i
                    className="fas fa-shopping-bag text-muted mb-3"
                    style={{
                        fontSize: "45px",
                    }}
                ></i>

                <h5 className="mb-2">

                    No Orders Found

                </h5>

                <p className="text-muted mb-0">

                    Customer orders will appear here.

                </p>

            </div>

        );

    }

    return (

        <>

            {/* Mobile Order Cards */}

            <div className="d-md-none">

                <div className="row g-3">

                    {

                        orders.map((order) => (

                            <div
                                key={order.id}
                                className="col-12"
                            >

                                <div className="card border shadow-sm">

                                    <div className="card-body p-3">

                                        <div className="d-flex justify-content-between align-items-start gap-3">

                                            <div
                                                style={{
                                                    minWidth: 0,
                                                }}
                                            >

                                                <small className="text-muted d-block mb-1">

                                                    Order

                                                </small>

                                                <h6 className="fw-bold mb-1 text-break">

                                                    {order.orderNumber}

                                                </h6>

                                                <small className="text-muted">

                                                    {formatDate(order.createdAt)}

                                                </small>

                                            </div>

                                            <span
                                                className={`badge flex-shrink-0 ${getOrderStatusClass(
                                                    order.orderStatus
                                                )}`}
                                            >

                                                {order.orderStatus}

                                            </span>

                                        </div>


                                        <hr className="my-3" />


                                        <div className="mb-3">

                                            <small className="text-muted d-block mb-1">

                                                Customer

                                            </small>

                                            <div className="fw-semibold text-break">

                                                {
                                                    order.customer
                                                        ? `${order.customer.firstName} ${order.customer.lastName}`
                                                        : "Customer"
                                                }

                                            </div>

                                            <small className="text-muted">

                                                {order.shippingPhone}

                                            </small>

                                        </div>


                                        <div className="row g-3">

                                            <div className="col-6">

                                                <small className="text-muted d-block mb-1">

                                                    Payment Method

                                                </small>

                                                <span className="badge bg-light text-dark border">

                                                    {order.paymentMethod}

                                                </span>

                                            </div>

                                            <div className="col-6">

                                                <small className="text-muted d-block mb-1">

                                                    Payment Status

                                                </small>

                                                <span
                                                    className={`badge ${getPaymentStatusClass(
                                                        order.paymentStatus
                                                    )}`}
                                                >

                                                    {order.paymentStatus}

                                                </span>

                                            </div>

                                            <div className="col-6">

                                                <small className="text-muted d-block mb-1">

                                                    Order Status

                                                </small>

                                                <span
                                                    className={`badge ${getOrderStatusClass(
                                                        order.orderStatus
                                                    )}`}
                                                >

                                                    {order.orderStatus}

                                                </span>

                                            </div>

                                            <div className="col-6">

                                                <small className="text-muted d-block mb-1">

                                                    Total

                                                </small>

                                                <div className="fw-bold text-success">

                                                    Rs. {formatPrice(order.total)}

                                                </div>

                                            </div>

                                        </div>


                                        <div className="mt-4">

                                            <Link
                                                to={`/orders/${order.id}`}
                                                className="btn btn-outline-success btn-sm w-100"
                                            >

                                                <i className="fas fa-eye me-2"></i>

                                                View Order

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>


            {/* Tablet / Desktop Table */}

            <div className="d-none d-md-block table-responsive">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                        <tr>

                            <th>Order</th>

                            <th>Date</th>

                            <th>Customer</th>

                            <th>Payment</th>

                            <th>Payment Status</th>

                            <th>Order Status</th>

                            <th>Total</th>

                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map((order) => (

                                <tr key={order.id}>

                                    <td className="fw-semibold text-nowrap">

                                        {order.orderNumber}

                                    </td>

                                    <td className="text-nowrap">

                                        {formatDate(order.createdAt)}

                                    </td>

                                    <td>

                                        <div
                                            className="fw-semibold"
                                            style={{
                                                minWidth: "150px",
                                            }}
                                        >

                                            {
                                                order.customer
                                                    ? `${order.customer.firstName} ${order.customer.lastName}`
                                                    : "Customer"
                                            }

                                        </div>

                                        <small className="text-muted">

                                            {order.shippingPhone}

                                        </small>

                                    </td>

                                    <td>

                                        <span className="badge bg-light text-dark border">

                                            {order.paymentMethod}

                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${getPaymentStatusClass(
                                                order.paymentStatus
                                            )}`}
                                        >

                                            {order.paymentStatus}

                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${getOrderStatusClass(
                                                order.orderStatus
                                            )}`}
                                        >

                                            {order.orderStatus}

                                        </span>

                                    </td>

                                    <td className="fw-semibold text-success text-nowrap">

                                        Rs. {formatPrice(order.total)}

                                    </td>

                                    <td className="text-center">

                                        <Link
                                            to={`/orders/${order.id}`}
                                            className="btn btn-outline-success btn-sm text-nowrap"
                                        >

                                            <i className="fas fa-eye me-1"></i>

                                            View

                                        </Link>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default OrderTable;