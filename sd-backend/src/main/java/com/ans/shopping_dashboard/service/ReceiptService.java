package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.Receipt;
import com.ans.shopping_dashboard.model.ReceiptItem;
import com.ans.shopping_dashboard.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    @Autowired
    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    // Pobieranie wszystkich paragonów
    public List<Receipt> getAllReceipts() {
        return receiptRepository.findAll();
    }

    // Pobieranie paragonu po ID
    public Optional<Receipt> getReceiptById(Long id) {
        return receiptRepository.findById(id);
    }

    public Receipt saveReceipt(Receipt receipt) {
        for (ReceiptItem item : receipt.getItems()) {
            item.setReceipt(receipt);  // Ustaw Receipt w każdym ReceiptItem
        }
        // Zapisz Receipt wraz z ReceiptItem
        return receiptRepository.save(receipt);
    }

    // Usunięcie paragonu
    public void deleteReceipt(Long id) {
        receiptRepository.deleteById(id);
    }
}