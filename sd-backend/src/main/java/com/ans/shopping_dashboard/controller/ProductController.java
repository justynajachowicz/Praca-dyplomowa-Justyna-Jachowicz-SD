package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.dto.ProductDTO;
import com.ans.shopping_dashboard.service.ProductService;
import com.ans.shopping_dashboard.model.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    // Konstruktor z wstrzykiwaniem zależności
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Metoda do pobrania wszystkich produktów lub wyszukiwania po nazwie
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts(@RequestParam(value = "name", required = false) String name) {
        List<ProductDTO> products;
        if (name != null && !name.isEmpty()) {
            products = productService.findCheapestProducts(name);  // Logika wyszukiwania w serwisie
        } else {
            products = productService.getAllProducts();  // Metoda do pobrania wszystkich produktów
        }

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();  // Zwrócenie pustej odpowiedzi, jeśli brak produktów
        }
        return ResponseEntity.ok(products);
    }

    // Dodanie produktu
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.addProduct(product);  // Użycie serwisu do zapisu produktu
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    // Pobranie produktu po ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)  // Użycie serwisu do pobierania produktu
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/cheapest")
    public List<ProductDTO> findCheapestProducts(@RequestParam String query) {
        return productService.findCheapestProducts(query);
    }

    // Usunięcie produktu
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.deleteProduct(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}