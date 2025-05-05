package com.ans.shopping_dashboard.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    private String street;
    @JsonProperty("shopName")
    private String store;
    @JsonProperty("items")
    private List<ProductItemDTO> products;
    private Double totalPrice;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductItemDTO {
        @JsonProperty("productName")
        private String name;
        private Double price;
    }
}
