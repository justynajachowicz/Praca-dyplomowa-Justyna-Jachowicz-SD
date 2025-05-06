package com.ans.shopping_dashboard.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private double price;
    private String store;
    
    @Column(nullable = false)
    private LocalDateTime purchaseDate;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    // Optional fields for additional information
    private String category;
    private String city;
    private String paymentMethod;
    
    // Constructor with essential fields
    public PurchaseHistory(String productName, double price, String store, LocalDateTime purchaseDate, User user) {
        this.productName = productName;
        this.price = price;
        this.store = store;
        this.purchaseDate = purchaseDate;
        this.user = user;
    }
    
    // Factory method to create from PurchaseItem
    public static PurchaseHistory fromPurchaseItem(PurchaseItem item) {
        PurchaseHistory history = new PurchaseHistory();
        history.setProductName(item.getProductName());
        history.setPrice(item.getPrice());
        history.setStore(item.getStore());
        history.setPurchaseDate(LocalDateTime.now());
        history.setUser(item.getUser());
        return history;
    }
}