package com.ans.shopping_dashboard.service;
import com.ans.shopping_dashboard.repository.ProductRepository;
import com.ans.shopping_dashboard.dto.ProductDTO;
import com.ans.shopping_dashboard.model.Product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDTO> findCheapestProducts(String query) {
        List<Product> products = productRepository.findByProductNameContainingIgnoreCase(query); // Poprawiona nazwa metody
        return products.stream()
                .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice(), p.getStore())) // Mapa do DTO
                .collect(Collectors.toList());
    }
}