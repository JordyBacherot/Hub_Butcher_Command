import { createClient } from '@supabase/supabase-js'
import { Command } from '../types/command'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)


type GetCommandsParams = {
    filters: boolean[]; // [date, à faire, en livraison, validée]
    receive_send: "send" | "receive";
    village: string;
};

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) {
        throw new Error(error.message)
    }
    return data
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        throw new Error(error.message)
    }
}

export async function isAuthenticated() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        throw new Error(error.message)
    }
    return data.session !== null
}

export async function getUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
        throw new Error(error.message)
    }
    return data.user
}

export async function getCommands({filters, receive_send, village}: GetCommandsParams) {
    let query = supabase
        .from("command")
        .select("*")
        .order("command_date", { ascending: true });

    // Boucherie concernée (envoyeur ou receveur)
    const butcherColumn =
        receive_send === "send" ? "butcher_shop_sender" : "butcher_shop_receiver";

    query = query.eq(butcherColumn, village);

    // Commandes après aujourd’hui
    if (filters[0]) {
        const today = new Date().toISOString().split("T")[0];
        query = query.gte("command_date", today);
    }

    // Statuts multiples combinés
    const statusFilters: string[] = [];
    if (filters[1]) statusFilters.push("à faire");
    if (filters[2]) statusFilters.push("en livraison");
    if (filters[3]) statusFilters.push("validée");

    if (statusFilters.length > 0) {
        query = query.in("status", statusFilters);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Erreur Supabase : ", error.message);
        return [];
    }

    return data;
}

export async function addCommand(command : Command){
    console.log(await getUser())
    const { data, error } = await supabase
        .from('command')
        .insert([
            {
                user_id: (await getUser())?.id,
                product_name: command.product_name,
                description: command.description,
                quantity: command.quantity,
                status: "à faire",
                butcher_shop_sender: command.butcher_shop_sender,
                butcher_shop_receiver: command.butcher_shop_receiver,
                command_date: command.command_date,
            }
        ])
    if (error) {
        console.error('Erreur d’ajout de commande:', error)
    } else {
        console.log('Commande ajoutée avec succès:', data)
    }
}

export async function updateCommand(command : Command) {
    const { id, ...fieldsToUpdate } = command;
    console.log(command.command_date)

    const { data, error } = await supabase
        .from("command")
        .update(fieldsToUpdate)
        .eq("id", id)
        .select();

    if (error) {
        console.error('Erreur de mise à jour de la commande:', error)
    } else {
        console.log('Commande mise à jour avec succès :', data)
    }
}

export async function updateCommandStatus(commandId : number, newStatus: string) {
    const {data, error } = await supabase
        .from('command')
        .update({ status: newStatus })
        .eq('id', commandId)
        .select()

    if (error) {
        console.error('Erreur de mise à jour de la commande:', error)
    } else {
        console.log('Commande mise à jour avec succès :', data)
    }
}