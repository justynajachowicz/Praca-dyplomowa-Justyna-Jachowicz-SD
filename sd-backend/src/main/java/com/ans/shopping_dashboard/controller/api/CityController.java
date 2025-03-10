package com.ans.shopping_dashboard.controller.api;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "http://localhost:4200")
public class CityController {

    private static final List<String> CITIES = Arrays.asList(
            "Warszawa", "Kraków", "Gdańsk", "Wrocław", "Poznań", "Łódź"
    );

    // Endpoint do wyszukiwania miast

    @GetMapping("/search")
    public List<String> searchCities(@RequestParam String query) {
        // Filtruje miasta, które zawierają ciąg znaków 'query' (ignorując wielkość liter)
        return CITIES.stream()
                .filter(city -> city.toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }

}