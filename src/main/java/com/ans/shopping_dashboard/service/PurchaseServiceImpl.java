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
    public List<Purchase> findPurchaseListByShoppingId(Long id) {
        return purchaseRepository.findAllByShoppingId(id);
    }
}
