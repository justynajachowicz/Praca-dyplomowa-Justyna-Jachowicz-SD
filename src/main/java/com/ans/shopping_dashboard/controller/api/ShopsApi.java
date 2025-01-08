package com.ans.shopping_dashboard.controller.api;


import com.ans.shopping_dashboard.model.Shop;
import com.ans.shopping_dashboard.service.ShopService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ShopsApi {

    private final ShopService shopService;

    public ShopsApi(ShopService shopService) {
        this.shopService = shopService;
    }


    @GetMapping("/api/v1/shops")
    public Iterable<Shop> getAllShops(){
        return shopService.findAll();
    }

    @GetMapping("/api/v1/shoppingLists")
    public Iterable<Shop> getAllShoppingLists(){
        return shopService.findAll();
    }
}
