package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.ShoppingList;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.repository.ShoppingListRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingListServiceImpl implements ShoppingListService {

    private final ShoppingListRepository shoppingListRepository;

    public ShoppingListServiceImpl(ShoppingListRepository shoppingListRepository) {
        this.shoppingListRepository = shoppingListRepository;
    }

    @Override
    public List<ShoppingList> findShoppingListsByUserId(Long id) {
        return shoppingListRepository.findShoppingListsByUserId(id);
    }
}
