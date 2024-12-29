package com.ans.shopping_dashboard.controller;

import com.ans.shopping_dashboard.model.Product;
import com.ans.shopping_dashboard.repository.ProductListRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
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

    @GetMapping("/product/add")
    public String addProduct(Model model) {
        model.addAttribute("product", new Product());
        return "addProduct";
    }

    @PostMapping("/product/add")
    public String postProduct(@ModelAttribute("product") Product product) {
        productListRepository.save(product);
        return "redirect:/admin/products";
    }

    @GetMapping("/product/edit/{id}")
    public String editProduct(@PathVariable Long id, Model model) {
        var product = productListRepository.findById(id);
        model.addAttribute("product", product);

        return "addProduct";
    }

    @RequestMapping(value = "/product/delete/{id}", method = {RequestMethod.DELETE, RequestMethod.GET})
    public String deleteProduct(@PathVariable Long id) {
        productListRepository.deleteById(id);
        return "redirect:/admin/products";
    }
}
