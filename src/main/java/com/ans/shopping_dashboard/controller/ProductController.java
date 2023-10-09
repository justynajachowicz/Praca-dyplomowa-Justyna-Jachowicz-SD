package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.repository.ProductListRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductController {

    private final ProductListRepository productListRepository;

    public ProductController(ProductListRepository productListRepository) {
        this.productListRepository = productListRepository;
    }

    @GetMapping("/products")
    public String getAllProducts(Model model) {
        model.addAttribute("products", productListRepository.findAll());
        return "products";
    }

    public void addProduct() {

    }

    public void editProduct() {

    }

    public void deleteProduct() {

    }
}
