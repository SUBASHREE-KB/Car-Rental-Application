package com.example.car_rental.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.car_rental.dto.FavoritesDto;
import com.example.car_rental.model.Favorites;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Integer> {

    Optional<Favorites> findByUserIdAndVehicleId(int userId, int vehicleId);

    List<Favorites> findByUserId(int userId);

    @Query("select new com.example.car_rental.dto.FavoritesDto(f.favId,f.userId,f.vehicleId,f.flag,v.imageLink,v.type,v.model,v.price,v.availability) from Vehicle v join Favorites f on v.vehicleId = f.vehicleId where f.userId = :userId and f.flag = 1")
    List<FavoritesDto> findAllByUserId(int userId);

}
