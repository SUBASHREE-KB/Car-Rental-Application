package com.example.car_rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.car_rental.dto.StatusDto;
import com.example.car_rental.dto.TrackingDetailsDTO;
import com.example.car_rental.service.TrackingService;
import com.example.car_rental.util.JwtTokenUtil;
import com.example.car_rental.dto.AgencyBookingCountDto;
import com.example.car_rental.dto.AgencyMetricsDto;
import com.example.car_rental.dto.BookingHistoryDto;
import com.example.car_rental.dto.BookingStatusCountDTO;
import com.example.car_rental.dto.CompleteHistoryDto;
import com.example.car_rental.service.HistoryService;

@RestController
@RequestMapping("/track")
@CrossOrigin(origins = "http://localhost:3000")
public class TrackingController {
    @Autowired
    TrackingService trackingService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private HistoryService historyService;

    @GetMapping("/getbyuser")
    public ResponseEntity<?> getAllTrackingOfCustomer(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("agency")) {
            List<TrackingDetailsDTO> tracklist = trackingService
                    .getAllTrackingByUserId(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(tracklist);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");

    }

    @PutMapping("/savestatus")
    public ResponseEntity<?> saveStatusOfCustomer(
            @RequestHeader(value = "Authorization", required = false) String token, @RequestBody StatusDto statusdto) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("agency")) {
            com.example.car_rental.model.Tracking track = trackingService
                    .savestatus(jwtTokenUtil.getUserIdFromToken(token), statusdto);
            return ResponseEntity.ok().body(track);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");

    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            List<CompleteHistoryDto> history = historyService
                    .getCompleteHistory(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(history);
        }

        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @GetMapping("/ongoing")
    public ResponseEntity<?> getOngoing(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            List<CompleteHistoryDto> ongoing = historyService.getOngoing(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(ongoing);
        }

        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @GetMapping("/overdue")
    public ResponseEntity<?> getOverdue(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            List<CompleteHistoryDto> overdue = historyService.getOverdue(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(overdue);
        }

        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPending(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            List<BookingHistoryDto> pending = historyService
                    .getPendingAndBooked(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(pending);
        }

        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @GetMapping("/cancelled")
    public ResponseEntity<?> getCancelled(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("customer")) {
            List<BookingHistoryDto> pending = historyService.getCancelled(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(pending);
        }

        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @GetMapping("/agency/cancelled")
    public ResponseEntity<?> getAgencyCancelled(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("agency")) {
            List<TrackingDetailsDTO> tracklist = trackingService
                    .getAllCancelledTrackingByUserId(jwtTokenUtil.getUserIdFromToken(token));
            return ResponseEntity.ok().body(tracklist);
        }

        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");
    }

    @PutMapping("/refundstatus")
    public ResponseEntity<?> refundStatusOfCustomer(
            @RequestHeader(value = "Authorization", required = false) String token, @RequestBody StatusDto statusdto) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if (jwtTokenUtil.getRoleFromToken(token).equals("agency")) {
            com.example.car_rental.model.Tracking track = trackingService
                    .saveRefundstatus(jwtTokenUtil.getUserIdFromToken(token), statusdto);
            return ResponseEntity.ok().body(track);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");

    }

    @GetMapping("/agency-booking-counts")
    public ResponseEntity<List<AgencyBookingCountDto>> getAgencyBookingCounts() {
        return ResponseEntity.ok(trackingService.getBookingCountsByAgency());
    }

    @GetMapping("/booking-status-counts")
    public ResponseEntity<BookingStatusCountDTO> getBookingStatusCounts() {
        return ResponseEntity.ok(trackingService.getBookingStatusCounts());
    }

    @GetMapping("/booking-status-counts-agency")
    public ResponseEntity<?> getBookingStatusCountsForAgency(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }

        return ResponseEntity.ok(trackingService.getBookingStatusCountsAgency(jwtTokenUtil.getUserIdFromToken(token)));
    }

    @GetMapping("/agency-metrics/{agencyNames}")
    public ResponseEntity<List<AgencyMetricsDto>> getAgencyMetrics(@PathVariable List<String> agencyNames) {
        List<AgencyMetricsDto> metrics = trackingService.getMetricsByAgencies(agencyNames);
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/revenue-loss")
    public ResponseEntity<?> getRevenueLossForAgency(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }

        return ResponseEntity.ok(trackingService.getRevenueLossAgency(jwtTokenUtil.getUserIdFromToken(token)));
    }

    @GetMapping("/count-per-month")
    public ResponseEntity<?> getCustomerCountPerMonth(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        return ResponseEntity.ok(trackingService.getBookingCountPerMonth(jwtTokenUtil.getUserIdFromToken(token)));

    }
}
