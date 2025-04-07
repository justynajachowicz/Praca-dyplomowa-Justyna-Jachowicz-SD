package com.ans.shopping_dashboard.dto;


import java.util.List;

public class ProductSearchResponse {

    private Embedded _embedded;

    public ProductSearchResponse(List<ProductDTO> products) {
        this._embedded = new Embedded(products);
    }

    public Embedded get_embedded() {
        return _embedded;
    }

    // Klasa Embedded, która zawiera listę produktów
    public static class Embedded {
        private List<ProductDTO> products;

        public Embedded(List<ProductDTO> products) {
            this.products = products;
        }

        public List<ProductDTO> getProducts() {
            return products;
        }
    }
}