import api from "./api";


export const createCardPayment = async (data) => {

    const response = await api.post(
        "/payments/create-payment-intent",
        data
    );

    return response.data;

};