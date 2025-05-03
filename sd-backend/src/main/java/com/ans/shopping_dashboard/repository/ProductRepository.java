package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchByName(@Param("keyword") String keyword);

    // Wyszukiwanie po nazwie produktu (ignorując wielkość liter)
    List<Product> findByProductNameContainingIgnoreCase(String name);

    // Wyszukiwanie po nazwie produktu i mieście (ignorując wielkość liter)
    List<Product> findByProductNameContainingIgnoreCaseAndCityIgnoreCase(String name, String city);

    // Wyszukiwanie po nazwie sklepu i nazwie produktu (ignorując wielkość liter)
    Optional<Product> findByStoreIgnoreCaseAndProductNameIgnoreCase(String store, String productName);

    @Query(value = "SELECT * FROM product p WHERE LOWER(p.product_name) ~* ('\\m' || :word || '\\M')", nativeQuery = true)
    List<Product> searchByWholeWord(@Param("word") String word);

    // Wyszukiwanie po nazwie produktu i zakresie dat
    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) LIKE LOWER(CONCAT('%', :name, '%'))" +
            " AND p.purchaseDate BETWEEN :startDate AND :endDate ORDER BY p.price ASC")
    List<Product> findByNameAndDateRange(
            @Param("name") String name,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // Wyszukiwanie po nazwie produktu, mieście i zakresie dat
    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) LIKE LOWER(CONCAT('%', :name, '%'))" +
            " AND LOWER(p.city) = LOWER(:city)" +
            " AND p.purchaseDate BETWEEN :startDate AND :endDate ORDER BY p.price ASC")
    List<Product> findByNameCityAndDateRange(
            @Param("name") String name,
            @Param("city") String city,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
