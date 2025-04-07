export interface Shop {
    id: number;
    name: string;
    city: string;
  }
  
  export interface Product {
    productId: number;
    productName: string;
    brand: string;
    weight: string;
    price: number; // Dodaj właściwość price
    imageUrl: string;  // Dodaj właściwość imageUrl
    name: string;      // Dodaj właściwość name
    store: string;     // Dodaj właściwość store
  }
  
  export interface ShoppingList {
    id: number;
    listName: string;
    shop: Shop;
  }
  
  export interface Purchase {
    id: number;
    product: Product;
    shopping: ShoppingList;
    price: number;
  }
  