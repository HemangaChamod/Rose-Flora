function DeleteConfirmModal({
    show,
    title,
    message,
    loading,
    onClose,
    onConfirm,
}) {

    if (!show) return null;

    return (

        <>
            <div
                className="modal fade show"
                style={{
                    display: "block",
                    background: "rgba(0,0,0,0.5)",
                }}
            >

                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title text-danger">

                                <i className="fas fa-trash-alt me-2"></i>

                                {title}

                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>

                        <div className="modal-body">

                            <p className="mb-2">

                                {message}

                            </p>

                            <small className="text-danger">

                                This action cannot be undone.

                            </small>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                                disabled={loading}
                            >

                                Cancel

                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={onConfirm}
                                disabled={loading}
                            >

                                {

                                    loading ?

                                        <>

                                            <span className="spinner-border spinner-border-sm me-2"></span>

                                            Deleting...

                                        </>

                                        :

                                        "Delete"

                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <div
                className="modal-backdrop fade show"
            ></div>
        </>

    );

}

export default DeleteConfirmModal;