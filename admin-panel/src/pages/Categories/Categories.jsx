import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";

import CategoryTable from "../../components/category/CategoryTable";

import DeleteConfirmModal from "../../common/DeleteConfirmModal";

import {
    getCategories,
    deleteCategory,
} from "../../services/categoryService";

function Categories() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [deleteLoading, setDeleteLoading] = useState(false);

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

    const handleDelete = (id) => {

        const category = categories.find(
            (category) => category.id === id
        );

        if (!category) return;

        setSelectedCategory(category);

        setShowDeleteModal(true);

    };

    const closeDeleteModal = () => {

        if (deleteLoading) return;

        setShowDeleteModal(false);

        setSelectedCategory(null);

    };

    const confirmDelete = async () => {

        if (!selectedCategory) return;

        try {

            setDeleteLoading(true);

            await deleteCategory(
                selectedCategory.id
            );

            setShowDeleteModal(false);

            setSelectedCategory(null);

            await loadCategories();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete category."
            );

        } finally {

            setDeleteLoading(false);

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

                        loading ? (

                            <div className="text-center py-5">

                                <div className="spinner-border"></div>

                            </div>

                        ) : (

                            <CategoryTable
                                categories={categories}
                                onDelete={handleDelete}
                            />

                        )

                    }

                </div>

            </div>


            <DeleteConfirmModal
                show={showDeleteModal}
                title="Delete Category"
                message={
                    `Are you sure you want to delete "${selectedCategory?.name}"?`
                }
                loading={deleteLoading}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />

        </AdminLayout>

    );

}

export default Categories;