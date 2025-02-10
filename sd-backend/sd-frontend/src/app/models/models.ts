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
  