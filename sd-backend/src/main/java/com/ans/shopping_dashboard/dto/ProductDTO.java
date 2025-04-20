package com.ans.shopping_dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private double price;
    private String store;
    private String city;

    // Constructor without city for backward compatibility
    public ProductDTO(Long id, String name, double price, String store) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.store = store;
    }

    // Constructor with city
    public ProductDTO(Long id, String name, double price, String store, String city) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.store = store;
        this.city = city;
    }
}
