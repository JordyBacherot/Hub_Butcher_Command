import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {useAuth} from "@/contexts/AuthProvider.tsx";
import {useLocation, useNavigate} from "react-router";
import {signOut} from "@/services/serviceSupabase.ts";

export default function Header() {
    const {setIsAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            signOut();
            setIsAuth(false);
            navigate("/login");
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }

    };

    function handleLogoClick() {
        if (location.pathname !== "/") {
            navigate("/");
        }
    }

    return (
        <header className="p-2 flex items-center flex-nowrap justify-between border-b border-gray-200 shadow-sm bg-white">
            <img src={logo} alt="Logo" className="h-23 md:h-28 lg:h-35" onClick={handleLogoClick} />

            <h1 className="text:lg sm:text-xl md:text-3xl font-semibold text-gray-800 text-center flex-1 mr-2" onClick={handleLogoClick}>
                Hub de Commande
            </h1>

            {location.pathname !== "/login" ? (
                <Button className="text-xs sm:text-sm lg:text-xl mr-2 ml-2 h-14 lg:h-20 lg:w-50" onClick={handleLogout}>
                    Se<br />Déconnecter
                </Button>
            ) : null}
        </header>
    );
}
