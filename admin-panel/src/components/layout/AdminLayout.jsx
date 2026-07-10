import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout({ children }) {
    return (
        <div className="d-flex">

            <Sidebar />

            <div
                className="flex-grow-1"
                style={{
                    minHeight: "100vh",
                    background: "#f5f6fa",
                }}
            >
                <Navbar />

                <div className="p-4">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default AdminLayout;