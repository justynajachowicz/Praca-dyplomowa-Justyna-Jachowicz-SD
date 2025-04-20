package com.ans.shopping_dashboard.controller.api;

import com.ans.shopping_dashboard.dto.ShoppingListItemDto;
import com.ans.shopping_dashboard.model.Product;
import com.ans.shopping_dashboard.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping("/api/shopping-list")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;


    @PostMapping
    public ResponseEntity<String> addProductToShoppingList(@RequestBody Product product, @RequestParam String email) {
        shoppingListService.addProductToList(product, email);
        return ResponseEntity.ok("Produkt dodany do listy zakupów");

    }

    @GetMapping
    public ResponseEntity<List<ShoppingListItemDto>> getShoppingList(@RequestParam String email) {
        List<ShoppingListItemDto> shoppingList = shoppingListService.getShoppingListByEmail(email);
        return ResponseEntity.ok(shoppingList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeItemFromShoppingList(@PathVariable Long id) {
        shoppingListService.deletePurchaseItemById(id);
        return ResponseEntity.ok("Produkt usunięty z listy zakupów");
    }
}
