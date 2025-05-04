import { useParams } from "react-router";
import { boucheries, VillageKey } from "@/data/butchers_names.ts";
import AlertRedirection from "@/components/uicreation/AlertRedirection.tsx";
import BannerButcher from "@/components/uicreation/BannerButcher.tsx";
import CommandDialog from "@/components/uicreation/DialogCommand.tsx";
import CommandCards from "@/components/uicreation/CommandCards.tsx";
import {useState} from "react";
import CommandTypeToggle from "@/components/uicreation/CommandTypeToggle.tsx";
import CommandeFilterBar from "@/components/uicreation/CommandFilter.tsx";

export default function ButcherShop() {
    const { village } = useParams<{ village?: string }>();
    const [commandType, setCommandType] = useState<"send" | "receive">("receive");
    const isValidVillage = village && village in boucheries;
    const [filters, setFilters] = useState([true, true, false, false]);


    if (!isValidVillage) {
        return <AlertRedirection />;
    }

    const villageKey = village as VillageKey;

    return (
        <div className="">
            <BannerButcher village={villageKey} />

            <CommandTypeToggle commandType={commandType} setCommandType={setCommandType}/>
            <CommandeFilterBar filters={filters} setFilters={setFilters} />

            <CommandCards filters={ filters } receive_send={commandType} village={villageKey} />

            <CommandDialog village={villageKey} />

        </div>
    );
}
