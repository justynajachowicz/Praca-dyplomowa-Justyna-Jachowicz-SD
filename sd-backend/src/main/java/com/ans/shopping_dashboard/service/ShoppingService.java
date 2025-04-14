package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.AddToShoppingListRequest;
import com.ans.shopping_dashboard.model.ShoppingItem;
import com.ans.shopping_dashboard.repository.ShoppingItemRepository; // Zmieniamy na odpowiednie repozytorium
import org.springframework.stereotype.Service;

@Service
public class ShoppingService {

    private final ShoppingItemRepository shoppingItemRepository; // Zmieniamy repozytorium

    // Konstruktor, który wstrzykuje poprawne repozytorium
    public ShoppingService(ShoppingItemRepository shoppingItemRepository) {
        this.shoppingItemRepository = shoppingItemRepository; // Wstrzykujemy poprawne repozytorium
    }

    // Metoda, która będzie obsługiwać logikę dodawania produktu do listy zakupów
    public void addToShoppingList(AddToShoppingListRequest request) {

        // Tworzymy obiekt, który reprezentuje produkt na liście zakupów
        ShoppingItem shoppingItem = new ShoppingItem();
        shoppingItem.setEmail(request.getEmail());
        shoppingItem.setProductName(request.getProductName());
        shoppingItem.setProductPrice(request.getProductPrice());
        shoppingItem.setStore(request.getStore());

        // Zapisujemy produkt do bazy danych za pomocą repozytorium ShoppingItemRepository
        shoppingItemRepository.save(shoppingItem); // Teraz używamy odpowiedniego repozytorium

    }
}