import api from "./api";


export const getProfile = async () => {

    const response =
        await api.get(
            "/customer/profile"
        );


    return response.data.data;

};


export const updateProfile = async (
    data
) => {

    const response =
        await api.put(
            "/customer/profile",
            data
        );


    return response.data;

};


export const changePassword = async (
    data
) => {

    const response =
        await api.put(
            "/customer/change-password",
            data
        );


    return response.data;

};


export const getMyOrders = async () => {

    const response =
        await api.get(
            "/customer/orders"
        );


    return response.data.data;

};