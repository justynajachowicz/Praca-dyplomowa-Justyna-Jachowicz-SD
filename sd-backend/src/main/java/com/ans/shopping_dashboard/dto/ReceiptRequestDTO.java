package com.ans.shopping_dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptRequestDTO {
    private String city;
    private String address;
    private String store;
    private List<ProductItemDTO> products;
    private Double totalPrice;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductItemDTO {
        private String name;
        private Double price;
    }
}