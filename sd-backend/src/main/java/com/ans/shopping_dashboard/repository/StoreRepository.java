package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByNameIgnoreCaseAndCityIgnoreCase(String name, String city);
}