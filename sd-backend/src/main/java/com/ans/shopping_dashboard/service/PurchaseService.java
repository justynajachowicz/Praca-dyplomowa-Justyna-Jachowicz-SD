package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.Purchase;

import java.util.List;

public interface PurchaseService {

    Purchase findPurchaseById(Long id);

    List<Purchase> findPurchaseListByShoppingId(Long id);

    List<Purchase> findPurchaseListByUserId(Long id);

    void setNullForShoppingListId(Long id);

    Purchase save(Purchase purchase);

    void remove(Long id);

    Purchase findTheCheapest(Long purchaseId);

    Purchase findById(Long id);
}
