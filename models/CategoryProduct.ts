export default interface CategoryProduct {
    id?: number;
    category_name?: string;
    category_reference?: string;
    sub_category?: CategoryProduct[];
}