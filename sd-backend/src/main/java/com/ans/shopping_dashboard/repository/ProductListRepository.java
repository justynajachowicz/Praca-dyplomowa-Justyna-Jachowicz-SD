package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductListRepository extends CrudRepository<Product, Long> {
}
