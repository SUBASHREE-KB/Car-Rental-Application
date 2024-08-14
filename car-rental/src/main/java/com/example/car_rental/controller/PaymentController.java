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

import com.example.car_rental.model.Payment;
import com.example.car_rental.service.PaymentService;
import com.example.car_rental.util.JwtTokenUtil;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    @Autowired
    PaymentService paymentService;
    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @PostMapping("/proceedpay")
    public ResponseEntity<?> createNewVehicle(@RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody Payment newPayment) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            return paymentService.createNewPayment(jwtTokenUtil.getUserIdFromToken(token), newPayment);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllPaymentsById(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            List<Payment> paymentlist = paymentService.getAllPaymentsById(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(paymentlist);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

}
