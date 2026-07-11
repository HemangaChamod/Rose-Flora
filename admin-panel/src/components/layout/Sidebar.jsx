import { useState } from "react";

import {
    NavLink,
} from "react-router-dom";

function Sidebar() {

    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

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

    const getNavLinkClass = ({ isActive }) => {

        return `
            d-flex
            align-items-center
            text-white
            px-4
            py-3
            text-decoration-none
            ${isActive ? "bg-success" : ""}
        `;

    };

    return (

        <>

            {/* Desktop Sidebar */}

            <div
                className="bg-dark text-white d-none d-lg-block flex-shrink-0"
                style={{
                    width: "260px",
                    minHeight: "100vh",
                }}
            >

                <h3 className="text-center py-4 mb-0">

                    LassanaFlora

                </h3>

                <nav>

                    {

                        navItems.map((item) => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={getNavLinkClass}
                            >

                                <i
                                    className={`${item.icon} me-3`}
                                    style={{
                                        width: "20px",
                                    }}
                                ></i>

                                {item.label}

                            </NavLink>

                        ))

                    }

                </nav>

            </div>


            {/* Mobile / Tablet Navigation */}

            <div className="d-lg-none w-100">

                <div className="bg-dark text-white px-3 py-3 d-flex justify-content-between align-items-center">

                    <h5 className="mb-0 fw-bold">

                        LassanaFlora

                    </h5>

                    <button
                        type="button"
                        className="btn btn-outline-light btn-sm"
                        onClick={() =>
                            setMobileMenuOpen(
                                (prev) => !prev
                            )
                        }
                        aria-label="Toggle navigation"
                    >

                        <i
                            className={
                                mobileMenuOpen
                                    ? "fas fa-times"
                                    : "fas fa-bars"
                            }
                        ></i>

                    </button>

                </div>


                {

                    mobileMenuOpen && (

                        <div className="bg-dark text-white shadow">

                            <nav>

                                {

                                    navItems.map((item) => (

                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            className={getNavLinkClass}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >

                                            <i
                                                className={`${item.icon} me-3`}
                                                style={{
                                                    width: "20px",
                                                }}
                                            ></i>

                                            {item.label}

                                        </NavLink>

                                    ))

                                }

                            </nav>

                        </div>

                    )

                }

            </div>

        </>

    );

}

export default Sidebar;