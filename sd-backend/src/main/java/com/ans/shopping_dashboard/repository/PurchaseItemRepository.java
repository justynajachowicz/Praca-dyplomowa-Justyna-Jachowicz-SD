package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.PurchaseItem;
import com.ans.shopping_dashboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Long> {
    List<PurchaseItem> findByUser(User user);
}
