package com.ans.shopping_dashboard.service.cityService;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

/**
 * @deprecated This class has been replaced by {@link CitySearchService}.
 * Please use {@link CitySearchService} instead.
 */
@Deprecated
public class CityService {

    private final CitySearchService citySearchService;

    public CityService(RestTemplate restTemplate) {
        this.citySearchService = new CitySearchService(restTemplate);
    }

    /**
     * @deprecated Use {@link CitySearchService#searchCities(String)} instead.
     */
    @Deprecated
    public List<Map<String, Object>> searchCities(String query) {
        return citySearchService.searchCities(query);
    }
}
