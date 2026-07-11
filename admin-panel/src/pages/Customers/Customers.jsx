import { useEffect, useState } from "react";

import AdminLayout from "../../components/layout/AdminLayout";
import CustomerTable from "../../components/customer/CustomerTable";

import {
    getCustomers,
} from "../../services/customerService";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const loadCustomers = async () => {

        try {

            setLoading(true);

            const res = await getCustomers();

            setCustomers(res.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load customers.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadCustomers();

    }, []);

    const filteredCustomers = customers.filter(
        (customer) => {

            const query = search.toLowerCase();

            const fullName =
                `${customer.firstName} ${customer.lastName}`
                    .toLowerCase();

            return (
                fullName.includes(query) ||
                customer.email
                    ?.toLowerCase()
                    .includes(query) ||
                customer.phone
                    ?.toLowerCase()
                    .includes(query)
            );

        }
    );

    return (

        <AdminLayout>

            <div className="container-fluid">

                <div className="mb-4">

                    <h2 className="fw-bold mb-1">

                        Customers

                    </h2>

                    <p className="text-muted mb-0">

                        View registered customers and customer activity.

                    </p>

                </div>

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        <div className="row mb-4">

                            <div className="col-md-5">

                                <div className="input-group">

                                    <span className="input-group-text bg-white">

                                        <i className="fas fa-search"></i>

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name, email or phone..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                        {

                            loading ? (

                                <div className="text-center py-5">

                                    <div className="spinner-border text-success"></div>

                                    <p className="mt-3 mb-0">

                                        Loading customers...

                                    </p>

                                </div>

                            ) : (

                                <CustomerTable
                                    customers={filteredCustomers}
                                />

                            )

                        }

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Customers;