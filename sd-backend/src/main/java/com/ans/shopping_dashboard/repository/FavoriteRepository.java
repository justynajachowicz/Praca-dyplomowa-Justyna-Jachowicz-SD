package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Favorite;
import com.ans.shopping_dashboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    
    List<Favorite> findByUser(User user);
    
    boolean existsByUserAndProductId(User user, Long productId);
    
    void deleteByUserAndProductId(User user, Long productId);
}