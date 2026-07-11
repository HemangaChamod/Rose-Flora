import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import ProductForm from "../../components/product/ProductForm";

import { createProduct } from "../../services/productService";

function AddProduct() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = async (data) => {

        try {

            setLoading(true);

            await createProduct(data);

            setShowSuccessModal(true);

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to create product."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleSuccessClose = () => {

        setShowSuccessModal(false);

        navigate("/products");

    };

    return (

        <AdminLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">

                            Add Product

                        </h2>

                        <p className="text-muted">

                            Create a new product.

                        </p>

                    </div>

                </div>

                <div className="card shadow-sm">

                    <div className="card-body">

                        <ProductForm
                            loading={loading}
                            onSubmit={handleSubmit}
                        />

                    </div>

                </div>

            </div>

            {
                showSuccessModal && (

                    <>

                        <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                            role="dialog"
                            aria-modal="true"
                        >

                            <div className="modal-dialog modal-dialog-centered">

                                <div className="modal-content border-0 shadow">

                                    <div className="modal-body text-center p-5">

                                        <div
                                            className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-4"
                                            style={{
                                                width: "75px",
                                                height: "75px",
                                                fontSize: "32px",
                                            }}
                                        >

                                            <i className="fas fa-check"></i>

                                        </div>

                                        <h3 className="fw-bold mb-3">

                                            Product Added!

                                        </h3>

                                        <p className="text-muted mb-4">

                                            The product has been created successfully.

                                        </p>

                                        <button
                                            type="button"
                                            className="btn btn-success px-5"
                                            onClick={handleSuccessClose}
                                        >

                                            Continue

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div
                            className="modal-backdrop fade show"
                        ></div>

                    </>

                )
            }

        </AdminLayout>

    );

}

export default AddProduct;