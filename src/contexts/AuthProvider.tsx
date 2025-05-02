import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated } from "@/services/serviceSupabase.ts";

type AuthContextType = {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const result = await isAuthenticated();
                setIsAuth(result);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (loading) {
        return <div>Chargement...</div>; // Optionnel : loader ou splash screen
    }

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
