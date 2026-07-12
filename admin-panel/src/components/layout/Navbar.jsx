import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {

    const { admin, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    return (

        <div
            className="bg-white shadow-sm px-4 mb-3 py-3 d-flex justify-content-between align-items-center"
        >

            <h5 className="mb-0">
                Admin Dashboard
            </h5>

            <div>

                <span className="me-3">

                    {admin?.firstName}

                </span>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Navbar;