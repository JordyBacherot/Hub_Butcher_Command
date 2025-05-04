import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CommandeFilterBarCheckboxProps = {
    filters: boolean[]; // [true, false, ...]
    setFilters: (filters: boolean[]) => void;
};

const filterLabels = [
    "Commandes après aujourd'hui",
    "Commandes à faire",
    "Commandes en livraison",
    "Commandes validées",
];

export default function CommandeFilterBarCheckbox({
                                                      filters,
                                                      setFilters,
                                                  }: CommandeFilterBarCheckboxProps) {
    const toggleCheckbox = (index: number) => {
        const updated = [...filters];
        updated[index] = !updated[index];
        setFilters(updated);
    };

    return (
        <div className="flex flex-wrap bg-zinc-50 p-2 rounded-md shadow-sm justify-between items-center gap-x-2 gap-y-1">
            {filterLabels.map((label, index) => (
                <div
                    key={index}
                    className="flex items-center space-x-1 text-xs w-[48%] sm:w-[48%] md:w-auto p-2"
                >
                    <Checkbox
                        id={`filter-${index}`}
                        checked={filters[index]}
                        onCheckedChange={() => toggleCheckbox(index)}
                    />
                    <Label htmlFor={`filter-${index}`} className="text-xs leading-tight">
                        {label}
                    </Label>

                </div>
            ))}
        </div>
    );
}
