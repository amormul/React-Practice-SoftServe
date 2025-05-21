import React, {createContext, useContext, useEffect, useState} from "react";

interface User {
    user_id: string;
    name: string;
    email: string;
    role_id: string;
    exp: number;

    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function parseJwt(token: string): User | null {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error parsing JWT token:", e);
        return null;
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const parsed = parseJwt(storedToken);
            if (parsed && parsed.exp * 1000 > Date.now()) {
                return parsed;
            } else {
                // Token expired, remove it
                console.log("Token expired on load, removing");
                localStorage.removeItem("token");
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        if (token) {
            const parsed = parseJwt(token);
            if (parsed && parsed.exp * 1000 > Date.now()) {
                console.log("Valid token detected, user authenticated:", parsed);
                setUser(parsed);
            } else {
                console.log("Invalid or expired token detected, logging out");
                logout();
            }
        } else {
            console.log("No token found, user is not authenticated");
        }
    }, [token]);

    // Add a timer to check token expiration periodically
    useEffect(() => {
        const checkTokenInterval = setInterval(() => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                const parsed = parseJwt(storedToken);
                if (!parsed || parsed.exp * 1000 <= Date.now()) {
                    console.log("Token expired during session, logging out");
                    logout();
                }
            }
        }, 60000); // Check every minute
        
        return () => clearInterval(checkTokenInterval);
    }, []);

    const login = (newToken: string) => {
        console.log("Login called with new token");
        localStorage.setItem("token", newToken);
        setToken(newToken);
        const parsed = parseJwt(newToken);
        if (parsed) {
            console.log("User authenticated:", parsed);
            setUser(parsed);
        } else {
            console.error("Failed to parse user from token");
        }
    };

    const logout = () => {
        console.log("Logging out user");
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const authValue = {
        user, 
        token, 
        login, 
        logout, 
        isAuthenticated: !!user
    };

    console.log("Auth state:", { isAuthenticated: !!user, hasToken: !!token, userRole: user?.role_id });

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
