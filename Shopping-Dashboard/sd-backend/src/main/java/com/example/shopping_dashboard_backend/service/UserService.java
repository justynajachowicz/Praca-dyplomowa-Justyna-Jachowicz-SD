package com.example.shopping_dashboard_backend.service;

import com.example.shopping_dashboard_backend.entities.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    void registerUser(User user);
    User getUserById(Long id);
    void deleteUserById(Long id);
}
