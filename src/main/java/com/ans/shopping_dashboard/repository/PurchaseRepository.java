package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Purchase;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends CrudRepository<Purchase, Long> {

    List<Purchase> findAllByShoppingId(Long id);
    @Query(value = "select * from purchase p where shopping_list_id in (select id from shopping_list where user_id = :userId)", nativeQuery = true)
    List<Purchase> findAllByUserId(Long userId);

    @Query(value = "select * from purchase where product_id = :productId and shopping_list_id is not null and price = (select min(price) from purchase where product_id = :productId and shopping_list_id is not null) limit 1", nativeQuery = true)
    Purchase findPurchaseByPrice(@Param("productId") Long productId);

}
