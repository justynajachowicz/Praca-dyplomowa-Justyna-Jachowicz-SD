package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.ReceiptRequestDTO;
import com.ans.shopping_dashboard.model.*;
import com.ans.shopping_dashboard.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final CityService cityService;
    private final ShopService shopService;
    private final ProductService productService;

    @Autowired
    public ReceiptService(ReceiptRepository receiptRepository, 
                          CityService cityService, 
                          ShopService shopService, 
                          ProductService productService) {
        this.receiptRepository = receiptRepository;
        this.cityService = cityService;
        this.shopService = shopService;
        this.productService = productService;
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

    @Transactional
    public Receipt createReceiptFromRequest(ReceiptRequestDTO requestDTO) {
        // Find or create city
        City city = cityService.findOrCreateCity(requestDTO.getCity());

        // Find or create store
        Store store = shopService.findOrCreateStore(
                requestDTO.getStore(), 
                requestDTO.getCity(), 
                requestDTO.getAddress());

        // Create receipt
        Receipt receipt = new Receipt();
        receipt.setShopName(requestDTO.getStore());
        receipt.setDate(LocalDate.now().format(DateTimeFormatter.ISO_DATE));
        receipt.setTotalPrice(requestDTO.getTotalPrice());
        receipt.setCity(requestDTO.getCity());
        receipt.setStreet(requestDTO.getStreet());

        // Create receipt items
        List<ReceiptItem> items = new ArrayList<>();
        for (ReceiptRequestDTO.ProductItemDTO productDTO : requestDTO.getProducts()) {
            // Find or create product in store
            Product product = productService.findOrCreateProductInStore(
                    store.getName(), 
                    productDTO.getName(), 
                    productDTO.getPrice(),
                    store.getCity());

            // Create receipt item
            ReceiptItem item = new ReceiptItem();
            item.setProductName(productDTO.getName());
            item.setPrice(productDTO.getPrice());
            item.setQuantity(1); // Default quantity
            item.setReceipt(receipt);
            items.add(item);
        }

        receipt.setItems(items);

        // Save receipt
        return saveReceipt(receipt);
    }
}
