package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.UserDto;
import com.ans.shopping_dashboard.model.User;

import java.util.List;

public interface UserService {

    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findAllUsers();

    void deleteUser(Long userId);

    void updateUserRole(Long userId, String roleName);

    boolean existsById(Long userId);

    User findUserById(Long userId);
}

