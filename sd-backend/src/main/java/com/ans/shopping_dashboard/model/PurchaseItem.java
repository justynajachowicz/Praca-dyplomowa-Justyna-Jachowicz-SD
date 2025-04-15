package com.ans.shopping_dashboard.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;


@Entity
@Table(name = "purchases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private double price;
    private String store;
    private LocalDate purchaseDate;

    public void setProductPrice(double price) {
        this.price = price;
    }
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    public void setUser(User user) {
        this.user = user;
    }


}