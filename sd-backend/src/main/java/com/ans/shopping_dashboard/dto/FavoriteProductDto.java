package com.ans.shopping_dashboard.dto;

import java.time.LocalDateTime;

public class FavoriteProductDto {
    private Long id;
    private Long productId;
    private String productName;
    private Double price;
    private boolean notifyOnPromotion;
    private LocalDateTime dateAdded;
    private String imageUrl;

    public FavoriteProductDto() {
    }

    public FavoriteProductDto(Long id, Long productId, String productName, Double price, boolean notifyOnPromotion, LocalDateTime dateAdded, String imageUrl) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.notifyOnPromotion = notifyOnPromotion;
        this.dateAdded = dateAdded;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public boolean isNotifyOnPromotion() {
        return notifyOnPromotion;
    }

    public void setNotifyOnPromotion(boolean notifyOnPromotion) {
        this.notifyOnPromotion = notifyOnPromotion;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
