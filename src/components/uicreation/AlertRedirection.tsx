import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";

export default function AlertRedirection() {
    const navigate = useNavigate();

    const handleAlertRedirection = () => {
        navigate("/");
    }

    return(
        <Alert className="w-2/3 mx-auto mt-4 h-auto flex flex-col items-center text-center gap-4">
            <AlertTitle className="text-xl">Attention !</AlertTitle>
            <AlertDescription>
                Vous n'êtes pas sur la bonne page !<br />
                Cette boucherie n'existe pas ou n'est pas encore disponible.
            </AlertDescription>
            <Button className="w-48" onClick={handleAlertRedirection}>
                Revenir à l'accueil
            </Button>
        </Alert>
    )
}