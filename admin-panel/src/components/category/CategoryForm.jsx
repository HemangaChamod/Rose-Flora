import { useState } from "react";
import slugify from "slugify";

function CategoryForm({
    initialData = {},
    onSubmit,
    loading,
}) {

    const [form, setForm] = useState({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "name") {

            setForm((prev) => ({
                ...prev,
                name: value,
                slug: slugify(value, {
                    lower: true,
                    strict: true,
                }),
            }));

            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(form);

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label fw-semibold">
                    Category Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="e.g. Birthday Flowers"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label fw-semibold">
                    Slug
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="slug"
                    placeholder="birthday-flowers"
                    value={form.slug}
                    onChange={handleChange}
                    required
                />

                <small className="text-muted">
                    Automatically generated from the category name. You can edit it if needed.
                </small>

            </div>

            <div className="mb-4">

                <label className="form-label fw-semibold">
                    Description
                </label>

                <textarea
                    rows="4"
                    className="form-control"
                    name="description"
                    placeholder="Enter a short description..."
                    value={form.description}
                    onChange={handleChange}
                />

            </div>

            <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Category"}
            </button>

        </form>

    );

}

export default CategoryForm;