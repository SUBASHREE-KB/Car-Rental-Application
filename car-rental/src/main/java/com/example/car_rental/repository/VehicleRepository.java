package com.example.car_rental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.car_rental.dto.VehicleDto;
import com.example.car_rental.dto.VehicleInfoDto;
import com.example.car_rental.model.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    List<Vehicle> findAllByUserId(int id);

    Vehicle findByVehicleIdAndUserId(int vehicleId, int userId);

    Vehicle findByVehicleId(int vehicleId);

    @Query(value = "SELECT new com.example.car_rental.dto.VehicleInfoDto(v.vehicleId, v.imageLink, v.type, v.model,v.price,v.availability, u.username, u.phoneNumber, concat(a.area,\", \",a.city,\" - \",a.zip)) as address "
    +
    "FROM Vehicle v JOIN AgencyLocation a ON a.userId = v.userId JOIN User u on u.userId = a.userId where v.availability != :id")
    List<VehicleInfoDto> findAllAvailabilityNot(@Param("id") int id);

    @Query("Select v from Vehicle v where v.userId= :id and v.availability != -1")
    List<Vehicle> findAllByUserIdAndAvailabilityNot(@Param("id") int id);

    @Query("Select v from Vehicle v where v.availability = 1")
    List<Vehicle> findAllByAvailability();

    @Query("Select v from Vehicle v where v.availability = 1 order by v.price")
    List<Vehicle> findAllByAvailabilityOrderByPrice();

    @Query("Select v from Vehicle v join AgencyLocation a on v.userId = a.userId where v.availability>0 and a.city = :city or a.area = :area ")
    List<Vehicle> findByLocationAreaAndLocationCity(String area, String city);

    @Query(value = "SELECT new com.example.car_rental.dto.VehicleDto(v.vehicleId, v.imageLink, v.type, v.model, u.username, u.phoneNumber, concat(a.area,\", \",a.city,\" - \",a.zip)) as address "
            +
            "FROM Vehicle v JOIN AgencyLocation a ON a.userId = v.userId JOIN User u on u.userId = a.userId where v.vehicleId = :vehicleId")
    List<VehicleDto> findVehicleDetailsById(int vehicleId);

    @Query("select count(*) from Vehicle v where v.userId = :id and v.availability != -1")
    Long countofVehcileByAgency(int id);
}
