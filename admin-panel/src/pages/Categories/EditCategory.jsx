import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import CategoryForm from "../../components/category/CategoryForm";

import {
    getCategory,
    updateCategory,
} from "../../services/categoryService";

function EditCategory() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState({});

    useEffect(() => {

        loadCategory();

    }, []);

    const loadCategory = async () => {

        const res = await getCategory(id);

        setCategory(res.data);

    };

    const handleSubmit = async (data) => {

        try {

            setLoading(true);

            await updateCategory(id, data);

            navigate("/categories");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Unable to update category."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AdminLayout>

            <h2 className="mb-4">
                Edit Category
            </h2>

            <div className="card shadow-sm">

                <div className="card-body">

                    <CategoryForm
                        initialData={category}
                        loading={loading}
                        onSubmit={handleSubmit}
                    />

                </div>

            </div>

        </AdminLayout>

    );

}

export default EditCategory;