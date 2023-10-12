package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.service.ShoppingListService;
import com.ans.shopping_dashboard.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
}