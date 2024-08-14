package com.example.car_rental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.car_rental.dto.ReviewDetailsDTO;
import com.example.car_rental.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByUserId(int user_id);

    @Query("SELECT new com.example.car_rental.dto.ReviewDetailsDTO( v.vehicleId, v.imageLink, v.type, v.model, a.username) "
            +
            "FROM Vehicle v " +
            "JOIN User a ON a.userId = v.userId " +
            "JOIN Review r ON r.vehicleId = v.vehicleId " +
            "GROUP BY v.vehicleId, v.imageLink, v.type, v.model, a.username")
    List<ReviewDetailsDTO> findAllVehicleDetailsWithBasicReviews();

}
