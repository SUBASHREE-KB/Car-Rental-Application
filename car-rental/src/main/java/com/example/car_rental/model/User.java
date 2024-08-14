package com.example.car_rental.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private Long phoneNumber;

    @Column(nullable = false, unique = true, length = 60)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(length = 10)
    private String role;

    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;
}
