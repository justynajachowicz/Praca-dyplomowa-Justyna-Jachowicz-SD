package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.ShoppingList;

import java.util.List;

public interface ShoppingListService {

    List<ShoppingList> findShoppingListsByUserId(Long id);
}
