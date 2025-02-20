package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.UserDto;
import com.ans.shopping_dashboard.model.User;

public interface UserService {
    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    boolean existsByEmail(String email); // Nowa metoda
}