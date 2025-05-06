package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.PurchaseHistoryDto;
import com.ans.shopping_dashboard.model.PurchaseHistory;
import com.ans.shopping_dashboard.model.PurchaseItem;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.repository.PurchaseHistoryRepository;
import com.ans.shopping_dashboard.repository.PurchaseItemRepository;
import com.ans.shopping_dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchaseHistoryServiceImpl implements PurchaseHistoryService {

    private final PurchaseHistoryRepository purchaseHistoryRepository;
    private final PurchaseItemRepository purchaseItemRepository;
    private final UserRepository userRepository;

    @Autowired
    public PurchaseHistoryServiceImpl(
            PurchaseHistoryRepository purchaseHistoryRepository,
            PurchaseItemRepository purchaseItemRepository,
            UserRepository userRepository) {
        this.purchaseHistoryRepository = purchaseHistoryRepository;
        this.purchaseItemRepository = purchaseItemRepository;
        this.userRepository = userRepository;
    }

    @Override
    public PurchaseHistory savePurchaseHistory(PurchaseHistory purchaseHistory) {
        return purchaseHistoryRepository.save(purchaseHistory);
    }

    @Override
    public PurchaseHistory createFromPurchaseItem(PurchaseItem purchaseItem) {
        PurchaseHistory history = PurchaseHistory.fromPurchaseItem(purchaseItem);
        return savePurchaseHistory(history);
    }

    @Override
    public List<PurchaseHistoryDto> getPurchaseHistoryByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return new ArrayList<>();
        }

        List<PurchaseHistory> historyList = purchaseHistoryRepository.findByUserOrderByPurchaseDateDesc(user);
        return convertToDtoList(historyList);
    }

    @Override
    public List<PurchaseHistoryDto> getPurchaseHistoryByDateRange(String email, LocalDateTime startDate, LocalDateTime endDate) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return new ArrayList<>();
        }

        List<PurchaseHistory> historyList = purchaseHistoryRepository.findByUserAndPurchaseDateBetween(user, startDate, endDate);
        return convertToDtoList(historyList);
    }

    @Override
    public List<PurchaseHistoryDto> getPurchaseHistoryByStore(String email, String store) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return new ArrayList<>();
        }

        List<PurchaseHistory> historyList = purchaseHistoryRepository.findByUserAndStore(user, store);
        return convertToDtoList(historyList);
    }

    @Override
    public List<PurchaseHistoryDto> searchPurchaseHistory(String email, String productName) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return new ArrayList<>();
        }

        List<PurchaseHistory> historyList = purchaseHistoryRepository.findByUserAndProductNameContainingIgnoreCase(user, productName);
        return convertToDtoList(historyList);
    }

    @Override
    public void deletePurchaseHistory(Long id) {
        purchaseHistoryRepository.deleteById(id);
    }

    @Override
    @Transactional
    public int completePurchase(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return 0;
        }

        // Get all purchase items for the user
        List<PurchaseItem> purchaseItems = purchaseItemRepository.findByUser(user);
        if (purchaseItems.isEmpty()) {
            return 0;
        }

        // Create purchase history records for each purchase item
        List<PurchaseHistory> historyRecords = purchaseItems.stream()
                .map(PurchaseHistory::fromPurchaseItem)
                .collect(Collectors.toList());

        // Save all purchase history records
        purchaseHistoryRepository.saveAll(historyRecords);

        // Delete all purchase items
        purchaseItemRepository.deleteAll(purchaseItems);

        return purchaseItems.size();
    }

    /**
     * Convert a list of PurchaseHistory entities to DTOs
     */
    private List<PurchaseHistoryDto> convertToDtoList(List<PurchaseHistory> historyList) {
        return historyList.stream()
                .map(PurchaseHistoryDto::fromEntity)
                .collect(Collectors.toList());
    }
}