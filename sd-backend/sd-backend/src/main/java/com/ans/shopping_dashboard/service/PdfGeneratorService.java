package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.ShoppingList;

import java.io.ByteArrayOutputStream;

public interface PdfGeneratorService {
    ByteArrayOutputStream generatePdf(ShoppingList shoppingList);
}