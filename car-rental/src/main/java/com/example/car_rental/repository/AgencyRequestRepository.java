package com.example.car_rental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.car_rental.dto.AgencyRequestDto;
import com.example.car_rental.model.AgencyRequest;

@Repository
public interface AgencyRequestRepository extends JpaRepository<AgencyRequest, Integer> {

    AgencyRequest findByEmail(String email);

    @Query("Select new com.example.car_rental.dto.AgencyRequestDto(a.username, a.phoneNumber, a.email,a.password,a.area,a.city,a.zip,a.businessLicense,a.status) from AgencyRequest a where status = :status")
    List<AgencyRequestDto> findByStatus(String status);

    @Query("Select count(*) from AgencyRequest a where a.status = 'Pending'")
    Long countofPending();
}
