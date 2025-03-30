package com.ans.shopping_dashboard.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PurchaseDTO {
    private String productName;
    private Double price;
    private String store;
    private LocalDate purchaseDate;
}