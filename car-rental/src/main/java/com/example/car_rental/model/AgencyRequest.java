package com.example.car_rental.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "agency_request")
public class AgencyRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private Long phoneNumber;

    @Column(nullable = false, unique = true, length = 60)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp requestedAt;

    @Column(length = 255)
    private String area;

    @Column(length = 255)
    private String city;

    @Column(length = 10)
    private String zip;

    @Column(columnDefinition = "LONGTEXT")
    private String businessLicense;

    private String status;

}
