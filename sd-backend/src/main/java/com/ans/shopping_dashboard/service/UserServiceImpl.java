package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.dto.UserDto;
import com.ans.shopping_dashboard.model.Role;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.repository.RoleRepository;
import com.ans.shopping_dashboard.repository.UserRepository;
import com.ans.shopping_dashboard.util.TbConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Arrays;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void saveUser(UserDto userDto) {
        Role role = roleRepository.findByName(TbConstants.Roles.USER);

        if (role == null)
            role = roleRepository.save(new Role(TbConstants.Roles.USER));

        User user = new User(userDto.getName(), userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()),
                Arrays.asList(role));
        userRepository.save(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email); // Korzystamy z metody repozytorium
    }
    // Nowa metoda - pobieranie wszystkich użytkowników
    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // Dodaj to do interfejsu UserService i implementacji UserServiceImpl
    @Override
    public boolean existsById(Long userId) {
        return userRepository.existsById(userId);  // Sprawdzamy, czy użytkownik o danym ID istnieje
    }
    // Dodanie metody pobierającej użytkownika po ID
    @Override
    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);  // Zwracamy użytkownika, jeśli istnieje, lub null, jeśli nie
    }


    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public void updateUserRole(Long userId, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));

        Role role = roleRepository.findByName(roleName);
        if (role == null) {
            role = roleRepository.save(new Role(roleName)); // Tworzy nową rolę, jeśli nie istnieje
        }
        user.setRoles(List.of(role));
        userRepository.save(user);
    }
    }
