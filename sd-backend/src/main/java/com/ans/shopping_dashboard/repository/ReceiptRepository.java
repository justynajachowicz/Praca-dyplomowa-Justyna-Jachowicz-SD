package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Long> {

    // Znajdź wszystkie paragony dla danego użytkownika (przykład wyszukiwania)
    List<Receipt> findByUserId(Long userId);

    // Znajdź paragon po jego ID (metoda wbudowana w JpaRepository, ale można ją zdefiniować explicite)
    Optional<Receipt> findById(Long id);

    // Możesz dodać inne metody wyszukiwania, np. na podstawie daty, sklepu, itd.
}