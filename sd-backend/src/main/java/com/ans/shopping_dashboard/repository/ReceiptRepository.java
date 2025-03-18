package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    List<Receipt> findByUserId(Long userId); // Pobieranie paragonów danego użytkownika


}