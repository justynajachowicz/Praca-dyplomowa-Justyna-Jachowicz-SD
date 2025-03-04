package com.ans.shopping_dashboard.controller.api;

import com.ans.shopping_dashboard.dto.UserDto;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserApi {

    private final UserService userService;

    public UserApi(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/admin/users")
    public List<UserDto> getAllUsers() {
        List<User> listOfUsers = userService.findAllUsers();

        return listOfUsers.stream()
                .map(UserDto::new)
                .toList();
    }

    @DeleteMapping("/api/admin/delete/{userId}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Użytkownik usunięty");
        return ResponseEntity.ok(response);

    }
}
