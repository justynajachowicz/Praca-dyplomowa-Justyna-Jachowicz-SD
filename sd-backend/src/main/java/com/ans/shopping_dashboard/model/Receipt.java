package com.ans.shopping_dashboard.model;  // Ścieżka do pakietu

import jakarta.persistence.*;


import java.util.List;

@Entity
@Table(name = "receipts")  // Określa nazwę tabeli w bazie danych
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Generowanie wartości id (autoincrement)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id")  // Powiązanie z użytkownikiem
    private User user;  // Relacja z użytkownikiem
    private String imagePath;  // Ścieżka do zdjęcia paragonu
    private String shopName;   // Nazwa sklepu
    private String date;       // Data zakupu
    private double totalPrice; // Całkowita cena paragonu

    // Relacja 1 do N: Paragon ma wiele produktów
    @OneToMany(mappedBy = "receipt", cascade = CascadeType.ALL)
    private List<ReceiptItem> items;  // Lista produktów na paragonie

    // Konstruktory
    public Receipt() {}

    public Receipt(String imagePath, String shopName, String date, double totalPrice, List<ReceiptItem> items) {
        this.imagePath = imagePath;
        this.shopName = shopName;
        this.date = date;
        this.totalPrice = totalPrice;
        this.items = items;
    }

    // Gettery i settery
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<ReceiptItem> getItems() {
        return items;
    }

    public void setItems(List<ReceiptItem> items) {
        this.items = items;
    }
}