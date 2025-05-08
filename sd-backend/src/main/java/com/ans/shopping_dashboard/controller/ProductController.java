package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.dto.ProductDTO;
import com.ans.shopping_dashboard.service.ProductService;
import com.ans.shopping_dashboard.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;


    // Konstruktor z wstrzykiwaniem zależności
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

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

    @GetMapping("/cheapest")
    public ResponseEntity<List<ProductDTO>> findCheapestProducts(
            @RequestParam String query,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "startDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<ProductDTO> products;

        // Jeśli podano miasto, wywołaj metodę z filtrowaniem po mieście
        if (city != null && !city.isEmpty()) {
            products = productService.findCheapestProductsByCity(query, city, startDate, endDate);
        } else {
            // W przeciwnym razie wywołaj standardową metodę
            products = productService.findCheapestProducts(query, startDate, endDate);
        }

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
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


    // Usunięcie produktu
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.deleteProduct(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/products/cheapest")
    public ResponseEntity<List<Product>> findCheapestProducts(
            @RequestParam String query,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        // Twoja logika wyszukiwania produktów

        return null;



    }
    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam(value = "name") String name) {
        List<ProductDTO> products = productService.searchProductsByName(name);  // Wywołanie metody wyszukiwania w serwisie

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();  // Zwrócenie pustej odpowiedzi, jeśli brak produktów
        }
        return ResponseEntity.ok(products);  // Zwrócenie wyników wyszukiwania
    }

    /**
     * Gets a list of distinct store names in a given city.
     *
     * @param city The city to search in
     * @return A set of distinct store names
     */
    @GetMapping("/stores")
    public ResponseEntity<Set<String>> getStoresByCity(@RequestParam String city) {
        Set<String> stores = productService.getStoresByCity(city);

        if (stores.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(stores);
    }

    /**
     * Gets a list of products in a specific store and city.
     *
     * @param store The store name
     * @param city The city name
     * @return A list of products
     */
    @GetMapping("/by-store")
    public ResponseEntity<List<ProductDTO>> getProductsByStoreAndCity(
            @RequestParam String store,
            @RequestParam String city) {
        List<ProductDTO> products = productService.getProductsByStoreAndCity(store, city);

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }
}
