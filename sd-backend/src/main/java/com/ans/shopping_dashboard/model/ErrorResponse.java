package com.ans.shopping_dashboard.model;

public class ErrorResponse {
    private String error;
    private String message;

    // Konstruktor
    public ErrorResponse(String error, String message) {
        this.error = error;
        this.message = message;
    }

    // Gettery i settery
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
