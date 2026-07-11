import api from "./api";

export const getOrders = async (params = {}) => {

    const res = await api.get("/orders", {
        params,
    });

    return res.data;

};

export const getOrder = async (id) => {

    const res = await api.get(`/orders/${id}`);

    return res.data;

};

export const updateOrderStatus = async (
    id,
    orderStatus
) => {

    const res = await api.patch(
        `/orders/${id}/status`,
        {
            orderStatus,
        }
    );

    return res.data;

};

export const updatePaymentStatus = async (
    id,
    paymentStatus
) => {

    const res = await api.patch(
        `/orders/${id}/payment-status`,
        {
            paymentStatus,
        }
    );

    return res.data;

};