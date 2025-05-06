package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.PurchaseHistory;
import com.ans.shopping_dashboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
    
    /**
     * Find all purchase history records for a specific user
     * @param user The user whose purchase history to retrieve
     * @return List of purchase history records
     */
    List<PurchaseHistory> findByUser(User user);
    
    /**
     * Find all purchase history records for a specific user, ordered by purchase date (newest first)
     * @param user The user whose purchase history to retrieve
     * @return List of purchase history records ordered by purchase date
     */
    List<PurchaseHistory> findByUserOrderByPurchaseDateDesc(User user);
    
    /**
     * Find purchase history records for a specific user within a date range
     * @param user The user whose purchase history to retrieve
     * @param startDate The start date of the range
     * @param endDate The end date of the range
     * @return List of purchase history records within the date range
     */
    List<PurchaseHistory> findByUserAndPurchaseDateBetween(User user, LocalDateTime startDate, LocalDateTime endDate);
    
    /**
     * Find purchase history records for a specific user and store
     * @param user The user whose purchase history to retrieve
     * @param store The store to filter by
     * @return List of purchase history records for the specified store
     */
    List<PurchaseHistory> findByUserAndStore(User user, String store);
    
    /**
     * Find purchase history records for a specific user and product name (partial match)
     * @param user The user whose purchase history to retrieve
     * @param productName The product name to search for
     * @return List of purchase history records matching the product name
     */
    List<PurchaseHistory> findByUserAndProductNameContainingIgnoreCase(User user, String productName);
}