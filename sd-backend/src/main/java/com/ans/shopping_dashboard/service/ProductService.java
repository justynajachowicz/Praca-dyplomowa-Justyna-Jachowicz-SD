package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.repository.ProductRepository;
import com.ans.shopping_dashboard.dto.ProductDTO;
import com.ans.shopping_dashboard.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // Metoda do wyszukiwania najtańszych produktów
    public List<ProductDTO> findCheapestProducts(String query) {
        List<Product> products = productRepository.findByProductNameContainingIgnoreCase(query);
        return products.stream()
                .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice(), p.getStore()))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> searchProductsByName(String name) {
        // Logowanie zapytania
        System.out.println("Szukam produktów o nazwie: " + name);

        // Wykonanie zapytania do bazy
        List<Product> products = productRepository.findByProductNameContainingIgnoreCase(name);

        // Logowanie wyników
        System.out.println("Znalezione produkty: " + products);

        // Przekształcenie wyników na ProductDTO
        return products.stream()
                .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice(), p.getStore()))
                .collect(Collectors.toList());
    }

    // Metoda do dodania produktu
    public Product addProduct(Product product) {
        return productRepository.save(product);  // Zapisanie produktu w bazie
    }

    // Metoda do pobrania produktu po ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);  // Pobranie produktu po ID
    }

    // Metoda do usunięcia produktu
    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);  // Usunięcie produktu po ID
            return true;
        }
        return false;
    }
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice(), p.getStore()))
                .collect(Collectors.toList());
    }
    public List<ProductDTO> findCheapestProducts(String query, LocalDate startDate, LocalDate endDate) {
        // Walidacja dat
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Data początkowa nie może być późniejsza niż data końcowa.");
        }

        List<Product> products;

        if (startDate == null || endDate == null) {
            // Jeśli daty nie są podane, szukaj tylko po nazwie
            products = productRepository.findByProductNameContainingIgnoreCase(query);
        } else {
            // Jeśli daty są podane, szukaj również po zakresie dat
            products = productRepository.findByNameAndDateRange(query, startDate, endDate);
        }

        return products.stream()
                .sorted(Comparator.comparing(Product::getPrice)) // Sortowanie po cenie
                .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice(), p.getStore()))
                .collect(Collectors.toList());
    }
}