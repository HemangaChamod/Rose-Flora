import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import ProductForm from "../../components/product/ProductForm";

import { createProduct } from "../../services/productService";

function AddProduct() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {

        try {

            setLoading(true);

            await createProduct(data);

            alert("Product created successfully.");

            navigate("/products");

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

        </AdminLayout>

    );

}

export default AddProduct;