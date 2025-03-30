package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.Purchase;
import com.ans.shopping_dashboard.repository.PurchaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;

    public PurchaseServiceImpl(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
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
