package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.model.Product;
import com.ans.shopping_dashboard.repository.ProductListRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductListRepository productListRepository;

    public ProductController(ProductListRepository productListRepository) {
        this.productListRepository = productListRepository;
    }

    @GetMapping
    public List<Product> getAllProducts(@RequestParam(value = "name", required = false) String name) {
        if (name != null && !name.isEmpty()) {
            return productListRepository.findByProductNameContainingIgnoreCase(name);
        }
        return productListRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        // Logowanie przed zapisaniem produktu
        System.out.println("Received product: " + product);

        // Zapisanie produktu
        Product savedProduct = productListRepository.save(product);

        // Zwrócenie odpowiedzi z zapisanym produktem
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productListRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productListRepository.existsById(id)) {
            productListRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}