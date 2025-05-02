import { useParams } from "react-router";
import { boucheries, VillageKey } from "@/data/butchers_names.ts";

export default function Butcher() {
    const { village } = useParams<{ village: string }>();

    const data = village && boucheries[village as VillageKey];

    if (!data) {
        return <h1>Cette boucherie n'existe pas</h1>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{data.nom}</h1>
        </div>
    );
}
