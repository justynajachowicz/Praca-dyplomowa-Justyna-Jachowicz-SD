export interface FavoriteProduct {
  id?: number;
  productId: number;
  productName: string;
  userEmail: string;
  price?: number;
  notifyOnPromotion: boolean;
  dateAdded?: string;
  imageUrl?: string;
}
