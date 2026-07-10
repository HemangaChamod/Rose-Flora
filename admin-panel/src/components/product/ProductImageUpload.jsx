import { useRef, useState } from "react";
import { uploadImages } from "../../services/productService";

function ProductImageUpload({
    images,
    setImages,
    maxImages = 4,
}) {

    const inputRef = useRef(null);

    const [uploading, setUploading] = useState(false);

    const handleSelect = async (e) => {

        const files = Array.from(e.target.files);

        if (files.length === 0) return;

        if (images.length + files.length > maxImages) {

            alert(`Maximum ${maxImages} images allowed.`);

            return;

        }

        const formData = new FormData();

        files.forEach(file => {
            formData.append("images", file);
        });

        try {

            setUploading(true);

            const res = await uploadImages(formData);

            setImages(prev => [
                ...prev,
                ...res.data,
            ]);

        } catch (err) {

            console.log(err);

            alert("Image upload failed.");

        } finally {

            setUploading(false);

            inputRef.current.value = "";

        }

    };

    const removeImage = (index) => {

        setImages(prev =>
            prev.filter((_, i) => i !== index)
        );

    };

    return (

        <div>

            <label className="form-label fw-semibold">

                Product Images

            </label>

            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                className="form-control"
                onChange={handleSelect}
            />

            <small className="text-muted">

                Maximum {maxImages} images

            </small>

            {

                uploading && (

                    <div className="mt-3">

                        <div className="spinner-border spinner-border-sm me-2"></div>

                        Uploading...

                    </div>

                )

            }

            <div className="row mt-4">

                {

                    images.map((image, index) => (

                        <div
                            className="col-md-3 mb-3"
                            key={index}
                        >

                            <div className="card">

                                <img
                                    src={image.imageUrl}
                                    className="card-img-top"
                                    style={{
                                        height: 180,
                                        objectFit: "cover",
                                    }}
                                />

                                <div className="card-body p-2">

                                    {

                                        index === 0 && (

                                            <span className="badge bg-success mb-2">

                                                Main Image

                                            </span>

                                        )

                                    }

                                    <button
                                        className="btn btn-danger btn-sm w-100"
                                        type="button"
                                        onClick={() => removeImage(index)}
                                    >

                                        Remove

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ProductImageUpload;