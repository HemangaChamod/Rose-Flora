import { Link } from "react-router-dom";

function ProductTable({ products, onDelete }) {

    const formatPrice = (price) => {

        return Number(price || 0).toLocaleString(
            "en-LK",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }
        );

    };

    const renderStockBadge = (quantity) => {

        if (quantity <= 0) {

            return (
                <span className="badge bg-danger">
                    Out of Stock
                </span>
            );

        }

        if (quantity <= 10) {

            return (
                <span className="badge bg-warning text-dark">
                    {quantity} Left
                </span>
            );

        }

        return (
            <span className="badge bg-success">
                {quantity} In Stock
            </span>
        );

    };

    const renderPrice = (product) => {

        if (product.salePrice) {

            return (

                <div>

                    <div className="text-decoration-line-through text-muted small">

                        Rs. {formatPrice(product.regularPrice)}

                    </div>

                    <div className="fw-bold text-success">

                        Rs. {formatPrice(product.salePrice)}

                    </div>

                </div>

            );

        }

        return (

            <span className="fw-bold">

                Rs. {formatPrice(product.regularPrice)}

            </span>

        );

    };

    if (products.length === 0) {

        return (

            <div className="text-center py-5 px-3">

                <i
                    className="fas fa-box-open text-muted mb-3"
                    style={{
                        fontSize: "45px",
                    }}
                ></i>

                <h5 className="mb-2">

                    No Products Found

                </h5>

                <p className="text-muted mb-0">

                    Click "Add Product" to create your first product.

                </p>

            </div>

        );

    }

    return (

        <>

            {/* Mobile Product Cards */}

            <div className="d-md-none">

                <div className="row g-3">

                    {

                        products.map((product) => (

                            <div
                                key={product.id}
                                className="col-12"
                            >

                                <div className="card border shadow-sm">

                                    <div className="card-body p-3">

                                        <div className="d-flex gap-3">

                                            <img
                                                src={
                                                    product.images?.[0]?.imageUrl ||
                                                    "https://placehold.co/90x90?text=No+Image"
                                                }
                                                alt={product.name}
                                                className="flex-shrink-0"
                                                style={{
                                                    width: "90px",
                                                    height: "90px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px",
                                                    border: "1px solid #dee2e6",
                                                }}
                                            />

                                            <div
                                                className="flex-grow-1"
                                                style={{
                                                    minWidth: 0,
                                                }}
                                            >

                                                <h6 className="fw-bold mb-1 text-break">

                                                    {product.name}

                                                </h6>

                                                <small className="text-muted d-block mb-2 text-break">

                                                    SKU: {product.sku}

                                                </small>

                                                <span className="badge bg-light text-dark border">

                                                    {
                                                        product.category?.name ||
                                                        "No Category"
                                                    }

                                                </span>

                                            </div>

                                        </div>


                                        <hr className="my-3" />


                                        <div className="row g-3">

                                            <div className="col-6">

                                                <small className="text-muted d-block">

                                                    Price

                                                </small>

                                                {renderPrice(product)}

                                            </div>

                                            <div className="col-6">

                                                <small className="text-muted d-block mb-1">

                                                    Stock

                                                </small>

                                                {
                                                    renderStockBadge(
                                                        product.quantity
                                                    )
                                                }

                                            </div>

                                            <div className="col-6">

                                                <small className="text-muted d-block mb-1">

                                                    Featured

                                                </small>

                                                {

                                                    product.featured ? (

                                                        <span className="badge bg-success">

                                                            Featured

                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-secondary">

                                                            No

                                                        </span>

                                                    )

                                                }

                                            </div>

                                            <div className="col-6">

                                                <small className="text-muted d-block mb-1">

                                                    New Arrival

                                                </small>

                                                {

                                                    product.newArrival ? (

                                                        <span className="badge bg-primary">

                                                            New

                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-secondary">

                                                            No

                                                        </span>

                                                    )

                                                }

                                            </div>

                                        </div>


                                        <div className="d-flex gap-2 mt-4">

                                            <Link
                                                to={`/products/edit/${product.id}`}
                                                className="btn btn-warning btn-sm flex-fill"
                                            >

                                                <i className="fas fa-edit me-1"></i>

                                                Edit

                                            </Link>

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm flex-fill"
                                                onClick={() =>
                                                    onDelete(product)
                                                }
                                            >

                                                <i className="fas fa-trash me-1"></i>

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>


            {/* Desktop / Tablet Table */}

            <div className="d-none d-md-block table-responsive">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                        <tr>

                            <th style={{ width: "90px" }}>
                                Image
                            </th>

                            <th>
                                Product
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Stock
                            </th>

                            <th>
                                Featured
                            </th>

                            <th>
                                New Arrival
                            </th>

                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            products.map((product) => (

                                <tr key={product.id}>

                                    <td>

                                        <img
                                            src={
                                                product.images?.[0]?.imageUrl ||
                                                "https://placehold.co/70x70?text=No+Image"
                                            }
                                            alt={product.name}
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                                border: "1px solid #dee2e6",
                                            }}
                                        />

                                    </td>

                                    <td>

                                        <div
                                            className="fw-semibold"
                                            style={{
                                                minWidth: "150px",
                                            }}
                                        >

                                            {product.name}

                                        </div>

                                        <small className="text-muted">

                                            SKU: {product.sku}

                                        </small>

                                    </td>

                                    <td>

                                        <span className="badge bg-light text-dark border text-nowrap">

                                            {
                                                product.category?.name ||
                                                "No Category"
                                            }

                                        </span>

                                    </td>

                                    <td className="text-nowrap">

                                        {renderPrice(product)}

                                    </td>

                                    <td className="text-nowrap">

                                        {
                                            renderStockBadge(
                                                product.quantity
                                            )
                                        }

                                    </td>

                                    <td>

                                        {

                                            product.featured ? (

                                                <span className="badge bg-success">

                                                    Featured

                                                </span>

                                            ) : (

                                                <span className="badge bg-secondary">

                                                    No

                                                </span>

                                            )

                                        }

                                    </td>

                                    <td>

                                        {

                                            product.newArrival ? (

                                                <span className="badge bg-primary">

                                                    New

                                                </span>

                                            ) : (

                                                <span className="badge bg-secondary">

                                                    No

                                                </span>

                                            )

                                        }

                                    </td>

                                    <td className="text-center">

                                        <div className="d-flex justify-content-center gap-2">

                                            <Link
                                                to={`/products/edit/${product.id}`}
                                                className="btn btn-warning btn-sm text-nowrap"
                                            >

                                                <i className="fas fa-edit me-1"></i>

                                                Edit

                                            </Link>

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm text-nowrap"
                                                onClick={() =>
                                                    onDelete(product)
                                                }
                                            >

                                                <i className="fas fa-trash me-1"></i>

                                                Delete

                                            </button>

                                        </div>

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

export default ProductTable;