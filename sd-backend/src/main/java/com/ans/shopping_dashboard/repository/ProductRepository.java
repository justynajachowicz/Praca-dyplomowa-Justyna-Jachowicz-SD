package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByProductNameContainingIgnoreCase(String Name);
}