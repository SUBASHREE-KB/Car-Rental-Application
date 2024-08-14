package com.example.car_rental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.car_rental.dto.AgencyDetailsDto;
import com.example.car_rental.dto.CustomerPerMonthDto;
import com.example.car_rental.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    @Query("Select u.email from User u where u.userId = :userId")
    String getUserEmailById(int userId);

    @Query("Select u.username from User u where u.userId = :userId")
    String getUserNameById(int userId);

    @Query("Select new com.example.car_rental.dto.AgencyDetailsDto(u.username,u.phoneNumber,u.email,a.area,a.city,a.zip) from User u join AgencyLocation a on u.userId=a.userId")
    List<AgencyDetailsDto> findAllByAgency();

    @Query("Select new com.example.car_rental.dto.AgencyDetailsDto(u.username,u.phoneNumber,u.email) from User u where u.role =:role")
    List<AgencyDetailsDto> findAllByCustomers(String role);

    @Query("Select DISTINCT new com.example.car_rental.dto.AgencyDetailsDto(u.username,u.phoneNumber,u.email) from User u join Booking b on u.userId = b.userId join Vehicle v on v.vehicleId = b.vehicleId where v.userId = :userId and b.status ='Booked' or b.status ='started'")
    List<AgencyDetailsDto> findAllByCustomersbyAgecny(@Param("userId") int userId);

    @Query("Select count(DISTINCT u.userId) from Booking b join User u on b.userId = u.userId join Vehicle v on v.vehicleId = b.vehicleId where  v.userId = :id and b.status='Booked' or b.status='started'")
    Long countofCutomerByAgency(int id);

    User findByUserId(int userId);

    @Query("SELECT new com.example.car_rental.dto.CustomerPerMonthDto(MONTH(u.createdAt), " +
            "SUM(CASE WHEN u.role = 'customer' THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN u.role = 'agency' THEN 1 ELSE 0 END)) " +
            "FROM User u " +
            "GROUP BY MONTH(u.createdAt) " +
            "ORDER BY MONTH(u.createdAt)")
    List<CustomerPerMonthDto> findCustomerCountPerMonth();

}
