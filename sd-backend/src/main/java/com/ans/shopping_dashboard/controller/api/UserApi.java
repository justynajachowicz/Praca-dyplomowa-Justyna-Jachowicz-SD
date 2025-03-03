package com.ans.shopping_dashboard.controller.api;

import com.ans.shopping_dashboard.dto.UserDto;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@PreAuthorize("hasRole('ADMIN')")
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
}
