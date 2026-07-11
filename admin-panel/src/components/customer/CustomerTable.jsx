import { Link } from "react-router-dom";

function CustomerTable({ customers }) {

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

    return (

        <>

            {/* Mobile Customer Cards */}

            <div className="d-md-none">

                {

                    customers.length === 0 ? (

                        <div className="text-center py-5 px-3">

                            <i
                                className="fas fa-users text-muted mb-3"
                                style={{
                                    fontSize: "45px",
                                }}
                            ></i>

                            <h5>

                                No Customers Found

                            </h5>

                            <p className="text-muted mb-0">

                                Registered customers will appear here.

                            </p>

                        </div>

                    ) : (

                        <div className="row g-3">

                            {

                                customers.map((customer) => (

                                    <div
                                        key={customer.id}
                                        className="col-12"
                                    >

                                        <div className="card border shadow-sm">

                                            <div className="card-body p-3">

                                                <div className="d-flex align-items-center gap-3">

                                                    <div
                                                        className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                            fontWeight: "bold",
                                                            fontSize: "20px",
                                                        }}
                                                    >

                                                        {
                                                            customer.firstName
                                                                ?.charAt(0)
                                                                ?.toUpperCase()
                                                        }

                                                    </div>

                                                    <div
                                                        className="flex-grow-1"
                                                        style={{
                                                            minWidth: 0,
                                                        }}
                                                    >

                                                        <h6 className="fw-semibold mb-1 text-break">

                                                            {customer.firstName}{" "}
                                                            {customer.lastName}

                                                        </h6>

                                                        <div className="text-muted small text-break">

                                                            {customer.email}

                                                        </div>

                                                    </div>

                                                </div>


                                                <hr className="my-3" />


                                                <div className="mb-3">

                                                    <small className="text-muted d-block mb-1">

                                                        Phone

                                                    </small>

                                                    <span>

                                                        {customer.phone}

                                                    </span>

                                                </div>


                                                <div className="row g-3">

                                                    <div className="col-6">

                                                        <small className="text-muted d-block mb-1">

                                                            Orders

                                                        </small>

                                                        <span className="badge bg-primary">

                                                            {customer.orderCount}

                                                        </span>

                                                    </div>

                                                    <div className="col-6">

                                                        <small className="text-muted d-block mb-1">

                                                            Total Spent

                                                        </small>

                                                        <span className="fw-semibold text-success">

                                                            Rs. {formatPrice(customer.totalSpent)}

                                                        </span>

                                                    </div>

                                                    <div className="col-12">

                                                        <small className="text-muted d-block mb-1">

                                                            Registered

                                                        </small>

                                                        <span>

                                                            {formatDate(customer.createdAt)}

                                                        </span>

                                                    </div>

                                                </div>


                                                <div className="mt-4">

                                                    <Link
                                                        to={`/customers/${customer.id}`}
                                                        className="btn btn-outline-success btn-sm w-100"
                                                    >

                                                        <i className="fas fa-eye me-1"></i>

                                                        View

                                                    </Link>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>


            {/* Tablet / Desktop Table */}

            <div className="d-none d-md-block table-responsive">

                <table className="table table-hover align-middle">

                    <thead className="table-light">

                        <tr>

                            <th>Customer</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Orders</th>

                            <th>Total Spent</th>

                            <th>Registered</th>

                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            customers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center py-5"
                                    >

                                        <i
                                            className="fas fa-users text-muted mb-3"
                                            style={{
                                                fontSize: "45px",
                                            }}
                                        ></i>

                                        <h5>

                                            No Customers Found

                                        </h5>

                                        <p className="text-muted mb-0">

                                            Registered customers will appear here.

                                        </p>

                                    </td>

                                </tr>

                            ) : (

                                customers.map((customer) => (

                                    <tr key={customer.id}>

                                        <td>

                                            <div className="d-flex align-items-center">

                                                <div
                                                    className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                                    style={{
                                                        width: "45px",
                                                        height: "45px",
                                                        fontWeight: "bold",
                                                    }}
                                                >

                                                    {
                                                        customer.firstName
                                                            ?.charAt(0)
                                                            ?.toUpperCase()
                                                    }

                                                </div>

                                                <div>

                                                    <div className="fw-semibold text-nowrap">

                                                        {customer.firstName}{" "}
                                                        {customer.lastName}

                                                    </div>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <span className="text-nowrap">

                                                {customer.email}

                                            </span>

                                        </td>

                                        <td className="text-nowrap">

                                            {customer.phone}

                                        </td>

                                        <td>

                                            <span className="badge bg-primary">

                                                {customer.orderCount}

                                            </span>

                                        </td>

                                        <td className="text-nowrap">

                                            <span className="fw-semibold text-success">

                                                Rs. {formatPrice(customer.totalSpent)}

                                            </span>

                                        </td>

                                        <td className="text-nowrap">

                                            {formatDate(customer.createdAt)}

                                        </td>

                                        <td className="text-center">

                                            <Link
                                                to={`/customers/${customer.id}`}
                                                className="btn btn-outline-success btn-sm text-nowrap"
                                            >

                                                <i className="fas fa-eye me-1"></i>

                                                View

                                            </Link>

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default CustomerTable;