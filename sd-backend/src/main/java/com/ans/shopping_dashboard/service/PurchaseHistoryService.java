package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.PurchaseHistoryDto;
import com.ans.shopping_dashboard.model.PurchaseHistory;
import com.ans.shopping_dashboard.model.PurchaseItem;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for managing purchase history
 */
public interface PurchaseHistoryService {
    
    /**
     * Save a purchase history record
     * @param purchaseHistory The purchase history to save
     * @return The saved purchase history
     */
    PurchaseHistory savePurchaseHistory(PurchaseHistory purchaseHistory);
    
    /**
     * Create a purchase history record from a purchase item
     * @param purchaseItem The purchase item to convert
     * @return The created purchase history
     */
    PurchaseHistory createFromPurchaseItem(PurchaseItem purchaseItem);
    
    /**
     * Get all purchase history for a user
     * @param email The user's email
     * @return List of purchase history DTOs
     */
    List<PurchaseHistoryDto> getPurchaseHistoryByEmail(String email);
    
    /**
     * Get purchase history for a user within a date range
     * @param email The user's email
     * @param startDate The start date of the range
     * @param endDate The end date of the range
     * @return List of purchase history DTOs
     */
    List<PurchaseHistoryDto> getPurchaseHistoryByDateRange(String email, LocalDateTime startDate, LocalDateTime endDate);
    
    /**
     * Get purchase history for a user and store
     * @param email The user's email
     * @param store The store to filter by
     * @return List of purchase history DTOs
     */
    List<PurchaseHistoryDto> getPurchaseHistoryByStore(String email, String store);
    
    /**
     * Search purchase history by product name
     * @param email The user's email
     * @param productName The product name to search for
     * @return List of purchase history DTOs
     */
    List<PurchaseHistoryDto> searchPurchaseHistory(String email, String productName);
    
    /**
     * Delete a purchase history record
     * @param id The ID of the purchase history to delete
     */
    void deletePurchaseHistory(Long id);
    
    /**
     * Complete a purchase by moving items from shopping list to purchase history
     * @param email The user's email
     * @return Number of items moved to purchase history
     */
    int completePurchase(String email);
}