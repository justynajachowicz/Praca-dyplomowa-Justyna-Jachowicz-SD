package com.ans.shopping_dashboard.service.cityService;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Service("citySearchService")
public class CitySearchService {

    private final String NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search";
    private final RestTemplate restTemplate;

    // Konstruktor z RestTemplate (jeśli jeszcze go nie masz w swojej aplikacji)
    public CitySearchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Map<String, Object>> searchCities(String query) {
        // Budujemy URL z parametrami: zapytanie i format odpowiedzi w JSON
        String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_API_URL)
                .queryParam("q", query)  // Zapytanie do wyszukania miasta
                .queryParam("format", "json")  // Oczekujemy odpowiedzi w formacie JSON
                .build()
                .toUriString();

        // Wykonujemy zapytanie GET do API Nominatim
        Map[] response = restTemplate.getForObject(url, Map[].class);

        // Zwracamy odpowiedź w formie listy
        return List.of(response);
    }
}