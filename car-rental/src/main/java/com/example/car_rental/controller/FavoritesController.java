package com.example.car_rental.controller;

import com.example.car_rental.service.FavoritesService;
import com.example.car_rental.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FavoritesController {

    @Autowired
    private FavoritesService favoritesService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/user/favorites")
    public ResponseEntity<?> getUserFavoritesList(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }

        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }

        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            int userId = jwtTokenUtil.getUserIdFromToken(token);
            return favoritesService.getUserFavoritesList(userId);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You cannot perform this action");
        }
    }

    @GetMapping("/favorites")
    public ResponseEntity<?> getFavoritesList(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }

        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }

        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            int userId = jwtTokenUtil.getUserIdFromToken(token);
            return favoritesService.getFavoritesList(userId);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You cannot perform this action");
        }
    }

    @PostMapping("/togglefavorite/{vehicleId}")
    public ResponseEntity<?> toggleFavorite(@RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable int vehicleId) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }

        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }

        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            int userId = jwtTokenUtil.getUserIdFromToken(token);
            return favoritesService.toggleFavorite(userId, vehicleId);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You cannot perform this action");
        }
    }
}
