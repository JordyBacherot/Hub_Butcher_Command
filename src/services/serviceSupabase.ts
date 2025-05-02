import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

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

export async function getCommands(butcher_name : string = "") {
    if (!butcher_name) {
        const {data, error} = await supabase
            .from('commands')
            .select('*')
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
    else {
        const {data, error} = await supabase
            .from('commands')
            .select('*')
            .eq('butcher_name', butcher_name)
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
}

export async function addCommand(command : any){
    const { data, error } = await supabase
        .from('orders')
        .insert([
            {
                created_by: command.created_by,        
                product_name: command.product_name,
                description: command.description,
                quantity: command.quantity,
                status: command.status,
                butcher_sender: command.butcher_sender,
                butcher_receiver: command.butcher_receiver,
                finished_at: command.finished_at ?? null
            }
        ])
    if (error) {
        console.error('Erreur d’ajout de commande:', error)
    } else {
        console.log('Commande ajoutée avec succès:', data)
    }
}