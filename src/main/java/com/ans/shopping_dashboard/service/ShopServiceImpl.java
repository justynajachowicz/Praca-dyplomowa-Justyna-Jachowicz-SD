package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.Shop;
import com.ans.shopping_dashboard.repository.ShopRepository;
import org.springframework.stereotype.Service;

@Service
public class ShopServiceImpl implements ShopService {

    private final ShopRepository shopRepository;

    public ShopServiceImpl(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    @Override
    public Iterable<Shop> findAll() {
        return shopRepository.findAll();
    }
}
