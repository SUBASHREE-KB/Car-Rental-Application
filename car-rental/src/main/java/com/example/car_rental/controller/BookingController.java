package com.example.car_rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.car_rental.dto.BookingDetailsDTO;
import com.example.car_rental.dto.BookingInfoDto;
import com.example.car_rental.model.Booking;
import com.example.car_rental.service.BookingService;
import com.example.car_rental.util.JwtTokenUtil;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    BookingService bookingService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // Booking by customers
    @PostMapping("/bookit")
    public ResponseEntity<?> bookCar(@RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody Booking book) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            System.out.println(jwtTokenUtil.getRoleFromToken(token));
            System.out.println(jwtTokenUtil.getUserIdFromToken(token));
            return bookingService.bookVehicle(jwtTokenUtil.getUserIdFromToken(token), book);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You cannot make booking");

    }

    // Getting details of all the bookings - Admin
    @GetMapping("/details")
    public ResponseEntity<?> getAllBookings(@RequestHeader(value = "Authorization", required = false) String token) {
        List<BookingInfoDto> bookinglist;
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("Admin")) {
            bookinglist = bookingService.getAllBookings();
            return ResponseEntity.ok().body(bookinglist);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have access to see all the booking");

    }

    // Getting details of bookings - by agency
    @GetMapping("/detailsagency")
    public ResponseEntity<?> getAllBookingsById(
            @RequestHeader(value = "Authorization", required = false) String token) {
        List<BookingDetailsDTO> bookinglist;
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("agency")) {
            bookinglist = bookingService.getAllBookingById(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(bookinglist);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can't see the bookings for other agencies");

    }

    // Getting details of booking - by customer
    @GetMapping("/detailsuser")
    public ResponseEntity<?> getAllBookingsOfCustomer(
            @RequestHeader(value = "Authorization", required = false) String token) {
        List<BookingDetailsDTO> bookinglist;
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            bookinglist = bookingService.getAllBookingByUserId(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(bookinglist);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can't see the bookings of this customer");

    }

    @PostMapping("/cancel/{bookId}")
    public ResponseEntity<String> cancelBooking(@RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable("bookId") int bookId) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            bookingService.cancelbooking(jwtTokenUtil.getUserIdFromToken(token), bookId);
            return ResponseEntity.ok("Successfully cancelled");
        }

        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }
}
