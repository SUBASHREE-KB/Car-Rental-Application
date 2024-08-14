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
@Table(name = "favorites")
public class Favorites {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fav_id")
    int favId;
    @Column(name = "user_id")
    int userId;
    @Column(name = "vehicle_id")
    int vehicleId;
    int flag;
}
