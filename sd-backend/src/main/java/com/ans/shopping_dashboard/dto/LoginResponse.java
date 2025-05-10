package com.ans.shopping_dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginResponse {

    private String token;
    private String role;

    public LoginResponse(String token) {
        this.token = token;
    }

    public LoginResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

}
