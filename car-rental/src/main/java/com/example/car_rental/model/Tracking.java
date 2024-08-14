package com.example.car_rental.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Data
@NoArgsConstructor
@Entity
@Table(name = "tracking")
public class Tracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int trackId;
    @Column(name = "book_id")
    private int bookId;
    @Column(name = "user_id")
    private int userId;
    @Temporal(TemporalType.DATE)
    private Date due;
    private String status;
    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp modifiedAt;
    private Double fine;

}
