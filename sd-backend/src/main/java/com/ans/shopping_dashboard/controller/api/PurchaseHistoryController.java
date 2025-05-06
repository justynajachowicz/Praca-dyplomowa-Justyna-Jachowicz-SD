package com.ans.shopping_dashboard.controller.api;

import com.ans.shopping_dashboard.dto.PurchaseHistoryDto;
import com.ans.shopping_dashboard.service.PurchaseHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/purchase-history")
@CrossOrigin(origins = "http://localhost:4200")
public class PurchaseHistoryController {

    private final PurchaseHistoryService purchaseHistoryService;

    @Autowired
    public PurchaseHistoryController(PurchaseHistoryService purchaseHistoryService) {
        this.purchaseHistoryService = purchaseHistoryService;
    }

    /**
     * Get all purchase history for a user
     * @param email The user's email
     * @return List of purchase history DTOs
     */
    @GetMapping
    public ResponseEntity<List<PurchaseHistoryDto>> getPurchaseHistory(@RequestParam String email) {
        List<PurchaseHistoryDto> historyList = purchaseHistoryService.getPurchaseHistoryByEmail(email);
        return ResponseEntity.ok(historyList);
    }

    /**
     * Get purchase history for a user within a date range
     * @param email The user's email
     * @param startDate The start date of the range
     * @param endDate The end date of the range
     * @return List of purchase history DTOs
     */
    @GetMapping("/date-range")
    public ResponseEntity<List<PurchaseHistoryDto>> getPurchaseHistoryByDateRange(
            @RequestParam String email,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<PurchaseHistoryDto> historyList = purchaseHistoryService.getPurchaseHistoryByDateRange(email, startDate, endDate);
        return ResponseEntity.ok(historyList);
    }

    /**
     * Get purchase history for a user and store
     * @param email The user's email
     * @param store The store to filter by
     * @return List of purchase history DTOs
     */
    @GetMapping("/store")
    public ResponseEntity<List<PurchaseHistoryDto>> getPurchaseHistoryByStore(
            @RequestParam String email,
            @RequestParam String store) {
        List<PurchaseHistoryDto> historyList = purchaseHistoryService.getPurchaseHistoryByStore(email, store);
        return ResponseEntity.ok(historyList);
    }

    /**
     * Search purchase history by product name
     * @param email The user's email
     * @param productName The product name to search for
     * @return List of purchase history DTOs
     */
    @GetMapping("/search")
    public ResponseEntity<List<PurchaseHistoryDto>> searchPurchaseHistory(
            @RequestParam String email,
            @RequestParam String productName) {
        List<PurchaseHistoryDto> historyList = purchaseHistoryService.searchPurchaseHistory(email, productName);
        return ResponseEntity.ok(historyList);
    }

    /**
     * Delete a purchase history record
     * @param id The ID of the purchase history to delete
     * @return Success message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePurchaseHistory(@PathVariable Long id) {
        purchaseHistoryService.deletePurchaseHistory(id);
        return ResponseEntity.ok("Purchase history deleted successfully");
    }

    /**
     * Complete a purchase by moving items from shopping list to purchase history
     * @param email The user's email
     * @return Success message with number of items moved
     */
    @PostMapping("/complete")
    public ResponseEntity<String> completePurchase(@RequestParam String email) {
        int itemCount = purchaseHistoryService.completePurchase(email);
        return ResponseEntity.ok(String.format("Purchase completed successfully. %d items moved to purchase history.", itemCount));
    }
}