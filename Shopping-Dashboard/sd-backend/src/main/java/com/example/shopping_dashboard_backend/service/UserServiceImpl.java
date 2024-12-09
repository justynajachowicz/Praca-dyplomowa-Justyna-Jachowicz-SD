package com.example.shopping_dashboard_backend.service;

import com.example.shopping_dashboard_backend.entities.User;
import com.example.shopping_dashboard_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll(); // Zwraca listę wszystkich użytkowników
    }

    @Override
    public void registerUser(User user) {
        // Szyfruje hasło użytkownika przed zapisaniem do bazy danych
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(true); // Aktywuje użytkownika
        userRepository.save(user); // Zapisuje użytkownika w repozytorium
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> optional = userRepository.findById(id);
        return optional.orElseThrow(() -> new RuntimeException("User not found for id :: " + id));
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id); // Usuwa użytkownika na podstawie jego ID
    }


}
