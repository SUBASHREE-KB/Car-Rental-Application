package com.example.car_rental.model;

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
@Table(name = "agency_location")
public class AgencyLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loc_id")
    private int locId;
    @Column(name = "user_id")
    private int userId;
    @Column(length = 255)
    private String area;
    @Column(length = 255)
    private String city;
    @Column(length = 10)
    private String zip;
}
