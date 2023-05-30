package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.repository.ProductListRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    private final ProductListRepository productListRepository;

    @Value("${spring.application.name}")
    private String appName;

    public HomeController(ProductListRepository productListRepository) {
        this.productListRepository = productListRepository;
    }

    @GetMapping("/products")
    public String getAllProducts(Model model) {

        model.addAttribute("products", productListRepository.findAll());
        return "products";
    }

    @GetMapping("/")
    public String getHomePage(Model model) {
        model.addAttribute("appName", appName);
        return "home";
    }
}
