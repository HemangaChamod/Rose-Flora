import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";

import CategoryTable from "../../components/category/CategoryTable";

import {
    getCategories,
    deleteCategory,
} from "../../services/categoryService";

function Categories() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadCategories = async () => {

        try {

            const res = await getCategories();

            setCategories(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadCategories();

    }, []);

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this category?"
        );

        if (!confirmed) return;

        try {

            await deleteCategory(id);

            loadCategories();

        } catch {

            alert("Unable to delete category.");

        }

    };

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">
                        Categories
                    </h2>

                    <p className="text-muted">
                        Manage flower categories.
                    </p>

                </div>

                <Link
                    className="btn btn-success"
                    to="/categories/add"
                >
                    <i className="fas fa-plus me-2"></i>

                    Add Category

                </Link>

            </div>

            <div className="card shadow-sm">

                <div className="card-body">

                    {

                        loading ?

                            (
                                <div className="text-center py-5">

                                    <div className="spinner-border"></div>

                                </div>

                            )

                            :

                            <CategoryTable
                                categories={categories}
                                onDelete={handleDelete}
                            />

                    }

                </div>

            </div>

        </AdminLayout>

    );

}

export default Categories;