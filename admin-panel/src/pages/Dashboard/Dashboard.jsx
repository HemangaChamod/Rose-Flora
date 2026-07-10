import AdminLayout from "../../components/layout/AdminLayout";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

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

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Dashboard</h2>
                    <p className="text-muted mb-0">
                        Welcome back, {admin?.firstName} {admin?.lastName}
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="row g-4">

                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1">
                                    Total Products
                                </p>
                                <h2 className="fw-bold mb-0">
                                    {
                                        loading
                                            ? "..."
                                            : dashboard.totalProducts
                                    }
                                </h2>
                            </div>

                            <div
                                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    fontSize: "24px",
                                }}
                            >
                                <i className="fas fa-box"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1">
                                    Categories
                                </p>
                                <h2 className="fw-bold mb-0">
                                    {
                                        loading
                                            ? "..."
                                            : dashboard.totalCategories
                                    }
                                </h2>
                            </div>

                            <div
                                className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    fontSize: "24px",
                                }}
                            >
                                <i className="fas fa-list"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1">
                                    Orders
                                </p>
                                <h2 className="fw-bold mb-0">
                                    {
                                        loading
                                            ? "..."
                                            : dashboard.totalOrders
                                    }
                                </h2>
                            </div>

                            <div
                                className="rounded-circle bg-warning text-white d-flex justify-content-center align-items-center"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    fontSize: "24px",
                                }}
                            >
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1">
                                    Customers
                                </p>
                                <h2 className="fw-bold mb-0">
                                    {
                                        loading
                                            ? "..."
                                            : dashboard.totalCustomers
                                    }
                                </h2>
                            </div>

                            <div
                                className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    fontSize: "24px",
                                }}
                            >
                                <i className="fas fa-users"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Recent Activity */}
            <div className="row mt-5">

                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">
                                Recent Orders
                            </h5>
                        </div>

                        <div className="card-body">
                            {
                                loading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-success"></div>
                                    </div>
                                ) : dashboard.recentOrders.length === 0 ? (
                                    <div className="text-center py-5 text-muted">
                                        <i
                                            className="fas fa-shopping-bag mb-3"
                                            style={{ fontSize: "50px" }}
                                        ></i>
                                        <h5>No Orders Yet</h5>
                                        <p>
                                            Orders will appear here once customers start purchasing.
                                        </p>
                                    </div>
                                ) : (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Order</th>
                                                <th>Customer</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dashboard.recentOrders.map(order => (
                                                    <tr key={order.id}>
                                                        <td>
                                                            {order.orderNumber}
                                                        </td>
                                                        <td>
                                                            {order.customer.firstName}{" "}
                                                            {order.customer.lastName}
                                                        </td>
                                                        <td>
                                                            Rs. {Number(order.total).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    
                    {/* Low Stock Products Card */}
                    <div className="card border-0 shadow-sm mt-0">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">
                                Low Stock Products
                            </h5>
                        </div>
                        <div className="card-body">
                            {
                                dashboard.lowStockProducts.length === 0 ? (
                                    <p className="text-muted mb-0">
                                        No low stock products.
                                    </p>
                                ) : (
                                    dashboard.lowStockProducts.map(product => (
                                        <div
                                            key={product.id}
                                            className="d-flex justify-content-between mb-2"
                                        >
                                            <span>
                                                {product.name}
                                            </span>
                                            <span className="badge bg-warning text-dark">
                                                {product.quantity}
                                            </span>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm mt-5">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">
                                Administrator
                            </h5>
                        </div>

                        <div className="card-body">
                            <div className="text-center">
                                <div
                                    className="rounded-circle bg-success text-white mx-auto mb-3 d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        fontSize: "32px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {admin?.firstName?.charAt(0)}
                                </div>

                                <h5>
                                    {admin?.firstName} {admin?.lastName}
                                </h5>

                                <p className="text-muted">
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
        </AdminLayout>
    );
}

export default Dashboard;