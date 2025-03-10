package com.ans.shopping_dashboard.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    // Metoda obsługująca zapytanie GET z parametrem 'q'
    @GetMapping
    public ResponseEntity<String> getAdminData(@RequestParam(required = false) String q) {
        if (q != null) {
            // Przetwarzanie zapytania, np. wyszukiwanie w bazie danych
            return ResponseEntity.ok("Szukasz: " + q);
        } else {
            return ResponseEntity.badRequest().body("Brak parametru 'q'");
        }
    }
}