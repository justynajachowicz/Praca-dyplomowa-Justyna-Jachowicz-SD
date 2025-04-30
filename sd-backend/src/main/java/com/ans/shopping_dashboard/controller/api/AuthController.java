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

import java.util.HashMap;
import java.util.Map;

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

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userService.findUserByEmail(loginRequest.getEmail());

        String token = jwtTokenProvider.generateToken(user.getEmail());

        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Wylogowano pomyślnie");
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody @Valid UserDto userDto) {
        try {
            if (userService.existsByEmail(userDto.getEmail())) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Email jest już zajęty");
                return ResponseEntity.badRequest().body(response);
            }

            userService.saveUser(userDto);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Użytkownik zarejestrowany pomyślnie");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("message", "Błąd serwera podczas rejestracji: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
    @GetMapping("/is-registered")
    public ResponseEntity<Boolean> isUserRegistered(@RequestParam String email) {
        boolean isRegistered = userService.isUserRegistered(email);
        return ResponseEntity.ok(isRegistered); // Zwracamy odpowiedź z wartością true/false
    }

    @PostMapping("/validate-credentials")
    public ResponseEntity<Boolean> validateCredentials(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
            return ResponseEntity.ok(authentication.isAuthenticated());
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
}
