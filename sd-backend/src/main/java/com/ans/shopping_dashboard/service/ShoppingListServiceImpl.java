package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.ShoppingListItemDto;
import com.ans.shopping_dashboard.model.Product;
import com.ans.shopping_dashboard.model.PurchaseItem;
import com.ans.shopping_dashboard.model.ShoppingList;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.repository.PurchaseItemRepository;
import com.ans.shopping_dashboard.repository.ShoppingListRepository;
import com.ans.shopping_dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListServiceImpl implements ShoppingListService {

    private final ShoppingListRepository shoppingListRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PurchaseItemRepository purchaseItemRepository;


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
    public ShoppingList save(ShoppingList shoppingListService) {
        return shoppingListRepository.save(shoppingListService);
    }
    @Override
    public void addProductToList(Product product, String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Użytkownik o podanym e-mailu nie istnieje.");
        }

        PurchaseItem item = new PurchaseItem();
        item.setProductName(product.getProductName());
        item.setProductPrice(product.getPrice());
        item.setStore(product.getStore());
        item.setUser(user);

        purchaseItemRepository.save(item);
    }
    @Override
    public List<ShoppingListItemDto> getShoppingListByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return new ArrayList<>();
        }

        List<PurchaseItem> purchaseItems = purchaseItemRepository.findByUser(user);
        List<ShoppingListItemDto> shoppingListItems = new ArrayList<>();

        for (PurchaseItem item : purchaseItems) {
            ShoppingListItemDto dto = new ShoppingListItemDto(
                item.getProductName(),
                item.getStore(),
                item.getPrice()
            );
            // Set the ID in the DTO so we can use it for deletion
            dto.setId(item.getId());
            shoppingListItems.add(dto);
        }

        return shoppingListItems;
    }

    @Override
    public void deletePurchaseItemById(Long id) {
        purchaseItemRepository.deleteById(id);
    }
}
