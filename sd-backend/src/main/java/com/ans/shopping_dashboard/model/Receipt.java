package com.ans.shopping_dashboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String filePath;
    private LocalDateTime uploadDate;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Powiązanie z użytkownikiem przesyłającym paragon
}