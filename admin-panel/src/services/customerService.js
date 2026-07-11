import api from "./api";

export const getCustomers = async () => {

    const res = await api.get("/customer");

    return res.data;

};

export const getCustomer = async (id) => {

    const res = await api.get(
        `/customer/${id}`
    );

    return res.data;

};