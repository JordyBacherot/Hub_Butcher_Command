import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCommand } from "@/services/serviceSupabase.ts";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { toast } from "sonner"
import {format} from "date-fns";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon, Plus} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Command } from "@/types/command.ts";
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select";
type CommandDialogProps = {
    village: string;
};


export default function DialogAddCommand({ village }: CommandDialogProps) {
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<Date>()
    const [butcherShopSender, setButcherShopSender] = useState(village);
    const [butcherShopReceiver, setButcherShopReceiver] = useState(village === "mercurey" ? "saint-remy" : "mercurey");
    const [openAlert, setOpenAlert] = useState(false);
    const [openDialog, setOpenDialog] = useState(false); // Pour contrôler l'ouverture/fermeture du Dialog


    async function handleAddCommand(command: Command) {
        const response = await addCommand(command);
        console.log(response);
    }

    async function submitForm() {
        if (!productName || !quantity || !date) {
            setOpenAlert(true);
            return;
        }

        const command: Command = {
            product_name: productName,
            description,
            quantity,
            butcher_shop_sender: butcherShopSender,
            butcher_shop_receiver: butcherShopReceiver,
            command_date: date ? date : new Date(),
        };

        await handleAddCommand(command);

        // Ferme la fenêtre après succès
        setOpenDialog(false);

        // Réinitialise les champs
        setProductName("");
        setDescription("");
        setQuantity("");

        // Affiche un toast de succès
        toast("Commande ajoutée", {
            description: `Le produit "${productName}" a bien été ajouté.`,
            action: {
                label: "Fermer",
                onClick: () => console.log("Fermer"),
            },
        })
    }

    return (
        <>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button
                        className="fixed bottom-6 right-6 w-20 h-16 rounded-3xl"
                        size={"icon"}
                        onClick={() => setOpenDialog(true)}
                    >
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent aria-describedby="dialog-description">
                    <DialogHeader>
                        <DialogTitle className="pb-2">Créer une commande</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="product">Produit</Label>
                            <Input className="mt-2"
                                   id="product"
                                   value={productName}
                                   placeholder="Produit"
                                   onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input className="mt-2"
                                   id="description"
                                   value={description}
                                   placeholder="Description (Non Obligatoire)"
                                   onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="quantity">Quantité</Label>
                            <Input className="mt-2"
                                   id="quantity"
                                   value={quantity}
                                   placeholder="1kg / 2L / 3 pièces"
                                   onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="date" className="pb-2">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date ? format(date, "PPP") : <span>Choisir une date limite de préparation / livraison</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-4 flex flex-col sm:flex-row justify-between">
                            <div>
                                <Label className="text-gray-500 font-medium pb-2">🔽 Demandeur de la commande</Label>
                                <Select value={butcherShopSender} onValueChange={(value) => {
                                    setButcherShopSender(value);
                                    // Pour éviter que sender et receiver soient égaux
                                    if (value === butcherShopReceiver) {
                                        setButcherShopReceiver(value === "mercurey" ? "saint-remy" : "mercurey");
                                    }
                                }}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Choisir" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mercurey">mercurey</SelectItem>
                                        <SelectItem value="saint-remy">saint-remy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-gray-500 font-medium pb-2">🔼 Créateur de la commande</Label>
                                <Select value={butcherShopReceiver} onValueChange={(value) => {
                                    setButcherShopReceiver(value);
                                    if (value === butcherShopSender) {
                                        setButcherShopSender(value === "mercurey" ? "saint-remy" : "mercurey");
                                    }
                                }}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Choisir" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mercurey">mercurey</SelectItem>
                                        <SelectItem value="saint-remy">saint-remy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button className="flex w-30 h-10 ml-auto" onClick={submitForm}>
                            Envoyer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Erreur</AlertDialogTitle>
                        <AlertDialogDescription>
                            Le produit, la quantité et la date sont obligatoires.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                            Fermer
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => setOpenAlert(false)}>
                            Ok
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
