package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.Purchase;
import com.ans.shopping_dashboard.model.ShoppingList;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfGeneratorServiceImpl implements PdfGeneratorService {

    private final PurchaseService purchaseService;

    public PdfGeneratorServiceImpl(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }


    @Override
    public ByteArrayOutputStream generatePdf(ShoppingList shoppingList) {
        var purchaseList = purchaseService.findPurchaseListByShoppingId(shoppingList.getId());

        try (PDDocument document = new PDDocument();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PDPage page = new PDPage();
            document.addPage(page);
            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.beginText();
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
                contentStream.setLeading(20f);
                contentStream.newLineAtOffset(50, 750);

                contentStream.showText("Lista zakupów: " + shoppingList.getListName());
                contentStream.newLine();
                contentStream.setFont(PDType1Font.HELVETICA, 12);

                for (Purchase purchase : purchaseList) {
                    contentStream.showText("- " + purchase.getProduct().getProductName() +
                            " (" + purchase.getPrice() + " PLN)");
                    contentStream.newLine();
                }
                contentStream.endText();
            }
            document.save(outputStream);
            return outputStream;
        } catch (IOException e) {
            throw new RuntimeException("Błąd podczas generowania PDF", e);
        }
    }
}
