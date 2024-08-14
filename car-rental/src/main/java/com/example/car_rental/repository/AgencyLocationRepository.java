package com.example.car_rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.car_rental.model.AgencyLocation;

@Repository
public interface AgencyLocationRepository extends JpaRepository<AgencyLocation, Integer> {
    AgencyLocation findByUserId(int userId);
}
