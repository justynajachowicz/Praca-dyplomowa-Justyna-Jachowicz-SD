package com.ans.shopping_dashboard.service;

import com.ans.shopping_dashboard.model.City;
import com.ans.shopping_dashboard.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public Optional<City> getCityByName(String name) {
        return cityRepository.findByNameIgnoreCase(name);
    }

    public City saveCity(City city) {
        return cityRepository.save(city);
    }

    public City findOrCreateCity(String cityName) {
        return getCityByName(cityName)
                .orElseGet(() -> {
                    City newCity = new City();
                    newCity.setName(cityName);
                    return saveCity(newCity);
                });
    }
}