package com.ans.shopping_dashboard.controller.api;

import com.ans.shopping_dashboard.model.Receipt;
import com.ans.shopping_dashboard.model.Store;
import com.ans.shopping_dashboard.repository.ReceiptRepository;
import com.ans.shopping_dashboard.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/stores")
public class StoreController {

    private final ShopService shopService;
    private final ReceiptRepository receiptRepository;

    @Autowired
    public StoreController(ShopService shopService, ReceiptRepository receiptRepository) {
        this.shopService = shopService;
        this.receiptRepository = receiptRepository;
    }

    /**
     * Gets the address of a store by name.
     *
     * @param name The name of the store
     * @param city The city where the store is located (optional)
     * @return The address of the store
     */
    @GetMapping("/address")
    public ResponseEntity<Map<String, String>> getStoreAddress(
            @RequestParam String name,
            @RequestParam(required = false) String city) {

        // If city is not provided, use a default city
        String searchCity = city != null ? city : "Warszawa";

        // First try to find the store address in the receipts table
        List<Receipt> receipts = receiptRepository.findByShopNameIgnoreCaseAndCityIgnoreCase(name, searchCity);

        // If we found receipts with the store name and city, use the street information from the first receipt
        if (!receipts.isEmpty()) {
            Receipt receipt = receipts.get(0);
            String street = receipt.getStreet();

            // If the receipt has street information, return it
            if (street != null && !street.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("address", street + ", " + searchCity);
                return ResponseEntity.ok(response);
            }
        }

        // If we didn't find the store address in the receipts table, fall back to the original implementation

        // Find the store by name and city
        Optional<Store> storeOpt = shopService.findStoreByNameAndCity(name, searchCity);

        // If the store is found, return its address
        if (storeOpt.isPresent()) {
            Store store = storeOpt.get();
            Map<String, String> response = new HashMap<>();
            response.put("address", store.getAddress());
            return ResponseEntity.ok(response);
        }

        // If the store is not found, create a new one with a default address
        String defaultAddress = "ul. " + name + " 123, " + searchCity;
        Store newStore = shopService.findOrCreateStore(name, searchCity, defaultAddress);

        // Return the address of the new store
        Map<String, String> response = new HashMap<>();
        response.put("address", newStore.getAddress());
        return ResponseEntity.ok(response);
    }
}
