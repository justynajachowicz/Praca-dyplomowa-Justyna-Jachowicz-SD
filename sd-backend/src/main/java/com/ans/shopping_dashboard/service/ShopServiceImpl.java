package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.Shop;
import com.ans.shopping_dashboard.model.Store;
import com.ans.shopping_dashboard.repository.ShopRepository;
import com.ans.shopping_dashboard.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ShopServiceImpl implements ShopService {

    private final ShopRepository shopRepository;
    private final StoreRepository storeRepository;

    public ShopServiceImpl(ShopRepository shopRepository, StoreRepository storeRepository) {
        this.shopRepository = shopRepository;
        this.storeRepository = storeRepository;
    }

    @Override
    public Iterable<Shop> findAll() {
        return shopRepository.findAll();
    }

    @Override
    public Optional<Store> findStoreByNameAndCity(String name, String city) {
        return storeRepository.findByNameIgnoreCaseAndCityIgnoreCase(name, city);
    }

    @Override
    public Store saveStore(Store store) {
        return storeRepository.save(store);
    }

    @Override
    public Store findOrCreateStore(String name, String city, String address) {
        return findStoreByNameAndCity(name, city)
                .orElseGet(() -> {
                    Store newStore = new Store(name, city, address);
                    return saveStore(newStore);
                });
    }
}
