import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout({ children }) {

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f5f6fa",
            }}
        >

            <div
                className="d-flex"
                style={{
                    minHeight: "100vh",
                }}
            >

                {/* Sidebar */}

                <Sidebar />

                {/* Main Content */}

                <div
                    className="flex-grow-1"
                    style={{
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >

                    {/* Desktop Navbar */}

                    <div className="d-none d-lg-block">

                        <Navbar />

                    </div>

                    {/* Content */}

                    <main
                        className="flex-grow-1"
                        style={{

                            overflowX: "hidden",

                            padding: "24px",

                            marginTop:
                                window.innerWidth < 992
                                    ? "64px"
                                    : "0",

                        }}
                    >

                        {children}

                    </main>

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;