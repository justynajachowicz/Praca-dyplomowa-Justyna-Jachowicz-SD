package com.ans.shopping_dashboard.model;

import jakarta.persistence.*;




@Entity
@Table(name = "receipt_items")
public class ReceiptItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;  // Nazwa produktu
    private double price;        // Cena produktu
    private int quantity;        // Ilość produktu

    @ManyToOne
    @JoinColumn(name = "receipt_id")
    private Receipt receipt;  // Paragon, do którego należy ten produkt

    // Konstruktory
    public ReceiptItem() {}

    public ReceiptItem(String productName, double price, int quantity, Receipt receipt) {
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.receipt = receipt;
    }

    // Gettery i settery
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Receipt getReceipt() {
        return receipt;
    }

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }
}