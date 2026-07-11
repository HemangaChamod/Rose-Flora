import { useEffect, useState } from "react";

import AdminLayout from "../../components/layout/AdminLayout";

import { useAuth } from "../../hooks/useAuth";

import {
    getDashboard,
} from "../../services/dashboardService";

function Dashboard() {

    const { admin } = useAuth();

    const [dashboard, setDashboard] = useState({

        totalProducts: 0,

        totalCategories: 0,

        totalCustomers: 0,

        totalOrders: 0,

        recentOrders: [],

        lowStockProducts: [],

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const res = await getDashboard();

            setDashboard(res.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const formatPrice = (price) => {

        return Number(price || 0).toLocaleString(
            "en-LK",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }
        );

    };

    const statistics = [

        {
            title: "Total Products",
            value: dashboard.totalProducts,
            icon: "fas fa-box",
            background: "bg-primary",
        },

        {
            title: "Categories",
            value: dashboard.totalCategories,
            icon: "fas fa-list",
            background: "bg-success",
        },

        {
            title: "Orders",
            value: dashboard.totalOrders,
            icon: "fas fa-shopping-cart",
            background: "bg-warning",
        },

        {
            title: "Customers",
            value: dashboard.totalCustomers,
            icon: "fas fa-users",
            background: "bg-danger",
        },

    ];

    return (

        <AdminLayout>

            <div className="container-fluid px-0">

                {/* Page Header */}

                <div className="mb-4">

                    <h2 className="fw-bold mb-1">

                        Dashboard

                    </h2>

                    <p className="text-muted mb-0">

                        Welcome back,{" "}

                        {admin?.firstName}{" "}

                        {admin?.lastName}

                    </p>

                </div>


                {/* Statistics */}

                <div className="row g-3 g-lg-4">

                    {

                        statistics.map((stat) => (

                            <div
                                key={stat.title}
                                className="col-12 col-sm-6 col-xl-3"
                            >

                                <div className="card border-0 shadow-sm h-100">

                                    <div className="card-body p-3 p-lg-4">

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div className="me-3">

                                                <p className="text-muted mb-1">

                                                    {stat.title}

                                                </p>

                                                <h2 className="fw-bold mb-0">

                                                    {
                                                        loading
                                                            ? "..."
                                                            : stat.value
                                                    }

                                                </h2>

                                            </div>

                                            <div
                                                className={`${stat.background} text-white rounded-circle d-flex justify-content-center align-items-center flex-shrink-0`}
                                                style={{
                                                    width: "56px",
                                                    height: "56px",
                                                    fontSize: "22px",
                                                }}
                                            >

                                                <i className={stat.icon}></i>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>


                {/* Dashboard Content */}

                <div className="row g-4 mt-2 mt-lg-4">

                    {/* Recent Orders */}

                    <div className="col-12 col-xl-8">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-header bg-white py-3">

                                <h5 className="mb-0 fw-semibold">

                                    Recent Orders

                                </h5>

                            </div>

                            <div className="card-body p-0">

                                {

                                    loading ? (

                                        <div className="text-center py-5">

                                            <div className="spinner-border text-success"></div>

                                        </div>

                                    ) : dashboard.recentOrders.length === 0 ? (

                                        <div className="text-center py-5 px-3 text-muted ">

                                            <i
                                                className="fas fa-shopping-bag mb-3 "
                                                style={{
                                                    fontSize: "45px",
                                                }}
                                            ></i>

                                            <h5>

                                                No Orders Yet

                                            </h5>

                                            <p className="mb-0">

                                                Orders will appear here once customers start purchasing.

                                            </p>

                                        </div>

                                    ) : (

                                        <div className="table-responsive">

                                            <table className="table table-hover align-middle mb-0">

                                                <thead className="table-light">

                                                    <tr>

                                                        <th className="text-nowrap px-3">

                                                            Order

                                                        </th>

                                                        <th className="text-nowrap">

                                                            Customer

                                                        </th>

                                                        <th className="text-nowrap pe-3">

                                                            Total

                                                        </th>

                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {

                                                        dashboard.recentOrders.map(
                                                            (order) => (

                                                                <tr key={order.id}>

                                                                    <td className="px-3">

                                                                        <span className="fw-semibold text-nowrap">

                                                                            {order.orderNumber}

                                                                        </span>

                                                                    </td>

                                                                    <td>

                                                                        <div
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

                                                                    </td>

                                                                    <td className="pe-3">

                                                                        <span className="fw-semibold text-success text-nowrap">

                                                                            Rs. {formatPrice(order.total)}

                                                                        </span>

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


                    {/* Right Side */}

                    <div className="col-12 col-xl-4">

                        <div className="d-flex flex-column gap-4">

                            {/* Low Stock */}

                            <div className="card border-0 shadow-sm">

                                <div className="card-header bg-white py-3">

                                    <h5 className="mb-0 fw-semibold">

                                        Low Stock Products

                                    </h5>

                                </div>

                                <div className="card-body">

                                    {

                                        loading ? (

                                            <div className="text-center py-3">

                                                <div className="spinner-border spinner-border-sm text-success"></div>

                                            </div>

                                        ) : dashboard.lowStockProducts.length === 0 ? (

                                            <div className="text-center py-3 text-muted">

                                                <i
                                                    className="fas fa-box-open mb-2"
                                                    style={{
                                                        fontSize: "32px",
                                                    }}
                                                ></i>

                                                <p className="mb-0">

                                                    No low stock products.

                                                </p>

                                            </div>

                                        ) : (

                                            dashboard.lowStockProducts.map(
                                                (product) => (

                                                    <div
                                                        key={product.id}
                                                        className="d-flex justify-content-between align-items-center gap-3 py-2 border-bottom"
                                                    >

                                                        <span
                                                            className="text-truncate"
                                                            title={product.name}
                                                        >

                                                            {product.name}

                                                        </span>

                                                        <span className="badge bg-warning text-dark flex-shrink-0">

                                                            {product.quantity} Left

                                                        </span>

                                                    </div>

                                                )
                                            )

                                        )

                                    }

                                </div>

                            </div>


                            {/* Administrator */}

                            <div className="card border-0 shadow-sm">

                                <div className="card-header bg-white py-3">

                                    <h5 className="mb-0 fw-semibold">

                                        Administrator

                                    </h5>

                                </div>

                                <div className="card-body p-4">

                                    <div className="text-center">

                                        <div
                                            className="rounded-circle bg-success text-white mx-auto mb-3 d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "75px",
                                                height: "75px",
                                                fontSize: "30px",
                                                fontWeight: "bold",
                                            }}
                                        >

                                            {
                                                admin?.firstName
                                                    ?.charAt(0)
                                                    ?.toUpperCase()
                                            }

                                        </div>

                                        <h5 className="fw-semibold mb-1">

                                            {admin?.firstName}{" "}

                                            {admin?.lastName}

                                        </h5>

                                        <p
                                            className="text-muted mb-3 text-break"
                                        >

                                            {admin?.email}

                                        </p>

                                        <span className="badge bg-success">

                                            Administrator

                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Dashboard;