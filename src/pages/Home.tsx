import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 h-140 lg:h-200">
            <Button
                onClick={() => navigate("/boucherie/mercurey")}
                className="bg-[#800020] hover:bg-[#a52a2a] text-white text-2xl lg:text-4xl font-semibold px-12 py-8 rounded-2xl shadow-lg w-full md:w-2/5 h-60 lg:h-90"
            >
                Mercurey 🍷
            </Button>
            <Button
                onClick={() => navigate("/boucherie/saint-remy")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-2xl lg:text-4xl font-semibold px-12 py-8 rounded-2xl shadow-lg w-full md:w-2/5 h-60 lg:h-90"
            >
                Saint-Remy 🕳️
            </Button>
        </div>
    );
}
