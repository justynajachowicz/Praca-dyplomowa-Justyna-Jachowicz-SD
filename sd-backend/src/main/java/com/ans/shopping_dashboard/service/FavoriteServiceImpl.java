package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.FavoriteProductDto;
import com.ans.shopping_dashboard.model.Favorite;
import com.ans.shopping_dashboard.model.Product;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.repository.FavoriteRepository;
import com.ans.shopping_dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;

    @Autowired
    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, UserRepository userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String addToFavorites(Product product, String email, boolean notifyOnPromotion) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return "User not found";
        }

        // Check if user is an admin
        if (user.isAdmin()) {
            return "Administrators cannot add products to favorites";
        }

        // Check if product is already in favorites
        if (isProductInFavorites(product.getId(), email)) {
            return "Product already in favorites";
        }

        Favorite favorite = new Favorite();
        favorite.setProductId(product.getId());
        favorite.setProductName(product.getProductName());
        favorite.setUser(user);
        favorite.setPrice(product.getPrice());
        favorite.setNotifyOnPromotion(notifyOnPromotion);
        favorite.setDateAdded(LocalDateTime.now());
        favorite.setImageUrl(product.getImageUrl());

        favoriteRepository.save(favorite);
        return "Product added to favorites";
    }

    @Override
    public List<FavoriteProductDto> getFavoritesByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null || user.isAdmin()) {
            return new ArrayList<>();
        }

        List<Favorite> favorites = favoriteRepository.findByUser(user);
        List<FavoriteProductDto> favoriteProductDtos = new ArrayList<>();

        for (Favorite favorite : favorites) {
            FavoriteProductDto dto = new FavoriteProductDto(
                favorite.getId(),
                favorite.getProductId(),
                favorite.getProductName(),
                favorite.getPrice(),
                favorite.isNotifyOnPromotion(),
                favorite.getDateAdded(),
                favorite.getImageUrl()
            );
            favoriteProductDtos.add(dto);
        }

        return favoriteProductDtos;
    }

    @Override
    @Transactional
    public void removeFromFavorites(Long id) {
        favoriteRepository.deleteById(id);
    }

    @Override
    public boolean isProductInFavorites(Long productId, String email) {
        User user = userRepository.findByEmail(email);
        if (user == null || user.isAdmin()) {
            return false;
        }
        return favoriteRepository.existsByUserAndProductId(user, productId);
    }

    @Override
    public List<Product> getPromotionsForUser(String email) {
        // Get user's favorite products
        List<FavoriteProductDto> favorites = getFavoritesByEmail(email);
        if (favorites.isEmpty()) {
            return new ArrayList<>();
        }

        // Create a random number generator
        Random random = new Random();

        // Simulate promotions for some of the favorite products
        List<Product> promotions = new ArrayList<>();

        // Select a random subset of favorites to be on promotion (between 1 and 3 items)
        int promotionCount = Math.min(favorites.size(), random.nextInt(3) + 1);

        // Create a list of indices to select from favorites
        List<Integer> indices = new ArrayList<>();
        for (int i = 0; i < favorites.size(); i++) {
            indices.add(i);
        }

        // Shuffle the indices
        java.util.Collections.shuffle(indices);

        // Select the first promotionCount indices
        for (int i = 0; i < promotionCount; i++) {
            FavoriteProductDto favorite = favorites.get(indices.get(i));

            // Create a new product with a promotional price (10-30% discount)
            Product promotion = new Product();
            promotion.setId(favorite.getProductId());
            promotion.setProductName(favorite.getProductName());

            // Calculate a discount between 10% and 30%
            double discountPercent = 0.1 + (random.nextDouble() * 0.2); // 0.1 to 0.3
            double originalPrice = favorite.getPrice() != null ? favorite.getPrice() : 10.0; // Default price if null
            double discountedPrice = originalPrice * (1 - discountPercent);

            // Round to 2 decimal places
            discountedPrice = Math.round(discountedPrice * 100.0) / 100.0;

            promotion.setPrice(discountedPrice);
            // Use real shop names instead of "Sklep X"
            String[] shopNames = {"LIDL", "BIEDRONKA", "AUCHAN", "CAREFOUR"};
            promotion.setStore(shopNames[random.nextInt(shopNames.length)]);
            promotion.setImageUrl(favorite.getImageUrl());

            promotions.add(promotion);
        }

        return promotions;
    }
}
