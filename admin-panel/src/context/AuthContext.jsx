import { createContext, useEffect, useState } from "react";

import {
    loginAdmin,
    logoutAdmin,
    getCurrentAdmin,
} from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [admin, setAdmin] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAdmin();
    }, []);

    const loadAdmin = async () => {

        try {

            const res = await getCurrentAdmin();

            setAdmin(res.data);

        } catch {

            setAdmin(null);

        } finally {

            setLoading(false);

        }

    };

    const login = async (data) => {

        await loginAdmin(data);

        await loadAdmin();

    };

    const logout = async () => {

        await logoutAdmin();

        setAdmin(null);

    };

    return (
        <AuthContext.Provider
            value={{
                admin,
                loading,
                login,
                logout,
                refreshAdmin: loadAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}