import { Link } from "react-router-dom";

function CategoryTable({ categories, onDelete }) {

    if (categories.length === 0) {

        return (

            <div className="text-center py-5 px-3">

                <i
                    className="fas fa-list text-muted mb-3"
                    style={{
                        fontSize: "45px",
                    }}
                ></i>

                <h5 className="mb-2">

                    No Categories Found

                </h5>

                <p className="text-muted mb-0">

                    Add your first product category to get started.

                </p>

            </div>

        );

    }

    return (

        <>

            {/* Mobile Category Cards */}

            <div className="d-md-none">

                <div className="row g-3">

                    {

                        categories.map((category) => (

                            <div
                                key={category.id}
                                className="col-12"
                            >

                                <div className="card border shadow-sm">

                                    <div className="card-body p-3">

                                        <div className="d-flex align-items-start gap-3">

                                            <div
                                                className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center flex-shrink-0"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                }}
                                            >

                                                {
                                                    category.name
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

                                                <h6 className="fw-bold mb-1 text-break">

                                                    {category.name}

                                                </h6>

                                                <span className="badge bg-light text-dark border text-break">

                                                    {category.slug}

                                                </span>

                                            </div>

                                        </div>


                                        <hr className="my-3" />


                                        <div>

                                            <small className="text-muted d-block mb-1">

                                                Description

                                            </small>

                                            <p className="mb-0 text-break">

                                                {
                                                    category.description ||
                                                    "No description available."
                                                }

                                            </p>

                                        </div>


                                        <div className="d-flex gap-2 mt-4">

                                            <Link
                                                to={`/categories/edit/${category.id}`}
                                                className="btn btn-warning btn-sm flex-fill"
                                            >

                                                <i className="fas fa-edit me-1"></i>

                                                Edit

                                            </Link>

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm flex-fill"
                                                onClick={() =>
                                                    onDelete(category.id)
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

                            <th>
                                Name
                            </th>

                            <th>
                                Slug
                            </th>

                            <th>
                                Description
                            </th>

                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            categories.map((category) => (

                                <tr key={category.id}>

                                    <td>

                                        <div
                                            className="fw-semibold"
                                            style={{
                                                minWidth: "140px",
                                            }}
                                        >

                                            {category.name}

                                        </div>

                                    </td>

                                    <td>

                                        <span className="badge bg-light text-dark border">

                                            {category.slug}

                                        </span>

                                    </td>

                                    <td>

                                        <div
                                            className="text-muted"
                                            style={{
                                                minWidth: "200px",
                                                maxWidth: "450px",
                                                whiteSpace: "normal",
                                                wordBreak: "break-word",
                                            }}
                                        >

                                            {
                                                category.description ||
                                                "No description available."
                                            }

                                        </div>

                                    </td>

                                    <td className="text-center">

                                        <div className="d-flex justify-content-center gap-2">

                                            <Link
                                                to={`/categories/edit/${category.id}`}
                                                className="btn btn-warning btn-sm text-nowrap"
                                            >

                                                <i className="fas fa-edit me-1"></i>

                                                Edit

                                            </Link>

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm text-nowrap"
                                                onClick={() =>
                                                    onDelete(category.id)
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

export default CategoryTable;