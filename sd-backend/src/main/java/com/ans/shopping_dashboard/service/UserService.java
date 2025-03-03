package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.UserDto;
import com.ans.shopping_dashboard.model.User;
import java.util.List;




    public interface UserService {
        void saveUser(UserDto userDto);

        User findUserByEmail(String email);

        boolean existsByEmail(String email); // Nowa metoda

        List<User> findAllUsers();  // Dodaj tę metodę

        void deleteUser(Long userId);  // Nowa metoda

        void updateUserRole(Long userId, String roleName);


        boolean existsById(Long userId);  // Metoda sprawdzająca, czy użytkownik o danym ID istnieje
        User findUserById(Long userId);   // Metoda pobierająca użytkownika po ID
    }

