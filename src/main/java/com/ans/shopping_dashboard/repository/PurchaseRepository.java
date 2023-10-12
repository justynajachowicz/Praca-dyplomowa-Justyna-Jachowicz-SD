package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Purchase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends CrudRepository<Purchase, Long> {

    List<Purchase> findAllByShoppingId(Long id);
}
