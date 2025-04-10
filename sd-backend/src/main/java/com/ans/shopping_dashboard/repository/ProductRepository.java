package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Wyszukiwanie po nazwie produktu (ignorując wielkość liter)
    List<Product> findByProductNameContainingIgnoreCase(String name);

    // Wyszukiwanie po nazwie produktu i zakresie dat
    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) LIKE LOWER(CONCAT('%', :name, '%'))" +
            " AND p.purchaseDate BETWEEN :startDate AND :endDate ORDER BY p.price ASC")
    List<Product> findByNameAndDateRange(
            @Param("name") String name,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}