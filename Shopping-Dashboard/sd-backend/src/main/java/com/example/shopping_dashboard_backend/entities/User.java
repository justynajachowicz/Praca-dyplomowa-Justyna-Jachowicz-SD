package com.example.shopping_dashboard_backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "\"user\"") // Poprawka: Nazwa tabeli opakowana w podwójne cudzysłowy
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Dodanie generacji ID
    private Long id;
    private String username;
    private String password;
    private boolean enabled;

    // Gettery i Settery

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
