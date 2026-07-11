import { useEffect, useState } from "react";

import AdminLayout from "../../components/layout/AdminLayout";
import OrderTable from "../../components/order/OrderTable";

import {
    getOrders,
} from "../../services/orderService";

function Orders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [orderStatus, setOrderStatus] = useState("");

    const [paymentStatus, setPaymentStatus] = useState("");

    const loadOrders = async () => {

        try {

            setLoading(true);

            const res = await getOrders({
                search,
                orderStatus,
                paymentStatus,
            });

            setOrders(res.data.orders);

        } catch (error) {

            console.error(error);

            alert("Unable to load orders.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadOrders();

    }, [orderStatus, paymentStatus]);

    const handleSearch = (e) => {

        e.preventDefault();

        loadOrders();

    };

    return (

        <AdminLayout>

            <div className="container-fluid">

                <div className="mb-4">

                    <h2 className="fw-bold mb-1">

                        Orders

                    </h2>

                    <p className="text-muted mb-0">

                        Manage customer orders and order statuses.

                    </p>

                </div>

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        <div className="row g-3 mb-4">

                            <div className="col-lg-5">

                                <form onSubmit={handleSearch}>

                                    <div className="input-group">

                                        <span className="input-group-text bg-white">

                                            <i className="fas fa-search"></i>

                                        </span>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search order, customer, email or phone..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />

                                        <button
                                            className="btn btn-success"
                                            type="submit"
                                        >

                                            Search

                                        </button>

                                    </div>

                                </form>

                            </div>

                            <div className="col-lg-3">

                                <select
                                    className="form-select"
                                    value={orderStatus}
                                    onChange={(e) =>
                                        setOrderStatus(e.target.value)
                                    }
                                >

                                    <option value="">
                                        All Order Statuses
                                    </option>

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

                            <div className="col-lg-3">

                                <select
                                    className="form-select"
                                    value={paymentStatus}
                                    onChange={(e) =>
                                        setPaymentStatus(e.target.value)
                                    }
                                >

                                    <option value="">
                                        All Payment Statuses
                                    </option>

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

                            </div>

                            <div className="col-lg-1">

                                <button
                                    className="btn btn-outline-secondary w-100"
                                    onClick={() => {

                                        setSearch("");

                                        setOrderStatus("");

                                        setPaymentStatus("");

                                    }}
                                >

                                    <i className="fas fa-rotate-left"></i>

                                </button>

                            </div>

                        </div>

                        {

                            loading ? (

                                <div className="text-center py-5">

                                    <div className="spinner-border text-success"></div>

                                    <p className="mt-3 mb-0">

                                        Loading orders...

                                    </p>

                                </div>

                            ) : (

                                <OrderTable
                                    orders={orders}
                                />

                            )

                        }

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Orders;