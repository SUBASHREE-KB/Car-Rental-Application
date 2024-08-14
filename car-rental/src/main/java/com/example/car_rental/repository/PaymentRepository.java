package com.example.car_rental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.car_rental.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p FROM Payment p JOIN Booking b ON p.bookId = b.bookId JOIN User u ON b.userId = u.userId WHERE u.userId = :user_id")
    List<Payment> findAllByUserId(@Param("user_id") int user_id);

}
