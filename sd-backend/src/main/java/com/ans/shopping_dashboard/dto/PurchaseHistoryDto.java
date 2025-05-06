package com.ans.shopping_dashboard.dto;

import com.ans.shopping_dashboard.model.PurchaseHistory;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * DTO for transferring purchase history data to the frontend
 */
public class PurchaseHistoryDto {
    private Long id;
    private String productName;
    private double price;
    private String store;
    private String purchaseDate;
    private String category;
    private String city;
    private String paymentMethod;

    public PurchaseHistoryDto() {
    }

    public PurchaseHistoryDto(Long id, String productName, double price, String store, 
                             LocalDateTime purchaseDate, String category, String city, 
                             String paymentMethod) {
        this.id = id;
        this.productName = productName;
        this.price = price;
        this.store = store;
        this.purchaseDate = formatDateTime(purchaseDate);
        this.category = category;
        this.city = city;
        this.paymentMethod = paymentMethod;
    }

    /**
     * Create a DTO from a PurchaseHistory entity
     */
    public static PurchaseHistoryDto fromEntity(PurchaseHistory entity) {
        return new PurchaseHistoryDto(
            entity.getId(),
            entity.getProductName(),
            entity.getPrice(),
            entity.getStore(),
            entity.getPurchaseDate(),
            entity.getCategory(),
            entity.getCity(),
            entity.getPaymentMethod()
        );
    }

    /**
     * Format LocalDateTime to a user-friendly string
     */
    private String formatDateTime(LocalDateTime dateTime) {
        if (dateTime == null) {
            return "";
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return dateTime.format(formatter);
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getStore() {
        return store;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}