package com.example.car_rental.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.sql.Timestamp;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private int bookId;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "vehicle_id")
    private int vehicleId;
    @Temporal(TemporalType.DATE)
    private Date pickUpDate;
    @Temporal(TemporalType.DATE)
    private Date returnDate;
    private Double price;
    @Column(length = 50)
    private String status;
    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

}
