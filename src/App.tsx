import {Routes, Route, Navigate, useLocation} from "react-router";
import Header from "@/components/uicreation/Header";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ButcherShop from "@/pages/ButcherShop.tsx";
import {useAuth} from "@/contexts/AuthProvider.tsx";
import Background from "@/components/uicreation/Background.tsx";
import {Toaster} from "sonner";

export default function App() {
    const { isAuth } = useAuth();
    const location = useLocation(); // Permet d'obtenir l'URL actuelle

    return (
        <>
            <Background>
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
                                    <ButcherShop />
                                ) : (
                                    <Navigate to="/login" state={{ from: location }} replace />
                                )
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
                <Toaster />
            </Background>
        </>
    );
}
