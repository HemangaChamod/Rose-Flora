import api from "./api";


export const createCODOrder = async (data) => {

    const response = await api.post(
        "/orders/cod",
        data
    );

    return response.data;

};


export const createCardOrder = async (data) => {

    const response = await api.post(
        "/orders/card",
        data
    );

    return response.data;

};


export const verifyCheckoutSuccess = async (
    sessionId
) => {

    const response = await api.get(
        `/orders/checkout-success/${sessionId}`
    );

    return response.data.data;

};


export const getMyOrders = async () => {

    const response = await api.get(
        "/orders/my-orders"
    );

    return response.data.data;

};


export const getMyOrder = async (id) => {

    const response = await api.get(
        `/orders/my-orders/${id}`
    );

    return response.data.data;

};