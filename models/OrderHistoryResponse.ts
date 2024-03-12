import type Product from "./Product";

export default interface OrderHistoryResponse {
    order_id: number;
    warung_id: string;
    user_id: number;
    user_name: string;
    order_total: number;
    invoice: string;
    discount: number;
    pajak: number;
    qty: number;
    order_price: number;
    list_product: Product[];
};