package com.example.car_rental.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Vehicle")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vehicleId;

    private int userId;
    @Column(columnDefinition = "LONGTEXT")
    private String imageLink;
    @Column(length = 50)
    private String type;
    @Column(length = 50)
    private String model;
    private Double price;
    private int availability;

}
