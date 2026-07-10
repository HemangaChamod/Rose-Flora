import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import CategoryForm from "../../components/category/CategoryForm";

import { createCategory } from "../../services/categoryService";

function AddCategory() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {

        try {

            setLoading(true);

            await createCategory(data);

            navigate("/categories");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Unable to create category."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AdminLayout>

            <h2 className="mb-4">
                Add Category
            </h2>

            <div className="card shadow-sm">

                <div className="card-body">

                    <CategoryForm
                        loading={loading}
                        onSubmit={handleSubmit}
                    />

                </div>

            </div>

        </AdminLayout>

    );

}

export default AddCategory;