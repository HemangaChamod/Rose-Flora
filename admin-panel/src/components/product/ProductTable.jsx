import { Link } from "react-router-dom";

function ProductTable({ products, onDelete }) {

    const formatPrice = (price) => {

        return Number(price).toLocaleString("en-LK", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });

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

    return (

        <div className="table-responsive">

            <table className="table table-hover align-middle">

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

                        products.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center py-5"
                                >

                                    <h5 className="mb-2">

                                        No Products Found

                                    </h5>

                                    <p className="text-muted mb-0">

                                        Click "Add Product" to create your first product.

                                    </p>

                                </td>

                            </tr>

                        ) : (

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

                                        <div className="fw-semibold">

                                            {product.name}

                                        </div>

                                        <small className="text-muted">

                                            SKU : {product.sku}

                                        </small>

                                    </td>

                                    <td>

                                        <span className="badge bg-light text-dark border">

                                            {product.category?.name}

                                        </span>

                                    </td>

                                    <td>

                                        {

                                            product.salePrice ? (

                                                <>

                                                    <div
                                                        className="text-decoration-line-through text-muted small"
                                                    >

                                                        Rs. {formatPrice(product.regularPrice)}

                                                    </div>

                                                    <div
                                                        className="fw-bold text-success"
                                                    >

                                                        Rs. {formatPrice(product.salePrice)}

                                                    </div>

                                                </>

                                            ) : (

                                                <span className="fw-bold">

                                                    Rs. {formatPrice(product.regularPrice)}

                                                </span>

                                            )

                                        }

                                    </td>

                                    <td>

                                        {renderStockBadge(product.quantity)}

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

                                        <Link
                                            to={`/products/edit/${product.id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >

                                            <i className="fas fa-edit me-1"></i>

                                            Edit

                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(product)}
                                        >

                                            <i className="fas fa-trash me-1"></i>

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ProductTable;