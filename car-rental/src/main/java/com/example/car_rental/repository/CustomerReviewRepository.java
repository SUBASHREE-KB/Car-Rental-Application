package com.example.car_rental.repository;

import com.example.car_rental.dto.CustomerReviewDto;
import com.example.car_rental.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerReviewRepository extends JpaRepository<Review, Integer> {

    @Query("SELECT new com.example.car_rental.dto.CustomerReviewDto(u.username, u.phoneNumber, r.rating, r.comment,r.date) "
            +
            "FROM Review r " +
            "JOIN User u ON u.userId = r.userId " +
            "WHERE r.vehicleId = :vehicleId")
    List<CustomerReviewDto> findCustomerReviewsByVehicleId(@Param("vehicleId") int vehicleId);
}
