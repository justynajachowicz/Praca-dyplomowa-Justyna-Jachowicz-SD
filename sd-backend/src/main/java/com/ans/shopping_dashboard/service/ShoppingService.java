package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.AddToShoppingListRequest;
import com.ans.shopping_dashboard.model.ShoppingItem;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.repository.ShoppingItemRepository; // Zmieniamy na odpowiednie repozytorium
import com.ans.shopping_dashboard.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ShoppingService {

    private final ShoppingItemRepository shoppingItemRepository; // Zmieniamy repozytorium
    private final UserRepository userRepository;

    // Konstruktor, który wstrzykuje poprawne repozytorium
    public ShoppingService(ShoppingItemRepository shoppingItemRepository, UserRepository userRepository) {
        this.shoppingItemRepository = shoppingItemRepository; // Wstrzykujemy poprawne repozytorium
        this.userRepository = userRepository;
    }

    // Metoda, która będzie obsługiwać logikę dodawania produktu do listy zakupów
    public void addToShoppingList(AddToShoppingListRequest request) {
        // Sprawdzamy, czy użytkownik istnieje
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("Użytkownik o podanym e-mailu nie istnieje.");
        }

        // Prevent admin users from adding products to shopping lists
        if (user.isAdmin()) {
            throw new RuntimeException("Administratorzy nie mogą dodawać produktów do listy zakupowej.");
        }

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
