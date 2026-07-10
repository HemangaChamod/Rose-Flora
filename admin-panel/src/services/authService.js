import api from "./api";

export const loginAdmin = async (data) => {
    const res = await api.post("/auth/admin/login", data);
    return res.data;
};

export const getCurrentAdmin = async () => {
    const res = await api.get("/auth/admin/me");
    return res.data;
};

export const logoutAdmin = async () => {
    const res = await api.post("/auth/admin/logout");
    return res.data;
};