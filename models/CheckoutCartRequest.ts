import type CheckoutProductRequest from "./CheckoutProductRequest";

export default interface CheckoutCartRequest{
    list_item: CheckoutProductRequest[];
    invoice: string;
    total_price: number;
    pajak: number;
    discount: number;
    qtyCart: number;
}