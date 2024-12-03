# Komunikacja między Java (Spring Boot), Angular i PostgreSQL

## 1. Java (Spring Boot) i PostgreSQL

Aplikacja **Spring Boot** łączy się z bazą danych **PostgreSQL** za pomocą JDBC. Połączenie do bazy danych konfiguruje się w pliku `application.properties` lub `application.yml`:

### Przykład konfiguracji `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/shopping-dashboard
spring.datasource.username=postgres
spring.datasource.password=justyna123
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Spring Boot zainicjuje połączenie z bazą danych i będzie mógł wykonywać zapytania do PostgreSQL.

## 2. Angular i Spring Boot

Aplikacja **Angular** (frontend) komunikuje się z **Spring Boot** (backend) za pomocą HTTP requests.


### Przykład kontrolera w Spring Boot:
```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }
}
```

### Angular wysyła zapytania HTTP do backendu. Przykładowy kod Angulara:

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  addProduct(product: any) {
    return this.http.post(this.apiUrl, product);
  }
}
```

### Przykład komunikacji:

```typescript
this.productService.getProducts().subscribe(response => {
  console.log('Products:', response);
});
```

### Spring Boot odbiera żądanie i zwraca odpowiedź:

```java
@GetMapping
public List<Product> getAllProducts() {
    return productService.getAllProducts();
}
```

## 3. Rozwiązanie problemu z CORS

Jeśli aplikacja Angular działa na porcie 4200, a Spring Boot na porcie 8080, może wystąpić problem z CORS (Cross-Origin Resource Sharing). Aby to rozwiązać, należy skonfigurować Spring Boot, aby zezwalał na zapytania z portu 4200.

### Przykład konfiguracji CORS w Spring Boot:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable(); // Wyłącza CORS i CSRF
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```