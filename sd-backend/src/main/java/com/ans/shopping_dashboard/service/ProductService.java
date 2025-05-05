package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.repository.ProductRepository;
import com.ans.shopping_dashboard.dto.ProductDTO;
import com.ans.shopping_dashboard.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
                .map(p -> new ProductDTO(p.getId(), p.getProductName(), p.getPrice(), p.getStore(), p.getCity()))
                .collect(Collectors.toList());
    }
    public List<Product> searchByName(String keyword) {
        return productRepository.findByProductNameContainingIgnoreCase(keyword);
    }

    // Metoda do wyszukiwania najtańszych produktów w danym mieście
    public List<ProductDTO> findCheapestProductsByCity(String query, String city) {
        List<Product> products = productRepository.findByProductNameContainingIgnoreCaseAndCityIgnoreCase(query, city);
        return products.stream()
                .map(p -> new ProductDTO(p.getId(), p.getProductName(), p.getPrice(), p.getStore(), p.getCity()))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> searchProductsByName(String name) {
        // Logowanie zapytania
        System.out.println("Szukam produktów o nazwie: " + name);

        // Wykonanie zapytania do bazy
        List<Product> products = productRepository.searchByName(name);

        // Logowanie wyników
        System.out.println("Znalezione produkty: " + products);

        // Przekształcenie wyników na ProductDTO
        return products.stream()
                .map(p -> new ProductDTO(p.getId(), p.getProductName(), p.getPrice(), p.getStore()))
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
                .map(p -> new ProductDTO(p.getId(), p.getProductName(), p.getPrice(), p.getStore()))
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
                .map(p -> new ProductDTO(p.getId(), p.getProductName(), p.getPrice(), p.getStore(), p.getCity()))
                .collect(Collectors.toList());
    }

    // Metoda do wyszukiwania najtańszych produktów w danym mieście i zakresie dat
    public List<ProductDTO> findCheapestProductsByCity(String query, String city, LocalDate startDate, LocalDate endDate) {
        // Walidacja dat
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Data początkowa nie może być późniejsza niż data końcowa.");
        }

        List<Product> products;

        if (startDate == null || endDate == null) {
            // Jeśli daty nie są podane, szukaj tylko po nazwie i mieście
            products = productRepository.findByProductNameContainingIgnoreCaseAndCityIgnoreCase(query, city);
        } else {
            // Jeśli daty są podane, szukaj również po zakresie dat
            products = productRepository.findByNameCityAndDateRange(query, city, startDate, endDate);
        }

        return products.stream()
                .sorted(Comparator.comparing(Product::getPrice)) // Sortowanie po cenie
                .map(p -> new ProductDTO(p.getId(), p.getProductName(), p.getPrice(), p.getStore(), p.getCity()))
                .collect(Collectors.toList());
    }

    /**
     * Finds a product by store and product name, or creates a new one if it doesn't exist.
     * Always updates the price of the product.
     *
     * @param store The name of the store
     * @param productName The name of the product
     * @param price The price of the product
     * @param city The city where the store is located
     * @return The found or created product
     */
    public Product findOrCreateProductInStore(String store, String productName, Double price, String city) {
        return productRepository.findByStoreIgnoreCaseAndProductNameIgnoreCaseAndCityIgnoreCase(store, productName, city)
                .map(existingProduct -> {
                    // Always update the price
                    existingProduct.setPrice(price);
                    return productRepository.save(existingProduct);
                })
                .orElseGet(() -> {
                    Product newProduct = new Product();
                    newProduct.setProductName(productName);
                    newProduct.setStore(store);
                    newProduct.setPrice(price);
                    newProduct.setCity(city);
                    newProduct.setPurchaseDate(LocalDate.now());
                    // Set a default image URL or leave it null if it's not required
                    newProduct.setImageUrl("default.jpg");
                    return productRepository.save(newProduct);
                });
    }
}
