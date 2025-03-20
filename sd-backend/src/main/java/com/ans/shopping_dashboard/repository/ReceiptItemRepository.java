package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.ReceiptItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptItemRepository extends JpaRepository<ReceiptItem, Long> {

    // Znajdź wszystkie produkty na danym paragonie
    List<ReceiptItem> findByReceiptId(Long receiptId);

    // Możesz dodać inne niestandardowe zapytania, np. wyszukiwanie po nazwie produktu
    List<ReceiptItem> findByProductNameContainingIgnoreCase(String productName);
}