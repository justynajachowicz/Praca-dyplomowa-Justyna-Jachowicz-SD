package com.ans.shopping_dashboard.repository;
import java.util.List;
import com.ans.shopping_dashboard.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface ProductListRepository extends JpaRepository<Product, Long> {
    // Metoda wyszukiwania
    List<Product> findByProductNameContainingIgnoreCase(String productName);



}
