package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.model.Purchase;
import com.ans.shopping_dashboard.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping("/add")
    public ResponseEntity<Purchase> addPurchase(@RequestBody Purchase purchase) {
        Purchase savedPurchase = purchaseService.save(purchase);  // Zapisuje zakup w bazie danych
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPurchase);
    }

    // Metoda pobierająca zakup po id
    @GetMapping("/{id}")
    public ResponseEntity<Purchase> getPurchaseById(@PathVariable Long id) {
        Purchase purchase = purchaseService.findById(id);  // Pobiera zakup po id
        if (purchase != null) {
            return ResponseEntity.ok(purchase);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @ExceptionHandler
    public ResponseEntity<String> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Błąd: " + ex.getMessage());
    }
}