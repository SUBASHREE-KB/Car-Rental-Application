package com.example.car_rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.car_rental.dto.ReviewDetailsDTO;
import com.example.car_rental.model.Review;
import com.example.car_rental.service.ReviewService;
import com.example.car_rental.util.JwtTokenUtil;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    ReviewService reviewService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // getting all reviews - admin
    @GetMapping("/get")
    public ResponseEntity<?> getAllReviews(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("Admin")) {
            List<Review> reviewList = reviewService.getAllReviews();
            return ResponseEntity.ok().body(reviewList);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");

    }

    // giving reviews - customer
    @PostMapping("/create")
    public ResponseEntity<?> makeNewReview(@RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody Review newReview) {

        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            return ResponseEntity.ok()
                    .body(reviewService.giveReview(jwtTokenUtil.getUserIdFromToken(token), newReview));
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");

    }

    // Getting reviews by a customer
    @GetMapping("/byuser")
    public ResponseEntity<?> getAllReviewsOfCustomerById(
            @RequestHeader(value = "Authorization", required = false) String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            List<Review> reviewList = reviewService.getAllReviewsByUserId(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(reviewList);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");

    }

    // Getting reviews for vehicle
    @GetMapping("/byvehicles")
    public ResponseEntity<?> getAllReviewForVehicle(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("Admin")) {
            List<ReviewDetailsDTO> reviewlist = reviewService.getAllReviewsByVehicleId();
            return ResponseEntity.ok().body(reviewlist);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");

    }

}
