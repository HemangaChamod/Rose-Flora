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

    useEffect(() => {

        loadProduct();

    }, []);

    const loadProduct = async () => {

        try {

            const res = await getProduct(id);

            setProduct(res.data);

        } catch (err) {

            console.error(err);

            alert("Unable to load product.");

            navigate("/products");

        } finally {

            setPageLoading(false);

        }

    };

    const handleSubmit = async (data) => {

        try {

            setLoading(true);

            await updateProduct(id, data);

            alert("Product updated successfully.");

            navigate("/products");

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to update product."
            );

        } finally {

            setLoading(false);

        }

    };

    if (pageLoading) {

        return (

            <AdminLayout>

                <div className="text-center py-5">

                    <div className="spinner-border text-success"></div>

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

                <div className="mb-4">

                    <h2 className="fw-bold">

                        Edit Product

                    </h2>

                    <p className="text-muted">

                        Update product information.

                    </p>

                </div>

                <div className="card shadow-sm">

                    <div className="card-body">

                        <ProductForm
                            initialData={product}
                            loading={loading}
                            onSubmit={handleSubmit}
                        />

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default EditProduct;