import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const navItems = [

        {
            path: "/dashboard",
            icon: "fas fa-chart-line",
            label: "Dashboard",
        },

        {
            path: "/products",
            icon: "fas fa-box",
            label: "Products",
        },

        {
            path: "/categories",
            icon: "fas fa-list",
            label: "Categories",
        },

        {
            path: "/orders",
            icon: "fas fa-shopping-cart",
            label: "Orders",
        },

        {
            path: "/customers",
            icon: "fas fa-users",
            label: "Customers",
        },

    ];

    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth >= 992) {

                setIsOpen(false);

            }

        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );

    }, []);

    useEffect(() => {

        if (isOpen) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";

        }

        return () => {

            document.body.style.overflow = "";

        };

    }, [isOpen]);

    const getNavClass = ({ isActive }) =>

        `d-flex align-items-center px-4 py-3 text-decoration-none text-white ${

            isActive

                ? "bg-success"

                : ""

        }`;

    return (

        <>

            {/* ===============================
                Mobile Header
            =============================== */}

            <header
                className="d-lg-none bg-dark text-white d-flex justify-content-between align-items-center px-3"
                style={{
                    height: "64px",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1040,
                }}
            >

                <h5
                    className="mb-0 fw-bold"
                >

                    Rose Flora

                </h5>

                <button
                    className="btn btn-outline-light"
                    onClick={() =>
                        setIsOpen(true)
                    }
                >

                    <i className="fas fa-bars"></i>

                </button>

            </header>

            {/* ===============================
                Backdrop
            =============================== */}

            {

                isOpen && (

                    <div

                        onClick={() =>
                            setIsOpen(false)
                        }

                        style={{

                            position: "fixed",

                            inset: 0,

                            background:
                                "rgba(0,0,0,.45)",

                            zIndex: 1045,

                        }}

                    />

                )

            }

            {/* ===============================
                Mobile Sidebar
            =============================== */}

            <aside

                className="bg-dark text-white d-lg-none"

                style={{

                    position: "fixed",

                    top: 0,

                    left: isOpen ? 0 : "-270px",

                    width: "260px",

                    height: "100vh",

                    transition:
                        "left .3s ease",

                    zIndex: 1050,

                    overflowY: "auto",

                    boxShadow:
                        "0 0 20px rgba(0,0,0,.4)",

                }}

            >

                <div
                    className="d-flex justify-content-between align-items-center border-bottom border-secondary px-3"
                    style={{
                        height: "64px",
                    }}
                >

                    <h5 className="mb-0 fw-bold">

                        Rose Flora

                    </h5>

                    <button
                        className="btn btn-light btn-sm"
                        onClick={() =>
                            setIsOpen(false)
                        }
                    >

                        <i className="fas fa-times"></i>

                    </button>

                </div>

                <nav className="pt-2">

                    {

                        navItems.map((item) => (

                            <NavLink

                                key={item.path}

                                to={item.path}

                                className={getNavClass}

                                onClick={() =>
                                    setIsOpen(false)
                                }

                            >

                                <i
                                    className={`${item.icon} me-3`}
                                    style={{
                                        width: "22px",
                                    }}
                                ></i>

                                {item.label}

                            </NavLink>

                        ))

                    }

                </nav>

            </aside>

            {/* ===============================
                Desktop Sidebar
            =============================== */}

            <aside

                className="bg-dark text-white d-none d-lg-flex flex-column"

                style={{

                    width: "260px",

                    minHeight: "100vh",

                    position: "sticky",

                    top: 0,

                    flexShrink: 0,

                }}

            >

                <div
                    className="border-bottom border-secondary"
                    style={{
                        padding: "24px",
                    }}
                >

                    <h3
                        className="fw-bold text-center mb-0"
                    >

                        Rose Flora

                    </h3>

                </div>

                <nav className="pt-2 flex-grow-1">

                    {

                        navItems.map((item) => (

                            <NavLink

                                key={item.path}

                                to={item.path}

                                className={getNavClass}

                            >

                                <i
                                    className={`${item.icon} me-3`}
                                    style={{
                                        width: "22px",
                                    }}
                                ></i>

                                {item.label}

                            </NavLink>

                        ))

                    }

                </nav>

            </aside>

        </>

    );

}

export default Sidebar;