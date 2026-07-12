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


    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });


    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState(null);

    const [deleteLoading, setDeleteLoading] =
        useState(false);


    const loadProducts = async (currentPage = page) => {

        try {

            setLoading(true);


            const res = await getProducts({
                page: currentPage,
                limit: 10,
            });


            setProducts(
                res.data?.products || []
            );


            setPagination(
                res.data?.pagination || {
                    page: currentPage,
                    limit: 10,
                    total: 0,
                    totalPages: 1,
                }
            );

        } catch (error) {

            console.error(
                "Failed to load products:",
                error
            );


            alert(
                "Failed to load products."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadProducts(page);

    }, [page]);


    const handlePageChange = (newPage) => {

        if (
            newPage < 1 ||
            newPage > pagination.totalPages ||
            newPage === page
        ) {

            return;

        }


        setPage(newPage);


        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    const handleDelete = (product) => {

        setSelectedProduct(product);

        setShowDeleteModal(true);

    };


    const confirmDelete = async () => {

        if (!selectedProduct) {

            return;

        }


        try {

            setDeleteLoading(true);


            await deleteProduct(
                selectedProduct.id
            );


            setShowDeleteModal(false);

            setSelectedProduct(null);


            const shouldGoPreviousPage =
                products.length === 1 &&
                page > 1;


            if (shouldGoPreviousPage) {

                setPage(
                    (previousPage) =>
                        previousPage - 1
                );

            } else {

                await loadProducts(page);

            }

        } catch (error) {

            console.error(
                "Unable to delete product:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to delete product."
            );

        } finally {

            setDeleteLoading(false);

        }

    };


    const getPageNumbers = () => {

        const pages = [];

        const totalPages =
            pagination.totalPages;


        for (
            let pageNumber = 1;
            pageNumber <= totalPages;
            pageNumber++
        ) {

            pages.push(pageNumber);

        }


        return pages;

    };


    const startProduct =

        pagination.total === 0

            ? 0

            : (
                (pagination.page - 1) *
                pagination.limit
            ) + 1;


    const endProduct = Math.min(

        pagination.page *
        pagination.limit,

        pagination.total

    );


    return (

        <AdminLayout>

            <div className="container-fluid">


                {/* PAGE HEADER */}

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">

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


                {/* PRODUCT CARD */}

                <div className="card shadow-sm border-0">

                    <div className="card-body">


                        {

                            loading ? (

                                <div className="text-center py-5">

                                    <div className="spinner-border text-success">

                                        <span className="visually-hidden">

                                            Loading...

                                        </span>

                                    </div>


                                    <p className="mt-3 mb-0">

                                        Loading products...

                                    </p>

                                </div>

                            ) : (

                                <>

                                    <ProductTable
                                        products={products}
                                        onDelete={handleDelete}
                                    />


                                    {

                                        pagination.total > 0 && (

                                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-4 pt-3 border-top">


                                                {/* PRODUCT COUNT */}

                                                <p className="text-muted mb-0">

                                                    Showing{" "}

                                                    <strong>

                                                        {startProduct}

                                                    </strong>

                                                    {" "}to{" "}

                                                    <strong>

                                                        {endProduct}

                                                    </strong>

                                                    {" "}of{" "}

                                                    <strong>

                                                        {pagination.total}

                                                    </strong>

                                                    {" "}products

                                                </p>


                                                {/* PAGINATION */}

                                                {

                                                    pagination.totalPages > 1 && (

                                                        <nav>

                                                            <ul className="pagination mb-0">


                                                                {/* PREVIOUS */}

                                                                <li
                                                                    className={`page-item ${
                                                                        page === 1
                                                                            ? "disabled"
                                                                            : ""
                                                                    }`}
                                                                >

                                                                    <button
                                                                        type="button"
                                                                        className="page-link"
                                                                        onClick={() =>
                                                                            handlePageChange(
                                                                                page - 1
                                                                            )
                                                                        }
                                                                    >

                                                                        Previous

                                                                    </button>

                                                                </li>


                                                                {/* PAGE NUMBERS */}

                                                                {

                                                                    getPageNumbers().map(
                                                                        (
                                                                            pageNumber
                                                                        ) => (

                                                                            <li
                                                                                key={
                                                                                    pageNumber
                                                                                }
                                                                                className={`page-item ${
                                                                                    page ===
                                                                                    pageNumber
                                                                                        ? "active"
                                                                                        : ""
                                                                                }`}
                                                                            >

                                                                                <button
                                                                                    type="button"
                                                                                    className="page-link"
                                                                                    onClick={() =>
                                                                                        handlePageChange(
                                                                                            pageNumber
                                                                                        )
                                                                                    }
                                                                                >

                                                                                    {
                                                                                        pageNumber
                                                                                    }

                                                                                </button>

                                                                            </li>

                                                                        )
                                                                    )

                                                                }


                                                                {/* NEXT */}

                                                                <li
                                                                    className={`page-item ${
                                                                        page ===
                                                                        pagination.totalPages
                                                                            ? "disabled"
                                                                            : ""
                                                                    }`}
                                                                >

                                                                    <button
                                                                        type="button"
                                                                        className="page-link"
                                                                        onClick={() =>
                                                                            handlePageChange(
                                                                                page + 1
                                                                            )
                                                                        }
                                                                    >

                                                                        Next

                                                                    </button>

                                                                </li>

                                                            </ul>

                                                        </nav>

                                                    )

                                                }

                                            </div>

                                        )

                                    }

                                </>

                            )

                        }

                    </div>

                </div>

            </div>


            {/* DELETE CONFIRMATION MODAL */}

            <DeleteConfirmModal
                show={showDeleteModal}
                title="Delete Product"
                message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
                loading={deleteLoading}
                onClose={() => {

                    if (deleteLoading) {

                        return;

                    }


                    setShowDeleteModal(false);

                    setSelectedProduct(null);

                }}
                onConfirm={confirmDelete}
            />

        </AdminLayout>

    );

}


export default Products;