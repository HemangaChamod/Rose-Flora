import {
    createContext,
    useEffect,
    useState,
} from "react";

import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const res = await getCurrentUser();

            setUser(res.data.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (data) => {
        await loginUser(data);

        await loadUser();
    };

    const register = async (data) => {
        await registerUser(data);

        await loadUser();
    };

    const logout = async () => {
        await logoutUser();

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};