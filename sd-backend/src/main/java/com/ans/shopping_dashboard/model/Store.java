package com.ans.shopping_dashboard.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;  // Nazwa sklepu

    @Column(nullable = false)
    private String city;  // Miasto, w którym znajduje się sklep

    // Możesz także dodać inne pola, jeśli są potrzebne, np. adres, kod pocztowy, etc.
}