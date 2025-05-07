import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils.ts";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Command } from "@/types/command.ts";
import { updateCommand } from "@/services/serviceSupabase.ts";

type ModifyDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    command: Command | null;
    onSave: () => void;
};

export default function DialogModifyCommand({open, onOpenChange, command, onSave}: ModifyDialogProps) {
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [command_date, setCommandDate] = useState<Date>();
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        if (command) {
            setProductName(command.product_name);
            setQuantity(command.quantity);
            setDescription(command.description || "");
            setCommandDate(new Date(command.command_date));
        }
    }, [command]);

    function fixDateForFrance(date: Date): Date {
        // Décalage entre l'heure locale et UTC (en minutes)
        const localOffsetMinutes = date.getTimezoneOffset(); // ex: -120 pour UTC+2

        // Convertir ce décalage en millisecondes
        const offsetInMs = localOffsetMinutes * -1 * 60 * 1000;

        // Créer une nouvelle date corrigée
        return new Date(date.getTime() + offsetInMs);
    }

    async function submitUpdate() {
        if (!productName || !quantity || !command_date || !command?.id) {
            setAlertOpen(true);
            return;
        }

        const commandDateWithOffset = fixDateForFrance(command_date);

        const updatedCommand: Command = {
            ...command,
            product_name: productName,
            quantity,
            description,
            command_date : commandDateWithOffset ,
        };

        await updateCommand(updatedCommand);

        toast("Commande modifiée", {
            description: `La commande a été mise à jour.`,
        });

        onOpenChange(false);
        onSave();
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifier la commande</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Produit</Label>
                            <Input
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Nom du produit"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="(optionnelle)"
                            />
                        </div>
                        <div>
                            <Label>Quantité</Label>
                            <Input
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Ex: 2kg"
                            />
                        </div>
                        <div>
                            <Label>Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !command_date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {command_date ? format(command_date, "PPP") : <span>Choisir une date limite de préparation / livraison</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={command_date}
                                        onSelect={setCommandDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Button onClick={submitUpdate}>Enregistrer</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Champs manquants</AlertDialogTitle>
                        <AlertDialogDescription>
                            Le produit, la quantité et la date sont obligatoires.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Fermer</AlertDialogCancel>
                        <AlertDialogAction>Ok</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
