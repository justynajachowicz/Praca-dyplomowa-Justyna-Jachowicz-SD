package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.Purchase;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.repository.PurchaseRepository;
import com.ans.shopping_dashboard.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;

    public PurchaseServiceImpl(PurchaseRepository purchaseRepository, UserRepository userRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Purchase findPurchaseById(Long id) {
        return purchaseRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Purchase> findPurchaseListByShoppingId(Long id) {
        return purchaseRepository.findAllByShoppingId(id);
    }

    @Override
    public List<Purchase> findPurchaseListByUserId(Long id) {
        return purchaseRepository.findAllByUserId(id);
    }

    @Override
    public void setNullForShoppingListId(Long id) {
        var affectedPurchases = findPurchaseListByShoppingId(id);
        affectedPurchases.forEach(x -> x.setShopping(null));
        purchaseRepository.saveAll(affectedPurchases);
    }

    @Override
    public Purchase save(Purchase purchase) {
        // Check if the purchase has a shopping list and if the user associated with it is an admin
        if (purchase.getShopping() != null && purchase.getShopping().getUser() != null) {
            User user = purchase.getShopping().getUser();
            if (user.isAdmin()) {
                throw new RuntimeException("Administratorzy nie mogą dodawać produktów do listy zakupowej.");
            }
        }

        purchaseRepository.save(purchase);
        return purchase;
    }

    @Override
    public void remove(Long id) {
        purchaseRepository.deleteById(id);
    }

    @Override
    public Purchase findTheCheapest(Long productId) {
        return purchaseRepository.findPurchaseByPrice(productId);
    }

    @Override
    public Purchase findById(Long id) {
        return null;
    }
}
