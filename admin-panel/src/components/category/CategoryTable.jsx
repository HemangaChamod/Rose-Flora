import { Link } from "react-router-dom";

function CategoryTable({ categories, onDelete }) {
    return (
        <div className="table-responsive">

            <table className="table table-hover align-middle">

                <thead className="table-light">

                    <tr>

                        <th>Name</th>

                        <th>Slug</th>

                        <th>Description</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {categories.length === 0 ? (

                        <tr>

                            <td
                                colSpan="4"
                                className="text-center py-5"
                            >
                                No Categories Found
                            </td>

                        </tr>

                    ) : (

                        categories.map(category => (

                            <tr key={category.id}>

                                <td>{category.name}</td>

                                <td>{category.slug}</td>

                                <td>{category.description}</td>

                                <td>

                                    <Link
                                        to={`/categories/edit/${category.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onDelete(category.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default CategoryTable;