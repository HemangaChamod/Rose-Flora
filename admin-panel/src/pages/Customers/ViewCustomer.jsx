import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";

import {
    getCustomer,
} from "../../services/customerService";

function ViewCustomer() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadCustomer();

    }, [id]);

    const loadCustomer = async () => {

        try {

            const res = await getCustomer(id);

            setCustomer(res.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load customer.");

            navigate("/customers");

        } finally {

            setLoading(false);

        }

    };

    const formatPrice = (price) => {

        return Number(price || 0).toLocaleString(
            "en-LK"
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

    if (loading) {

        return (

            <AdminLayout>

                <div className="text-center py-5">

                    <div className="spinner-border text-success"></div>

                    <p className="mt-3">

                        Loading customer...

                    </p>

                </div>

            </AdminLayout>

        );

    }

    if (!customer) return null;

    const totalSpent = customer.orders.reduce(
        (sum, order) =>
            sum + Number(order.total),
        0
    );

    return (

        <AdminLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">

                            Customer Details

                        </h2>

                        <p className="text-muted mb-0">

                            View customer information and order history.

                        </p>

                    </div>

                    <Link
                        to="/customers"
                        className="btn btn-outline-secondary"
                    >

                        <i className="fas fa-arrow-left me-2"></i>

                        Back

                    </Link>

                </div>

                <div className="row g-4 mb-4">

                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body text-center">

                                <div
                                    className="rounded-circle bg-success text-white mx-auto mb-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        fontSize: "36px",
                                        fontWeight: "bold",
                                    }}
                                >

                                    {customer.firstName?.charAt(0)}

                                </div>

                                <h4 className="fw-bold">

                                    {customer.firstName}{" "}
                                    {customer.lastName}

                                </h4>

                                <p className="text-muted mb-1">

                                    {customer.email}

                                </p>

                                <p className="text-muted">

                                    {customer.phone}

                                </p>

                                <span className="badge bg-success">

                                    Customer

                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body d-flex align-items-center justify-content-between">

                                <div>

                                    <p className="text-muted mb-1">

                                        Total Orders

                                    </p>

                                    <h2 className="fw-bold mb-0">

                                        {customer.orders.length}

                                    </h2>

                                </div>

                                <i
                                    className="fas fa-shopping-bag text-primary"
                                    style={{
                                        fontSize: "45px",
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body d-flex align-items-center justify-content-between">

                                <div>

                                    <p className="text-muted mb-1">

                                        Total Spent

                                    </p>

                                    <h3 className="fw-bold text-success mb-0">

                                        Rs. {formatPrice(totalSpent)}

                                    </h3>

                                </div>

                                <i
                                    className="fas fa-money-bill-wave text-success"
                                    style={{
                                        fontSize: "45px",
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card border-0 shadow-sm">

                    <div className="card-header bg-white">

                        <h5 className="mb-0">

                            Order History

                        </h5>

                    </div>

                    <div className="card-body">

                        {

                            customer.orders.length === 0 ? (

                                <div className="text-center py-5 text-muted">

                                    <i
                                        className="fas fa-shopping-cart mb-3"
                                        style={{
                                            fontSize: "45px",
                                        }}
                                    ></i>

                                    <h5>

                                        No Orders Yet

                                    </h5>

                                    <p className="mb-0">

                                        This customer has not placed any orders.

                                    </p>

                                </div>

                            ) : (

                                <div className="table-responsive">

                                    <table className="table table-hover align-middle">

                                        <thead className="table-light">

                                            <tr>

                                                <th>Order</th>

                                                <th>Date</th>

                                                <th>Items</th>

                                                <th>Payment</th>

                                                <th>Status</th>

                                                <th>Total</th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {

                                                customer.orders.map(
                                                    (order) => (

                                                        <tr key={order.id}>

                                                            <td className="fw-semibold">

                                                                {order.orderNumber}

                                                            </td>

                                                            <td>

                                                                {formatDate(order.createdAt)}

                                                            </td>

                                                            <td>

                                                                {order.items.length}

                                                            </td>

                                                            <td>

                                                                {order.paymentMethod}

                                                            </td>

                                                            <td>

                                                                <span className="badge bg-primary">

                                                                    {order.orderStatus}

                                                                </span>

                                                            </td>

                                                            <td className="fw-semibold">

                                                                Rs. {formatPrice(order.total)}

                                                            </td>

                                                        </tr>

                                                    )
                                                )

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            )

                        }

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default ViewCustomer;