/**
 * Model for purchase history items
 */
export interface PurchaseHistory {
    id?: number;
    productName: string;
    price: number;
    store: string;
    purchaseDate: string;
    category?: string;
    city?: string;
    paymentMethod?: string;
}