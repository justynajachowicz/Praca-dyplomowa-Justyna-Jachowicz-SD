package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.Shop;
import com.ans.shopping_dashboard.model.Store;

import java.util.Optional;

public interface ShopService {

    Iterable<Shop> findAll();

    Optional<Store> findStoreByNameAndCity(String name, String city);

    Store saveStore(Store store);

    Store findOrCreateStore(String name, String city, String address);
}
