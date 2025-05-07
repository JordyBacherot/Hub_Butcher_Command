import { useEffect, useState } from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { getCommands } from "@/services/serviceSupabase";
import { cn } from "@/lib/utils";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select";
import { updateCommandStatus } from "@/services/serviceSupabase";
import {Badge} from "@/components/ui/badge";
import {toast} from "sonner";
import { Command } from "@/types/command.ts";
import {Button} from "@/components/ui/button";
import DialogModifyCommand from "@/components/uicreation/DialogModifyCommand.tsx";

type CommandCardsProps = {
    filters: boolean[];
    receive_send: "send" | "receive";
    village: string;
};

export default function CommandCards({ filters, receive_send, village }: CommandCardsProps) {
    const [commands, setCommands] = useState<Command[]>([]);
    const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openModify, setOpenModify] = useState(false);



    useEffect(() => {
        async function fetchCommands() {
            try {
                const data = await getCommands({ filters, receive_send, village });
                setCommands(data);
            } catch (err) {
                setError("Erreur lors du chargement des commandes.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCommands();
    }, [filters, receive_send, village]);

    if (loading) {
        return <p className="text-center mt-10 text-muted-foreground">Chargement des commandes...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    if (commands.length === 0) {
        return <p className="text-center mt-10 text-muted-foreground">Aucune commande disponible.</p>;
    }

    function formatDateFr(dateStr: string) {
        const parsedDate = new Date(dateStr);
        const formatted = format(parsedDate, "d MMMM yyyy", { locale: fr });
        return formatted.startsWith("1 ") ? formatted.replace("1 ", "1er ") : formatted;
    }

    function getStatusEmoji(status: string) {
        switch (status) {
            case "en_attente":
                return "⏳";
            case "en_livraison":
                return "🚚";
            case "validée":
                return "✅";
            default:
                return "📦";
        }
    }

    const handleStatusChange = async () => {
        if (!selectedCommand) return;
        try {
            toast("Statut mis à jour", {
                description: "Le statut de la commande a été mis à jour avec succès.",
                action: {
                    label: "Fermer",
                    onClick: () => console.log("Fermer"),
                },
            })
        } catch (error) {
            toast("Erreur dans le changement de statut", {
                description: "Une erreur est survenue lors de la mise à jour du statut.",
                action: {
                    label: "Fermer",
                    onClick: () => console.log("Fermer"),
                },
            })
            console.error(error);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {commands.map((command, index) => (
                    <Card
                        key={index} // ← important aussi pour la clé
                        onClick={() => setSelectedCommand(command)}
                        className={cn(
                        "rounded-xl shadow-sm cursor-pointer hover:bg-muted/50 transition border-l-4",
                        command.status === "validée" && "border-l-green-500",
                        command.status === "en livraison" && "border-l-blue-500",
                        command.status === "à faire" && "border-l-yellow-500"
                    )}>
                        <CardContent className="text-sm  space-y-2">
                            {/* Haut : Titre + Date */}
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold">{command.product_name}</h3>
                                <Badge className="text-sm font-medium h-8">
                                    {formatDateFr(command.command_date.toString()!)}
                                </Badge>
                            </div>

                            {/* Milieu : Description */}
                            {command.description && (
                                <p className="text-gray-600 text-sm">Description : {command.description}</p>
                            )}

                            {/* Quantité */}
                            <p className="text-sm pt-2 font-medium text-gray-800">
                                Quantité : <span className="font-semibold">{command.quantity}</span>
                            </p>

                            {/* Bas : Statut avec Emoji */}
                            <div className="pt-2 justify-end flex">
                                <span className={cn(
                                    "text-lg font-medium flex items-center gap-1",
                                    command.status === "à faire" && "text-yellow-700",
                                    command.status === "en livraison" && "text-blue-700",
                                    command.status === "validée" && "text-green-700"
                                )}>
                                  {getStatusEmoji(command.status!)} {command.status}
                                </span>
                            </div>
                        </CardContent>

                    </Card>
                ))}
            </div>

            <Dialog open={!!selectedCommand} onOpenChange={() => setSelectedCommand(null)}>
                <DialogContent className="rounded-xl p-6 space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-primary">Détails de la commande</DialogTitle>
                    </DialogHeader>

                    {selectedCommand && (
                        <div className="space-y-4 text-sm">
                            {/* Titre et date */}
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold">{selectedCommand.product_name}</h3>
                                <Badge className=" text-sm font-medium h-10">
                                    📅 {formatDateFr(selectedCommand.command_date.toString()!)}
                                </Badge>
                            </div>

                            {/* Description */}
                            {selectedCommand.description && (
                                <p className="text-gray-600">Description : {selectedCommand.description}</p>
                            )}

                            {/* Quantité */}
                            <p className="text-sm pt-1 font-medium text-gray-800">
                                <span className="font-medium">Quantité :</span> {selectedCommand.quantity}
                            </p>

                            {/* Expéditeur et Destinataire */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <p className="font-medium text-gray-500">🔽 Demandeur de la commande :</p>
                                    <p>{selectedCommand.butcher_shop_receiver}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-500">🔼 Créateur de la commande :</p>
                                    <p>{selectedCommand.butcher_shop_sender}</p>
                                </div>
                            </div>

                            {/* Sélecteur de statut */}
                            <div className="space-y-1">
                                <p className="text-sm text-gray-600 font-medium">🛠️ Modifier le statut :</p>
                                <Select
                                    value={selectedCommand.status}
                                    onValueChange={async (newStatus) => {
                                        try {
                                            await updateCommandStatus(selectedCommand.id!, newStatus);
                                            setCommands((prev) =>
                                                prev.map((cmd) =>
                                                    cmd.id === selectedCommand.id ? { ...cmd, status: newStatus } : cmd
                                                )
                                            );
                                            setSelectedCommand({ ...selectedCommand, status: newStatus });
                                            await handleStatusChange()
                                        } catch (err) {
                                            console.error("Erreur lors de la mise à jour du statut :", err);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="à faire">⏳ À faire</SelectItem>
                                        <SelectItem value="en livraison">🚚 En livraison</SelectItem>
                                        <SelectItem value="validée">✅ Validée</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <Button onClick={() => setOpenModify(true)}>
                        Modifier cette commande
                    </Button>
                </DialogContent>
            </Dialog>
            <DialogModifyCommand
                open={openModify}
                onOpenChange={(open) => {
                    setOpenModify(open);
                    if (!open) {
                        setSelectedCommand(null);
                    }
                }}
                command={selectedCommand}
                onSave={async () => {
                    const refreshed = await getCommands({ filters, receive_send, village });
                    setCommands(refreshed);
                    setOpenModify(false);
                    setSelectedCommand(null);
                }}
            />
        </>
    );
}
