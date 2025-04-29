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
        if (user == null) {
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
        if (user == null) {
            return false;
        }
        return favoriteRepository.existsByUserAndProductId(user, productId);
    }
}
