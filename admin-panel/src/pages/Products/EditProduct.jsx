import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import ProductForm from "../../components/product/ProductForm";

import {
    getProduct,
    updateProduct,
} from "../../services/productService";


function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(false);

    const [pageLoading, setPageLoading] = useState(true);


    const [pendingData, setPendingData] = useState(null);

    const [showConfirmModal, setShowConfirmModal] =
        useState(false);

    const [showSuccessModal, setShowSuccessModal] =
        useState(false);

    const [showErrorModal, setShowErrorModal] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");


    useEffect(() => {

        loadProduct();

    }, [id]);


    const loadProduct = async () => {

        try {

            setPageLoading(true);


            const res = await getProduct(id);


            setProduct(res.data);

        } catch (err) {

            console.error(
                "Unable to load product:",
                err
            );


            setErrorMessage(
                err.response?.data?.message ||
                "Unable to load product."
            );


            setShowErrorModal(true);

        } finally {

            setPageLoading(false);

        }

    };


    const handleSubmit = (data) => {

        setPendingData(data);

        setShowConfirmModal(true);

    };


    const confirmUpdate = async () => {

        if (!pendingData) {

            return;

        }


        try {

            setLoading(true);


            await updateProduct(
                id,
                pendingData
            );


            setShowConfirmModal(false);

            setPendingData(null);

            setShowSuccessModal(true);

        } catch (err) {

            console.error(
                "Unable to update product:",
                err
            );


            setShowConfirmModal(false);


            setErrorMessage(
                err.response?.data?.message ||
                "Unable to update product."
            );


            setShowErrorModal(true);

        } finally {

            setLoading(false);

        }

    };


    const handleSuccessClose = () => {

        setShowSuccessModal(false);

        navigate("/products");

    };


    const handleErrorClose = () => {

        setShowErrorModal(false);


        if (!product) {

            navigate("/products");

        }

    };


    if (pageLoading) {

        return (

            <AdminLayout>

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    >

                        <span className="visually-hidden">

                            Loading...

                        </span>

                    </div>


                    <p className="mt-3">

                        Loading Product...

                    </p>

                </div>

            </AdminLayout>

        );

    }


    return (

        <AdminLayout>

            <div className="container-fluid">


                {/* PAGE HEADER */}

                <div className="mb-4">

                    <h2 className="fw-bold">

                        Edit Product

                    </h2>


                    <p className="text-muted">

                        Update product information.

                    </p>

                </div>


                {/* PRODUCT FORM */}

                {

                    product && (

                        <div className="card shadow-sm border-0">

                            <div className="card-body">

                                <ProductForm
                                    initialData={product}
                                    loading={loading}
                                    onSubmit={handleSubmit}
                                />

                            </div>

                        </div>

                    )

                }

            </div>


            {/* UPDATE CONFIRMATION MODAL */}

            {

                showConfirmModal && (

                    <>

                        <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                            role="dialog"
                            aria-modal="true"
                        >

                            <div className="modal-dialog modal-dialog-centered">

                                <div className="modal-content border-0 shadow">


                                    <div className="modal-header">

                                        <h5 className="modal-title fw-bold">

                                            Confirm Product Update

                                        </h5>


                                        <button
                                            type="button"
                                            className="btn-close"
                                            disabled={loading}
                                            onClick={() =>
                                                setShowConfirmModal(false)
                                            }
                                        ></button>

                                    </div>


                                    <div className="modal-body text-center py-4">

                                        <div
                                            className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                fontSize: "30px",
                                            }}
                                        >

                                            <i className="fas fa-edit"></i>

                                        </div>


                                        <h5 className="fw-bold mb-2">

                                            Update this product?

                                        </h5>


                                        <p className="text-muted mb-0">

                                            Are you sure you want to update{" "}

                                            <strong>

                                                {pendingData?.name}

                                            </strong>

                                            ?

                                        </p>


                                        <p className="text-muted small mt-2 mb-0">

                                            The current product information
                                            will be replaced with your new
                                            changes.

                                        </p>

                                    </div>


                                    <div className="modal-footer justify-content-center">

                                        <button
                                            type="button"
                                            className="btn btn-light px-4"
                                            disabled={loading}
                                            onClick={() => {

                                                setShowConfirmModal(false);

                                                setPendingData(null);

                                            }}
                                        >

                                            Cancel

                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-success px-4"
                                            disabled={loading}
                                            onClick={confirmUpdate}
                                        >

                                            {

                                                loading ? (

                                                    <>

                                                        <span className="spinner-border spinner-border-sm me-2"></span>

                                                        Updating...

                                                    </>

                                                ) : (

                                                    <>

                                                        <i className="fas fa-check me-2"></i>

                                                        Yes, Update Product

                                                    </>

                                                )

                                            }

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="modal-backdrop fade show"></div>

                    </>

                )

            }


            {/* SUCCESS MODAL */}

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
                                            className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                fontSize: "35px",
                                            }}
                                        >

                                            <i className="fas fa-check"></i>

                                        </div>


                                        <h3 className="fw-bold mb-3">

                                            Product Updated!

                                        </h3>


                                        <p className="text-muted mb-4">

                                            The product has been updated
                                            successfully.

                                        </p>


                                        <button
                                            type="button"
                                            className="btn btn-success px-5"
                                            onClick={handleSuccessClose}
                                        >

                                            <i className="fas fa-box me-2"></i>

                                            Back to Products

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="modal-backdrop fade show"></div>

                    </>

                )

            }


            {/* ERROR MODAL */}

            {

                showErrorModal && (

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
                                            className="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                fontSize: "35px",
                                            }}
                                        >

                                            <i className="fas fa-times"></i>

                                        </div>


                                        <h3 className="fw-bold mb-3">

                                            Something Went Wrong

                                        </h3>


                                        <p className="text-muted mb-4">

                                            {errorMessage}

                                        </p>


                                        <button
                                            type="button"
                                            className="btn btn-danger px-5"
                                            onClick={handleErrorClose}
                                        >

                                            Close

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="modal-backdrop fade show"></div>

                    </>

                )

            }

        </AdminLayout>

    );

}


export default EditProduct;