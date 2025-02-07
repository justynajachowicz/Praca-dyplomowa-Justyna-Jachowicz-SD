package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.ShoppingList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingListRepository extends CrudRepository<ShoppingList, Long> {

    List<ShoppingList> findShoppingListsByUserId(Long id);
}
