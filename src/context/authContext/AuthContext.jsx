import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                    setIsAuth(true);
                }
            } catch (error) {
                console.error("Authentication token invalid:", error);
                localStorage.removeItem("token");
                setIsAuth(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await authService.login(username, password);
            localStorage.setItem("token", response.accessToken);
            setUser(response);
            setIsAuth(true);
            navigate("/workout-builder");
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return {
                success: false,
                error: error.response?.data?.message || "Login failed. Please check your credentials."
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, email, password) => {
        setLoading(true);
        try {
            await authService.register(username, email, password);
            return { success: true };
        } catch (error) {
            console.error("Registration failed:", error);
            return {
                success: false,
                error: error.response?.data?.message || "Registration failed. Please try again."
            };
        } finally {
            setLoading(false);
        }
    };

    const updateUserInfo = async () => {
        try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error("Failed to update user info:", error);
            return {
                success: false,
                error: error.response?.data?.message || "Failed to update user information."
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                user,
                loading,
                login,
                register,
                logout,
                updateUserInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}