package com.example.car_rental.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int reviewId;
    @Column(name = "book_id")
    private int bookId;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "vehicle_id")
    private int vehicleId;
    private LocalDate date;
    private int rating;
    @Column(columnDefinition = "TEXT")
    private String comment;
}
