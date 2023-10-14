package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.model.Purchase;
import com.ans.shopping_dashboard.repository.ProductListRepository;
import com.ans.shopping_dashboard.service.PurchaseService;
import com.ans.shopping_dashboard.service.ShopService;
import com.ans.shopping_dashboard.service.ShoppingListService;
import com.ans.shopping_dashboard.model.ShoppingList;
import com.ans.shopping_dashboard.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/user/shopping/")
public class ShoppingController {

    private final ShoppingListService shoppingListService;
    private final PurchaseService purchaseService;
    private final ProductListRepository productListRepository;
    private final ShopService shopService;
    private final UserService userService;

    public ShoppingController(ShoppingListService shoppingListService, PurchaseService purchaseService, ProductListRepository productListRepository, ShopService shopService, UserService userService) {
        this.shoppingListService = shoppingListService;
        this.purchaseService = purchaseService;
        this.productListRepository = productListRepository;
        this.shopService = shopService;
        this.userService = userService;
    }

    @RequestMapping(value = "/delete/{id}", method = {RequestMethod.DELETE, RequestMethod.GET})
    public String deleteProduct(@PathVariable Long id) {
        purchaseService.setNullForShoppingListId(id);
        shoppingListService.deleteById(id);
        return "redirect:/user/";
    }

    @GetMapping("/details/{id}")
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

    @GetMapping("/new")
    public String getNewShoppingListForm(Model model) {
        model.addAttribute("shops", shopService.findAll());
        model.addAttribute("products", productListRepository.findAll());
        model.addAttribute("shoppingList", new ShoppingList());
        model.addAttribute("purchases", new ArrayList<Purchase>());
        return "shoppingList";
    }

    @PostMapping("/new")
    public String addShoppingList(@ModelAttribute("shoppingList") ShoppingList shoppingList) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        shoppingList.setUser(userService.findUserByEmail(user.getUsername()));
        shoppingList.setCreatedAt(LocalDateTime.now());

        shoppingListService.save(shoppingList);

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
