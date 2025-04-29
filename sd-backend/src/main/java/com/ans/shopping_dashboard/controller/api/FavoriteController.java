package com.ans.shopping_dashboard.controller.api;

import com.ans.shopping_dashboard.dto.FavoriteProductDto;
import com.ans.shopping_dashboard.model.Product;
import com.ans.shopping_dashboard.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public ResponseEntity<String> addToFavorites(@RequestBody Product product, @RequestParam String email, 
                                                @RequestParam(defaultValue = "true") boolean notifyOnPromotion) {
        String result = favoriteService.addToFavorites(product, email, notifyOnPromotion);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<FavoriteProductDto>> getFavorites(@RequestParam String email) {
        List<FavoriteProductDto> favorites = favoriteService.getFavoritesByEmail(email);
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeFromFavorites(@PathVariable Long id) {
        favoriteService.removeFromFavorites(id);
        return ResponseEntity.ok("Product removed from favorites");
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isProductInFavorites(@RequestParam Long productId, @RequestParam String email) {
        boolean isInFavorites = favoriteService.isProductInFavorites(productId, email);
        return ResponseEntity.ok(isInFavorites);
    }
}