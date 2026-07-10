import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div
            className="bg-dark text-white"
            style={{
                width: "260px",
                minHeight: "100vh",
            }}
        >

            <h3
                className="text-center py-4"
            >
                LassanaFlora
            </h3>

            <NavLink
                to="/dashboard"
                className="d-block text-white px-4 py-3 text-decoration-none"
            >
                <i className="fas fa-chart-line me-2"></i>

                Dashboard

            </NavLink>

            <NavLink
                to="/products"
                className="d-block text-white px-4 py-3 text-decoration-none"
            >
                <i className="fas fa-box me-2"></i>

                Products

            </NavLink>

            <NavLink
                to="/categories"
                className="d-block text-white px-4 py-3 text-decoration-none"
            >
                <i className="fas fa-list me-2"></i>

                Categories

            </NavLink>

            <NavLink
                to="/orders"
                className="d-block text-white px-4 py-3 text-decoration-none"
            >
                <i className="fas fa-shopping-cart me-2"></i>

                Orders

            </NavLink>

            <NavLink
                to="/customers"
                className="d-block text-white px-4 py-3 text-decoration-none"
            >
                <i className="fas fa-users me-2"></i>

                Customers

            </NavLink>

        </div>

    );

}

export default Sidebar;