package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.model.Purchase;
import com.ans.shopping_dashboard.model.Shop;
import com.ans.shopping_dashboard.repository.ProductListRepository;
import com.ans.shopping_dashboard.service.PurchaseService;
import com.ans.shopping_dashboard.service.ShopService;
import com.ans.shopping_dashboard.service.PdfGeneratorService;
import com.ans.shopping_dashboard.service.ShoppingListService;
import com.ans.shopping_dashboard.model.ShoppingList;
import com.ans.shopping_dashboard.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    private final PdfGeneratorService pdfGeneratorService;


    public ShoppingController(ShoppingListService shoppingListService, PurchaseService purchaseService, ProductListRepository productListRepository, ShopService shopService, UserService userService, PdfGeneratorService pdfGeneratorService) {
        this.shoppingListService = shoppingListService;
        this.purchaseService = purchaseService;
        this.productListRepository = productListRepository;
        this.shopService = shopService;
        this.userService = userService;
        this.pdfGeneratorService = pdfGeneratorService;
    }

    @RequestMapping(value = "/delete/{id}", method = {RequestMethod.DELETE, RequestMethod.GET})
    public String deleteShoppingList(@PathVariable Long id) {
        if (validateAccessToDetailedList(id)) {
            return "redirect:/user/";
        }
        purchaseService.setNullForShoppingListId(id);
        shoppingListService.deleteById(id);
        return "redirect:/user/";
    }

    @GetMapping("/details/{id}")
    public String getShoppingDetails(@PathVariable Long id, Model model) {
        if (validateAccessToDetailedList(id)) {
            return "redirect:/user/";
        }

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
        addToModel(model);
        return "shoppingList";
    }

    @GetMapping("/searchList/{id}")
    public String searchList(@PathVariable Long id, Model model) {
        addToModel(model);
        model.addAttribute("existingPurchases", purchaseService.findPurchaseListByShoppingId(id));
        model.addAttribute("listName", shoppingListService.findById(id).orElseThrow().getListName());
        return "shoppingList";
    }

    private void addToModel(Model model) {
        long userId = getUserIdFromSession();
        model.addAttribute("shops", shopService.findAll());
        model.addAttribute("products", productListRepository.findAll());
        model.addAttribute("shoppingList", new ShoppingList());
        model.addAttribute("purchase", new Purchase());
        model.addAttribute("existingLists", shoppingListService.findShoppingListsByUserId(userId));
    }

    @PostMapping("/new")
    public String addShoppingList(@ModelAttribute("shoppingList") ShoppingList shoppingList) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        shoppingList.setUser(userService.findUserByEmail(user.getUsername()));
        shoppingList.setCreatedAt(LocalDateTime.now());

        var shoppingListId = shoppingListService.save(shoppingList).getId();

        return "redirect:/user/shopping/searchList/" + shoppingListId;
    }

    @PostMapping("/addPurchase")
    public String addPurchase(@ModelAttribute("purchase") Purchase purchase) {
        purchaseService.save(purchase);
        var shoppingListId = shoppingListService.findById(purchase.getShopping().getId()).orElseThrow().getId();
        return "redirect:/user/shopping/searchList/" + shoppingListId;
    }

    @RequestMapping(value = "/deletePurchase/{id}", method = {RequestMethod.DELETE, RequestMethod.GET})
    public String deletePurchase(@PathVariable Long id) {
        if (validateAccessToPurchase(id)) {
            return "redirect:/user/shopping/new";
        }
        purchaseService.remove(id);
        return "redirect:/user/shopping/new";
    }

    @GetMapping("/generatePdf/{id}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Long id) {
        var shoppingList = shoppingListService.findById(id).orElseThrow(() -> new IllegalArgumentException("Lista nie istnieje"));

        var pdfBytes = pdfGeneratorService.generatePdf(shoppingList).toByteArray();

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=shopping_list_" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
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

    private boolean validateAccessToDetailedList(Long shoppingListId) {
        var existingLists = shoppingListService.findShoppingListsByUserId(getUserIdFromSession());
        return !existingLists.contains(shoppingListService.findById(shoppingListId).orElseThrow());
    }

    private boolean validateAccessToPurchase(Long purchaseId) {
        var userPurchases = purchaseService.findPurchaseListByUserId(getUserIdFromSession());
        return !userPurchases.contains(purchaseService.findPurchaseById(purchaseId));
    }

    private Long getUserIdFromSession() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.findUserByEmail(user.getUsername()).getId();
    }
}
