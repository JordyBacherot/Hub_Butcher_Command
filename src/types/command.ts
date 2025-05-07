
export type Command = {
    id?: number;
    user_id?: string;
    product_name: string;
    description: string;
    quantity: string;
    butcher_shop_sender: string;
    butcher_shop_receiver: string;
    command_date: Date;
    status?: string;
};