package com.example.car_rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.car_rental.model.Vehicle;
import com.example.car_rental.service.VehicleService;
import com.example.car_rental.util.JwtTokenUtil;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private List<Vehicle> vehicleList;

    @GetMapping("/getallbyAgency")
    public ResponseEntity<?> getAllVehiclesById(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("agency")) {
            vehicleList = vehicleService.getAllByUserId(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(vehicleList);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @GetMapping("/getallbyAvailable")
    public ResponseEntity<?> getAllAvailableVehicles(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            vehicleList = vehicleService.getAllByUserIdAndAvailable();
            return ResponseEntity.ok().body(vehicleList);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @GetMapping("/getAllSortedByPrice")
    public ResponseEntity<?> getAllSortedByPriceDesc(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            vehicleList = vehicleService.getAllByUserIdAndAvailableOrderByPrice();
            return ResponseEntity.ok().body(vehicleList);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllVehicles(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("Admin")) {
            
            return ResponseEntity.ok().body(vehicleService.getAll());
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNewVehicle(@RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody Vehicle newVehicle) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("agency")) {
            int user_id = jwtTokenUtil.getUserIdFromToken(token);
            return ResponseEntity.ok().body(vehicleService.createNewVehicle(user_id, newVehicle));
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to add new Vehicle");
    }

    @PutMapping("/edit")
    public ResponseEntity<?> updateVehicle(@RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody Vehicle updatedVehicle) {

        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("agency")) {
            int user_id = jwtTokenUtil.getUserIdFromToken(token);
            int vehicleId = updatedVehicle.getVehicleId();
            vehicleService.updateVehicle(user_id, vehicleId, updatedVehicle);
            return ResponseEntity.ok().body(updatedVehicle);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update new Vehicle");
    }

    @DeleteMapping("/delete/{VehicleId}")
    public ResponseEntity<String> deleteVehicleById(
            @RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable("VehicleId") int vehicleId) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token).equals("agency")) {
                vehicleService.findVehicleByIdSetAvailability(vehicleId);
                return ResponseEntity.ok("Vehicle with ID " + vehicleId + " deleted successfully.");
            } else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update new Vehicle");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting vehicle with ID " + vehicleId);
        }
    }

    @GetMapping("/getallbyLocation/{area}/{city}")
    public ResponseEntity<?> getAllVehiclesByLocation(
            @RequestHeader(value = "Authorization", required = false) String token, @PathVariable String area,
            @PathVariable String city) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
                System.out.println(area + " " + city);
                return ResponseEntity.ok(vehicleService.getVehiclesByLocation(area, city));
            } else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update new Vehicle");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("You don't have access to the resource");
        }

    }

    @GetMapping("/getVehicleDetails/{vehicleId}")
    public ResponseEntity<?> getVehicleDetails(@RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable int vehicleId) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {

                return ResponseEntity.ok(vehicleService.getVehicleDetails(vehicleId));
            } else
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Don't have permission to view Vehicle details");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("You don't have access to the resource");
        }

    }

}
