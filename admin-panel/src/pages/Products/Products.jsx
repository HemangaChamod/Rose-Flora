import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import ProductTable from "../../components/product/ProductTable";
import DeleteConfirmModal from "../../common/DeleteConfirmModal";

import {
    getProducts,
    deleteProduct,
} from "../../services/productService";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const loadProducts = async () => {

        try {

            setLoading(true);

            const res = await getProducts();

            setProducts(res.data.products);

        } catch (error) {

            console.error(error);

            alert("Failed to load products.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProducts();

    }, []);

    const handleDelete = (product) => {

        setSelectedProduct(product);

        setShowDeleteModal(true);

    };

    const confirmDelete = async () => {

        try {

            setDeleteLoading(true);

            await deleteProduct(selectedProduct.id);

            setProducts((prev) =>
                prev.filter(
                    (product) =>
                        product.id !== selectedProduct.id
                )
            );

            setShowDeleteModal(false);

            setSelectedProduct(null);

        } catch (error) {

            console.error(error);

            alert("Unable to delete product.");

        } finally {

            setDeleteLoading(false);

        }

    };

    return (

        <AdminLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">

                            Products

                        </h2>

                        <p className="text-muted mb-0">

                            Manage your products.

                        </p>

                    </div>

                    <Link
                        to="/products/add"
                        className="btn btn-success"
                    >

                        <i className="fas fa-plus me-2"></i>

                        Add Product

                    </Link>

                </div>

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        {

                            loading ? (

                                <div className="text-center py-5">

                                    <div className="spinner-border text-success"></div>

                                    <p className="mt-3">

                                        Loading products...

                                    </p>

                                </div>

                            ) : (

                                <ProductTable
                                    products={products}
                                    onDelete={handleDelete}
                                />

                            )

                        }

                    </div>

                </div>

            </div>

            <DeleteConfirmModal
                show={showDeleteModal}
                title="Delete Product"
                message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
                loading={deleteLoading}
                onClose={() => {

                    setShowDeleteModal(false);

                    setSelectedProduct(null);

                }}
                onConfirm={confirmDelete}
            />

        </AdminLayout>

    );

}

export default Products;