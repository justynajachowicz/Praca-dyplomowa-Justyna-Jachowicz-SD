package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.Purchase;

import java.util.List;

public interface PurchaseService {

    List<Purchase> findPurchaseListByShoppingId(Long id);

    void setNullForShoppingListId(Long id);

    Purchase findTheCheapest(Long purchaseId);
}
