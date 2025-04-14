package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.ShoppingItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingItemRepository extends CrudRepository<ShoppingItem, Long> {
    // Możesz tu dodać metody np. findByEmail itd. później
}