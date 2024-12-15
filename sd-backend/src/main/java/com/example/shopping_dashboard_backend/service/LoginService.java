package com.jts.login.service;

import com.jts.login.model.User;
import com.jts.login.repository.LoginRepository;  // Zakładając, że LoginRepository jest w tym pakiecie
import com.jts.login.model.LoginRequest;  // Jeżeli masz LoginRequest w innym pakiecie
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Usługa obsługująca logowanie użytkowników.
 */
@Service
public class LoginService {

    /**
     * Repozytorium do przechowywania danych użytkowników.
     */
    private final LoginRepository loginRepository;

    /**
     * Wstrzykiwanie zależności przez konstruktor.
     */
    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    /**
     * Metoda obsługująca proces logowania.
     *
     * @param request Obiekt zawierający dane logowania
     * @return Wiadomość informacyjna o wyniku operacji
     */
    public String doLogin(LoginRequest request) {
        // Szukanie użytkownika według podanego nazwy użytkownika
        Optional<User> user = loginRepository.findByUsername(request.getUsername());

        if (user.isPresent()) {
            // Jeśli użytkownik został znaleziony, zwracamy wiadomość o udanej operacji
            return "Użytkownik odnaleziony";
        } else {
            // Jeśli użytkownik nie został znaleziony, zwracamy wiadomość o nieudanej operacji
            return "Użytkownik nie odnaleziony";
        }
    }
}

