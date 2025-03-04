package com.ans.shopping_dashboard.controller;


import com.ans.shopping_dashboard.service.ShoppingListService;
import com.ans.shopping_dashboard.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user/")
public class UserController {

    private final ShoppingListService shoppingListService;
    private final UserService userService;

    public UserController(ShoppingListService shoppingListService, UserService userService) {
        this.shoppingListService = shoppingListService;
        this.userService = userService;
    }

    @GetMapping("/")
    public String getUserDetails(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long id = userService.findUserByEmail(user.getUsername()).getId();
        model.addAttribute("shoppingList", shoppingListService.findShoppingListsByUserId(id));
        return "user";
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/manage")
    public String manageUsers(Model model) {

        model.addAttribute("users", userService.findAllUsers());
        return "admin/manageUsers";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/update-role/{userId}")
    public ResponseEntity<?> updateUserRole(@PathVariable Long userId, @RequestParam String roleName) {
        userService.updateUserRole(userId, roleName);
        return ResponseEntity.ok("Rola użytkownika zmieniona");
    }
}