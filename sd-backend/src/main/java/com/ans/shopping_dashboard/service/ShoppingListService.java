package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.ShoppingListItemDto;
import com.ans.shopping_dashboard.model.Product;
import com.ans.shopping_dashboard.model.ShoppingList;

import java.util.List;
import java.util.Optional;

public interface ShoppingListService {

    List<ShoppingList> findShoppingListsByUserId(Long id);

    Optional<ShoppingList> findById(Long id);

    void deleteById(Long id);

    ShoppingList save(ShoppingList shoppingListService);

    void addProductToList(Product product, String email);

    List<ShoppingListItemDto> getShoppingListByEmail(String email);
}

