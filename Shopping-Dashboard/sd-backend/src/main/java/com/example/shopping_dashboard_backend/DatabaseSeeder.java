//package com.example.shopping_dashboard_backend;
//
//import com.example.shopping_dashboard_backend.entities.User;
//import com.example.shopping_dashboard_backend.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//@Component
//public class DatabaseSeeder implements CommandLineRunner {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    private void createGetAllUsersProcedure() {
//        String createProcedureSql = "CREATE OR REPLACE FUNCTION get_all_users() RETURNS SETOF users AS $$" +
//                "BEGIN " +
//                "RETURN QUERY SELECT * FROM users; " +
//                "END; $$ LANGUAGE plpgsql;";
//        jdbcTemplate.execute(createProcedureSql);
//    }
//
//    private void createAfterDeleteUserTrigger() {
//        String createTriggerSql = "CREATE OR REPLACE FUNCTION after_delete_user() RETURNS trigger AS $$" +
//                "BEGIN " +
//                "INSERT INTO user_log (user_id, action, date, username, role) " +
//                "VALUES (OLD.id, 'DELETE', CURRENT_TIMESTAMP, OLD.username, OLD.role); " +
//                "RETURN OLD; " +
//                "END; $$ LANGUAGE plpgsql; " +
//                "CREATE TRIGGER after_delete_user " +
//                "AFTER DELETE ON users " +
//                "FOR EACH ROW EXECUTE FUNCTION after_delete_user();";
//        jdbcTemplate.execute(createTriggerSql);
//    }
//
//    private void createAfterAddUserTrigger() {
//        String createTriggerSql = "CREATE OR REPLACE FUNCTION after_add_user() RETURNS trigger AS $$" +
//                "BEGIN " +
//                "INSERT INTO user_log (user_id, action, date, username, role) " +
//                "VALUES (NEW.id, 'INSERT', CURRENT_TIMESTAMP, NEW.username, NEW.role); " +
//                "RETURN NEW; " +
//                "END; $$ LANGUAGE plpgsql; " +
//                "CREATE TRIGGER after_add_user " +
//                "AFTER INSERT ON users " +
//                "FOR EACH ROW EXECUTE FUNCTION after_add_user();";
//        jdbcTemplate.execute(createTriggerSql);
//    }
//
//    @Override
//    public void run(String... args) {
//        // Tworzymy procedurę i triggery dla użytkowników
//        createGetAllUsersProcedure();
//        createAfterDeleteUserTrigger();
//        createAfterAddUserTrigger();
//
//        // Dodaj użytkownika "admin" tylko jeśli nie istnieje
//        if (!userRepository.existsByUsername("admin")) {
//            User adminUser = new User();
//            adminUser.setUsername("admin");
//            adminUser.setPassword(passwordEncoder.encode("admin")); // Szyfrujemy hasło
//            adminUser.setEnabled(true);
//            adminUser.setRole("ROLE_ADMIN");
//            userRepository.save(adminUser);
//        }
//
//        // Dodaj użytkownika "user" tylko jeśli nie istnieje
//        if (!userRepository.existsByUsername("user")) {
//            User regularUser = new User();
//            regularUser.setUsername("user");
//            regularUser.setPassword(passwordEncoder.encode("user123"));
//            regularUser.setEnabled(true);
//            regularUser.setRole("ROLE_USER");
//            userRepository.save(regularUser);
//        }
//
//        // Możesz dodać więcej użytkowników, jeśli to konieczne
//    }
//}
