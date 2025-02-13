package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Shop;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopRepository extends CrudRepository<Shop, Long> {
}
