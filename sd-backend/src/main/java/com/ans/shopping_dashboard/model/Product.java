package com.ans.shopping_dashboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "price", nullable = false)
    private Double price;  // Typ danych, który będzie przechowywał cenę produktu

    @Column(name = "store", nullable = false)  // Sprawdź, czy 'nullable' jest ustawione na 'false'
    private String store;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    // Dodane pole purchaseDate typu LocalDate
    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    // Gettery i settery
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getProductId() {
        return id;
    }

    // Getter i setter dla purchaseDate
    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }}