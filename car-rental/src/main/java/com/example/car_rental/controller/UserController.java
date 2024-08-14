package com.example.car_rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.car_rental.dto.AgencyDetailsDto;
import com.example.car_rental.dto.CustomerPerMonthDto;
import com.example.car_rental.dto.UserDTO;
import com.example.car_rental.model.AgencyRequest;
import com.example.car_rental.repository.AgencyRequestRepository;
import com.example.car_rental.service.AgencyRequestService;
import com.example.car_rental.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestHeader;
import com.example.car_rental.util.JwtTokenUtil;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AgencyRequestRepository agencyRequestRepository;
    @Autowired
    private AgencyRequestService agencyRequestService;

    @PostMapping("/user/register")
    public void registerUser(@RequestBody UserDTO userDTO) {
        userService.registerUser(userDTO);
        if (userDTO.getRole().equals("agency")) {
            AgencyRequest agencyRequest = agencyRequestRepository.findByEmail(userDTO.getEmail());
            agencyRequest.setStatus("Accepted");
            agencyRequestRepository.save(agencyRequest);
            agencyRequestService.sendMail(agencyRequest.getEmail(), agencyRequest.getUsername());
        }

    }

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    private List<AgencyDetailsDto> agencyList;
    private List<AgencyDetailsDto> customerList;

    // Getting all agency details - admin
    @GetMapping("/agencydetails")
    public ResponseEntity<?> getAllAgencies(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("Admin")) {
            System.out.println(jwtTokenUtil.getRoleFromToken(token));
            System.out.println(jwtTokenUtil.getUserIdFromToken(token));
            agencyList = userService.findAllAgencies();
            return ResponseEntity.ok().body(agencyList);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    // Getting all customer details - Admin
    @GetMapping("/customerdetails")
    public ResponseEntity<?> getAllCustomers(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("Admin")) {
            customerList = userService.findAllCustomers();
            return ResponseEntity.ok().body(customerList);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    // Getting all customers based on agency
    @GetMapping("/customerdetailsbyagency")
    public ResponseEntity<?> getAllCustomersByAgency(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);

        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        int userId = jwtTokenUtil.getUserIdFromToken(token);
        List<AgencyDetailsDto> customerList = userService.findAllCustomersbyAgency(userId);
        return ResponseEntity.ok().body(customerList);
    }

    @GetMapping("/counts")
    public ResponseEntity<HashMap<String, Long>> getCounts(
            @RequestHeader(value = "Authorization", required = false) String token) {
        HashMap<String, Long> counts = userService.getCounts();
        return ResponseEntity.ok(counts);
    }

    @GetMapping("/radar-counts")
    public ResponseEntity<List<HashMap<String, Object>>> getRadarCounts(
            @RequestHeader(value = "Authorization", required = false) String token) {

        agencyList = userService.findAllAgencies();

        return ResponseEntity.ok(userService.getDetailsByAgency(agencyList));
    }

    @GetMapping("/counts-agency")
    public ResponseEntity<?> getCountsAgency(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);

        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        int userId = jwtTokenUtil.getUserIdFromToken(token);
        HashMap<String, Long> counts = userService.getCountsByAgency(userId);
        return ResponseEntity.ok(counts);

    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);

        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        int userId = jwtTokenUtil.getUserIdFromToken(token);

        return ResponseEntity.ok(userService.getUser(userId));

    }

    @GetMapping("/count-per-month")
    public List<CustomerPerMonthDto> getCustomerCountPerMonth() {
        return userService.getCustomerCountPerMonth();
    }

}
