package com.ans.shopping_dashboard.dto;

public class LoginResponse {

    private String token;
    private String Token;
    
    public LoginResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
