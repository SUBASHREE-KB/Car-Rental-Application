package com.example.car_rental.service;

import com.example.car_rental.dto.BookingHistoryDto;
import com.example.car_rental.dto.CompleteHistoryDto;
import com.example.car_rental.model.*;
import com.example.car_rental.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoryService {

    @Autowired
    private TrackingRepository trackingRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private AgencyLocationRepository agencyLocationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CompleteHistoryDto> filterBy(int userId, String status) {
        List<Tracking> completedTrackings = trackingRepository.findByUserIdAndStatusOrderByModifiedAtDesc(userId,
                status);

        return completedTrackings.stream().map(tracking -> {
            Booking booking = bookingRepository.findById(tracking.getBookId()).orElse(null);
            if (booking != null) {
                Vehicle vehicle = vehicleRepository.findById(booking.getVehicleId()).orElse(null);
                AgencyLocation agencyLocation = null;
                User user = null;
                if (vehicle != null) {

                    user = userRepository.findById(vehicle.getUserId()).orElse(null);
                    agencyLocation = agencyLocationRepository.findByUserId(user.getUserId());
                }

                return new CompleteHistoryDto(tracking, booking, vehicle, agencyLocation, user);
            }
            return null;
        }).filter(dto -> dto != null).collect(Collectors.toList());

    }

    public List<CompleteHistoryDto> getCompleteHistory(int userId) {
        return filterBy(userId, "Completed");
    }

    public List<CompleteHistoryDto> getOngoing(int userId) {
        return filterBy(userId, "Ongoing");
    }

    public List<CompleteHistoryDto> getOverdue(int userId) {
        return filterBy(userId, "Overdue");
    }

    public List<BookingHistoryDto> filterByBookingStatuses(int userId, List<String> statuses) {
        List<Booking> bookings = bookingRepository.findByUserIdAndStatusInOrderByCreatedAtDesc(userId, statuses);
        // System.out.println("Pending bookings"+bookings);
        return bookings.stream().map(booking -> {
            if (booking != null) {
                Vehicle vehicle = vehicleRepository.findById(booking.getVehicleId()).orElse(null);
                AgencyLocation agencyLocation = null;
                User user = null;
                if (vehicle != null) {

                    user = userRepository.findById(vehicle.getUserId()).orElse(null);
                    agencyLocation = agencyLocationRepository.findByUserId(vehicle.getUserId());
                }

                return new BookingHistoryDto(booking, vehicle, agencyLocation, user);
            }
            return null;
        }).filter(dto -> dto != null).collect(Collectors.toList());
    }

    public List<BookingHistoryDto> getPendingAndBooked(int userId) {
        List<String> statuses = List.of("Pending Payment", "Booked");
        return filterByBookingStatuses(userId, statuses);
    }

    public List<BookingHistoryDto> getCancelled(int userId) {
        List<String> statuses = List.of("Cancelled");
        return filterByBookingStatuses(userId, statuses);
    }

}
