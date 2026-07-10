import { useEffect, useState } from "react";
import slugify from "slugify";

import { getCategories } from "../../services/categoryService";

import ProductImageUpload from "./ProductImageUpload";

function ProductForm({
    initialData = {},
    onSubmit,
    loading,
}) {

    const [categories, setCategories] = useState([]);

    const [images, setImages] = useState([]);

    const [form, setForm] = useState({
        name: initialData.name || "",
        slug: initialData.slug || "",
        shortDescription: initialData.shortDescription || "",
        fullDescription: initialData.fullDescription || "",
        regularPrice: initialData.regularPrice || "",
        salePrice: initialData.salePrice || "",
        quantity: initialData.quantity || 0,
        sku: initialData.sku || "",
        categoryId: initialData.categoryId || "",
        featured: initialData.featured || false,
        newArrival: initialData.newArrival || false,
        tags: "",
    });

    useEffect(() => {

        loadCategories();

    }, []);

    useEffect(() => {

    if (!initialData?.id) return;

    setForm({

        name: initialData.name || "",

        slug: initialData.slug || "",

        shortDescription:
            initialData.shortDescription || "",

        fullDescription:
            initialData.fullDescription || "",

        regularPrice:
            initialData.regularPrice || "",

        salePrice:
            initialData.salePrice || "",

        quantity:
            initialData.quantity || 0,

        sku:
            initialData.sku || "",

        categoryId:
            initialData.categoryId || "",

        featured:
            initialData.featured || false,

        newArrival:
            initialData.newArrival || false,

        tags:
            initialData.tags
                ?.map(item => item.tag.name)
                .join(", ") || "",

    });

    setImages(initialData.images || []);

}, [initialData]);

    const loadCategories = async () => {

        try {

            const res = await getCategories();

            setCategories(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const generateSku = (name) => {

        if (!name) return "";

        const prefix = name
            .replace(/[^A-Za-z]/g, "")
            .substring(0, 3)
            .toUpperCase();

        const random = Math.floor(
            1000 + Math.random() * 9000
        );

        return `${prefix}-${random}`;

    };

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        if (name === "name") {

        setForm(prev => ({

            ...prev,

            name: value,

            slug: slugify(value, {
                lower: true,
                strict: true,
            }),

            sku:
                prev.sku === ""
                    ? generateSku(value)
                    : prev.sku,

        }));

        return;

    }

        setForm((prev) => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({

            ...form,

            tags: form.tags
                .split(",")
                .map(tag => tag.trim())
                .filter(Boolean),

            images,

        });

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label className="form-label fw-semibold">

                        Product Name

                    </label>

                    <input
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label fw-semibold">

                        Slug

                    </label>

                    <input
                        className="form-control"
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label className="form-label fw-semibold">

                        SKU

                    </label>

                    <input
                        className="form-control"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label fw-semibold">

                        Category

                    </label>

                    <select
                        className="form-select"
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">

                            Select Category

                        </option>

                        {

                            categories.map(category => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >

                                    {category.name}

                                </option>

                            ))

                        }

                    </select>

                </div>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label className="form-label fw-semibold">

                        Regular Price

                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="regularPrice"
                        value={form.regularPrice}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label fw-semibold">

                        Sale Price

                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="salePrice"
                        value={form.salePrice}
                        onChange={handleChange}
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label fw-semibold">

                        Stock Quantity

                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="row mb-4">

                <div className="col-md-6">

                    <div className="form-check form-switch">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="featured"
                            checked={form.featured}
                            onChange={handleChange}
                        />

                        <label className="form-check-label">

                            Featured Product

                        </label>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="form-check form-switch">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="newArrival"
                            checked={form.newArrival}
                            onChange={handleChange}
                        />

                        <label className="form-check-label">

                            New Arrival

                        </label>

                    </div>

                </div>

            </div>

            <div className="mb-4">

                <label className="form-label fw-semibold">

                    Short Description

                </label>

                <textarea
                    rows={3}
                    className="form-control"
                    name="shortDescription"
                    value={form.shortDescription}
                    onChange={handleChange}
                    placeholder="Enter a short description..."
                    required
                />

            </div>

            <div className="mb-4">

                <label className="form-label fw-semibold">

                    Full Description

                </label>

                <textarea
                    rows={7}
                    className="form-control"
                    name="fullDescription"
                    value={form.fullDescription}
                    onChange={handleChange}
                    placeholder="Enter the full product description..."
                    required
                />

            </div>

            <div className="mb-4">

                <label className="form-label fw-semibold">

                    Tags

                </label>

                <input
                    type="text"
                    className="form-control"
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="rose, bouquet, birthday, gift"
                />

                <small className="text-muted">

                    Separate tags using commas.

                </small>

            </div>

            <div className="mb-5">

                <ProductImageUpload
                    images={images}
                    setImages={setImages}
                    maxImages={4}
                />

            </div>

            <div className="d-flex justify-content-end">

                <button
                    type="submit"
                    className="btn btn-success px-5"
                    disabled={loading}
                >

                    {

                        loading

                            ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    />

                                    Saving...

                                </>

                            )

                            : initialData?.id
                                ? "Update Product"
                                : "Save Product"

                    }

                </button>

            </div>

        </form>

    );

}

export default ProductForm;