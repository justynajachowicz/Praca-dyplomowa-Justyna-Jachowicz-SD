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

    @Column
    private String address;  // Adres sklepu

    // Konstruktor z polami name, city i address
    public Store(String name, String city, String address) {
        this.name = name;
        this.city = city;
        this.address = address;
    }
}
