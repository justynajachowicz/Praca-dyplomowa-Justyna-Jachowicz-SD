package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.ShoppingList;
import com.ans.shopping_dashboard.repository.ShoppingListRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Optional<ShoppingList> findById(Long id) {
        return shoppingListRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        shoppingListRepository.deleteById(id);
    }

    @Override
    public void save(ShoppingList shoppingListService) {
        shoppingListRepository.save(shoppingListService);
    }
}
