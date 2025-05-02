import {Routes, Route, Navigate, useLocation} from "react-router";
import Header from "@/components/uicreation/Header";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Butcher from "@/pages/Butcher.tsx";
import {useAuth} from "@/contexts/AuthProvider.tsx";

export default function App() {
    const { isAuth } = useAuth();
    const location = useLocation(); // Permet d'obtenir l'URL actuelle

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            isAuth ? <Navigate to="/" replace /> : <Login />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            isAuth ? (
                                <Home />
                            ) : (
                                <Navigate to="/login" state={{ from: location }} replace />
                            )
                        }
                    />
                    <Route
                        path="/boucherie/:village"
                        element={
                            isAuth ? (
                                <Butcher />
                            ) : (
                                <Navigate to="/login" state={{ from: location }} replace />
                            )
                        }
                    />
                </Routes>
            </main>
        </>
    );
}
