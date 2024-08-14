package com.example.car_rental.service;

import com.example.car_rental.model.Favorites;
import com.example.car_rental.repository.FavoritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.car_rental.dto.FavoritesDto;
import java.util.List;
import java.util.Optional;

@Service
public class FavoritesService {

    @Autowired
    private FavoritesRepository favoritesRepository;

    public ResponseEntity<?> getFavoritesList(int userId) {
        List<Favorites> favoritesList = favoritesRepository.findByUserId(userId);
        return ResponseEntity.ok(favoritesList);
    }

    public ResponseEntity<?> getUserFavoritesList(int userId) {
        List<FavoritesDto> favoritesList = favoritesRepository.findAllByUserId(userId);
        return ResponseEntity.ok(favoritesList);
    }

    public ResponseEntity<?> toggleFavorite(int userId, int vehicleId) {
        Optional<Favorites> favoriteOpt = favoritesRepository.findByUserIdAndVehicleId(userId, vehicleId);

        Favorites favorite;
        if (favoriteOpt.isPresent()) {
            favorite = favoriteOpt.get();
            favorite.setFlag(favorite.getFlag() == 1 ? -1 : 1);
        } else {
            favorite = new Favorites();
            favorite.setUserId(userId);
            favorite.setVehicleId(vehicleId);
            favorite.setFlag(1);
        }

        favoritesRepository.save(favorite);
        return ResponseEntity.ok(favorite);
    }
}
