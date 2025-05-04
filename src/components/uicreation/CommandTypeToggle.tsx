import { Button } from "@/components/ui/button";

type CommandType = "send" | "receive";

type CommandTypeToggleProps = {
    commandType: CommandType;
    setCommandType: (type: CommandType) => void;
};

export default function CommandTypeToggle({ commandType, setCommandType }: CommandTypeToggleProps) {
    return (
        <div className="flex ">
            <Button
                variant="ghost"
                className={`flex-1 rounded-none transition-colors lg:text-lg ${
                    commandType === "receive"
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
                }`}
                onClick={() => setCommandType("receive")}
            >
                Commandes demandées
            </Button>
            <Button
                variant="ghost"
                className={`flex-1 rounded-none transition-colors lg:text-lg ${
                    commandType === "send"
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
                }`}
                onClick={() => setCommandType("send")}
            >
                Commandes envoyées
            </Button>

        </div>
    );
}
