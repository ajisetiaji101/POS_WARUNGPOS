export default interface Product {
    id?: number;
    serial_number?: string;
    product_name?: string;
    product_price?: number;
    product_image?: string;
    stok?: number;
    product_sold?: number;
    product_sold_over?: number;
    created_date?:  Date;

    selected: false;

    //cart
    total?: number;
}