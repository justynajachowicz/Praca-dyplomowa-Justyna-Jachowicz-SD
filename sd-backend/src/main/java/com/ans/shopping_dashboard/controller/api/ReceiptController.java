package com.ans.shopping_dashboard.controller.api;

import com.ans.shopping_dashboard.dto.ReceiptRequestDTO;
import com.ans.shopping_dashboard.model.Receipt;
import com.ans.shopping_dashboard.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/receipts")
public class ReceiptController {

    private final ReceiptService receiptService;

    @Autowired
    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @GetMapping
    public List<Receipt> getAllReceipts() {
        return receiptService.getAllReceipts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receipt> getReceiptById(@PathVariable Long id) {
        Optional<Receipt> receipt = receiptService.getReceiptById(id);
        return receipt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Receipt> addReceipt(@RequestBody Receipt receipt) {
        Receipt savedReceipt = receiptService.saveReceipt(receipt);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReceipt);
    }


    // 📌 **Dodana metoda obsługująca przesyłanie zdjęcia paragonu**
    @PostMapping("/upload")
    public ResponseEntity<?> uploadReceipt(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Plik jest pusty."));
        }

        try {
            String fileName = file.getOriginalFilename();
            // Możesz tutaj zapisać plik np. na serwerze lub w bazie danych
            return ResponseEntity.ok(new SuccessResponse("Plik " + fileName + " został przesłany pomyślnie."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Błąd podczas przesyłania pliku: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceipt(@PathVariable Long id) {
        receiptService.deleteReceipt(id);
        return ResponseEntity.noContent().build();
    }

    // Klasa odpowiedzi sukcesu
    public static class SuccessResponse {
        private String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    // Klasa odpowiedzi błędu
    public static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }
}
