package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.model.Purchase;
import com.ans.shopping_dashboard.service.PurchaseService;
import com.ans.shopping_dashboard.service.ShoppingListService;
import com.ans.shopping_dashboard.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/user/")
public class UserController {

    private final ShoppingListService shoppingListService;
    private final UserService userService;
    private final PurchaseService purchaseService;

    public UserController(ShoppingListService shoppingListService, UserService userService, PurchaseService purchaseService) {
        this.shoppingListService = shoppingListService;
        this.userService = userService;
        this.purchaseService = purchaseService;
    }

    @GetMapping("/")
    public String getUserDetails(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long id = userService.findUserByEmail(user.getUsername()).getId();
        model.addAttribute("shoppingList", shoppingListService.findShoppingListsByUserId(id));
        return "user";
    }

    @GetMapping("/shopping/details/{id}")
    public String getShoppingDetails(@PathVariable Long id, Model model) {
        var purchaseList = purchaseService.findPurchaseListByShoppingId(id);
        var cheapestPurchases = findCheapestPurchase(purchaseList);
        var total = calculateTotalPrice(purchaseList);
        var totalCheapest = calculateTotalPrice(cheapestPurchases);
        model.addAttribute("details", shoppingListService.findById(id).orElseThrow());
        model.addAttribute("products", purchaseList);
        model.addAttribute("cheapest", cheapestPurchases);
        model.addAttribute("total", total);
        model.addAttribute("totalCheapest", totalCheapest);
        return "shoppingDetails";
    }

    @RequestMapping(value = "/shopping/delete/{id}", method = {RequestMethod.DELETE, RequestMethod.GET})
    public String deleteProduct(@PathVariable Long id) {
        purchaseService.setNullForShoppingListId(id);
        shoppingListService.deleteById(id);
        return "redirect:/user/";
    }

    private String calculateTotalPrice(List<Purchase> purchaseList) {
        var decimalFormat = new DecimalFormat("0.00");

        var total = 0.0;
        for (Purchase purchase : purchaseList) {
            total += purchase.getPrice();
        }
        return decimalFormat.format(total);
    }


    private List<Purchase> findCheapestPurchase(List<Purchase> existingPurchases) {
        List<Purchase> theCheapest = new ArrayList<>();
        existingPurchases.forEach(x -> theCheapest.add(purchaseService.findTheCheapest(x.getProduct().getProductId())));
        return theCheapest;
    }
}