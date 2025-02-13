package com.ans.shopping_dashboard.controller.api;

import com.ans.shopping_dashboard.dto.LoginRequest;
import com.ans.shopping_dashboard.dto.LoginResponse;
import com.ans.shopping_dashboard.dto.UserDto;
import com.ans.shopping_dashboard.model.User;
import com.ans.shopping_dashboard.security.JwtTokenProvider;
import com.ans.shopping_dashboard.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        // Ustawienie użytkownika w kontekście Spring Security
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Pobranie użytkownika z bazy
        User user = userService.findUserByEmail(loginRequest.getEmail());

        // Wygenerowanie tokenu JWT
        String token = jwtTokenProvider.generateToken(user.getEmail());

        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext(); // Usunięcie kontekstu uwierzytelnienia
        return ResponseEntity.ok("Wylogowano pomyślnie");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserDto userDto) {
        try {
            userService.saveUser(userDto);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Email już zajęty
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Błąd serwera podczas rejestracji");
        }
    }
}
