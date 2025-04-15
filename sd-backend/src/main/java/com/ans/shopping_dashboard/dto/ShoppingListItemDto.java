package com.ans.shopping_dashboard.dto;

public class ShoppingListItemDto {
    private String productName;
    private String storeName;
    private double price;

    public ShoppingListItemDto() {
    }

    public ShoppingListItemDto(String productName, String storeName, double price) {
        this.productName = productName;
        this.storeName = storeName;
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}