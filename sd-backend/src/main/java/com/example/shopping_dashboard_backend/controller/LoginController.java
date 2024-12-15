package com.jts.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.jts.login.model.User;
import com.jts.login.service.LoginService;
import com.jts.login.request.LoginRequest;
import com.jts.login.response.LoginResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/doLogin")
    public ResponseEntity<LoginResponse> doLogin(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = new LoginResponse();
            response.setToken("token_details");

            String result = loginService.doLogin(request);

            // Pamiętaj, aby zaimplementować rzeczywiste logowanie użytkownika
            // w metodzie doLogin() w klasie LoginService

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}