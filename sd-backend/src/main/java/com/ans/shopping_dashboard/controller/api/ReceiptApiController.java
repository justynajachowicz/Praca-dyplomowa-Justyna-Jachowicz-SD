package com.ans.shopping_dashboard.controller.api;

import com.ans.shopping_dashboard.dto.ReceiptRequestDTO;
import com.ans.shopping_dashboard.model.Receipt;
import com.ans.shopping_dashboard.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ReceiptApiController {

    private final ReceiptService receiptService;

    @Autowired
    public ReceiptApiController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @PostMapping("/receipt")
    public ResponseEntity<Receipt> createReceipt(@RequestBody ReceiptRequestDTO requestDTO) {
        try {
            Receipt savedReceipt = receiptService.createReceiptFromRequest(requestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReceipt);
        } catch (Exception e) {
            // Log the exception
            System.err.println("Error creating receipt: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}