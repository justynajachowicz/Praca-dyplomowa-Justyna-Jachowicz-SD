package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.UserDto;
import com.ans.shopping_dashboard.model.Favorite;
import com.ans.shopping_dashboard.model.Purchase;
import com.ans.shopping_dashboard.model.PurchaseHistory;
import com.ans.shopping_dashboard.model.PurchaseItem;
import com.ans.shopping_dashboard.model.Receipt;
import com.ans.shopping_dashboard.model.Role;
import com.ans.shopping_dashboard.model.ShoppingList;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.repository.FavoriteRepository;
import com.ans.shopping_dashboard.repository.PurchaseHistoryRepository;
import com.ans.shopping_dashboard.repository.PurchaseItemRepository;
import com.ans.shopping_dashboard.repository.PurchaseRepository;
import com.ans.shopping_dashboard.repository.ReceiptRepository;
import com.ans.shopping_dashboard.repository.RoleRepository;
import com.ans.shopping_dashboard.repository.ShoppingListRepository;
import com.ans.shopping_dashboard.repository.UserRepository;
import com.ans.shopping_dashboard.util.TbConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    private PurchaseHistoryRepository purchaseHistoryRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private PurchaseItemRepository purchaseItemRepository;

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Override
    public void saveUser(UserDto userDto) {
        Role role = roleRepository.findByName(TbConstants.Roles.USER);

        if (role == null)
            role = roleRepository.save(new Role(TbConstants.Roles.USER));

        User user = new User(userDto.getName(), userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()),
                Arrays.asList(role));
        userRepository.save(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }


    @Override
    public boolean existsById(Long userId) {
        return userRepository.existsById(userId);
    }

    @Override
    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Delete purchases associated with user's shopping lists
        List<Purchase> purchases = purchaseRepository.findAllByUserId(userId);
        for (Purchase purchase : purchases) {
            purchaseRepository.delete(purchase);
        }

        // Delete shopping lists
        List<ShoppingList> shoppingLists = shoppingListRepository.findShoppingListsByUserId(userId);
        for (ShoppingList shoppingList : shoppingLists) {
            shoppingListRepository.delete(shoppingList);
        }

        // Delete purchase history
        List<PurchaseHistory> purchaseHistories = purchaseHistoryRepository.findByUser(user);
        for (PurchaseHistory purchaseHistory : purchaseHistories) {
            purchaseHistoryRepository.delete(purchaseHistory);
        }

        // Delete favorites
        List<Favorite> favorites = favoriteRepository.findByUser(user);
        for (Favorite favorite : favorites) {
            favoriteRepository.delete(favorite);
        }

        // Delete purchase items
        List<PurchaseItem> purchaseItems = purchaseItemRepository.findByUser(user);
        for (PurchaseItem purchaseItem : purchaseItems) {
            purchaseItemRepository.delete(purchaseItem);
        }

        // Delete receipts
        List<Receipt> receipts = receiptRepository.findByUserId(userId);
        for (Receipt receipt : receipts) {
            receiptRepository.delete(receipt);
        }

        // Delete user roles
        roleRepository.deleteUserRolesById(userId);

        // Delete user
        userRepository.deleteById(userId);
    }

    @Override
    @Transactional
    public void updateUserRole(Long userId, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));

        // Try to find the role by name (case-insensitive)
        List<Role> allRoles = roleRepository.findAll();
        Role role = allRoles.stream()
                .filter(r -> r.getName().equalsIgnoreCase(roleName))
                .findFirst()
                .orElse(null);

        // If role doesn't exist, create it
        if (role == null) {
            role = new Role(roleName);
            role = roleRepository.save(role);
        }

        // Use a mutable list instead of List.of() which creates an immutable list
        List<Role> roles = new ArrayList<>();
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
    }
    @Override
    public boolean isUserRegistered(String email) {
        return existsByEmail(email);  // Sprawdzamy, czy użytkownik o podanym e-mailu istnieje
    }
}
