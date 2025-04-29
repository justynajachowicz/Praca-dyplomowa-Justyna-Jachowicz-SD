package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.FavoriteProductDto;
import com.ans.shopping_dashboard.model.Product;

import java.util.List;

public interface FavoriteService {

    /**
     * Add a product to a user's favorites
     * @param product The product to add to favorites
     * @param email The email of the user
     * @param notifyOnPromotion Whether to notify the user of promotions for this product
     * @return A message indicating success or failure
     */
    String addToFavorites(Product product, String email, boolean notifyOnPromotion);

    /**
     * Get all favorite products for a user
     * @param email The email of the user
     * @return A list of favorite products
     */
    List<FavoriteProductDto> getFavoritesByEmail(String email);

    /**
     * Remove a product from a user's favorites
     * @param id The ID of the favorite to remove
     */
    void removeFromFavorites(Long id);

    /**
     * Check if a product is in a user's favorites
     * @param productId The ID of the product
     * @param email The email of the user
     * @return True if the product is in the user's favorites, false otherwise
     */
    boolean isProductInFavorites(Long productId, String email);

    /**
     * Get promotions for a user's favorite products
     * @param email The email of the user
     * @return A list of products that are on promotion and match the user's favorites
     */
    List<Product> getPromotionsForUser(String email);
}
