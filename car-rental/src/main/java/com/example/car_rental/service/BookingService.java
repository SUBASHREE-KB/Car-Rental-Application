package com.example.car_rental.service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.car_rental.dto.BookingDetailsDTO;
import com.example.car_rental.dto.BookingInfoDto;
import com.example.car_rental.model.Booking;
import com.example.car_rental.model.Tracking;
import com.example.car_rental.model.Vehicle;
import com.example.car_rental.repository.BookingRepository;
import com.example.car_rental.repository.TrackingRepository;
import com.example.car_rental.repository.VehicleRepository;

import jakarta.transaction.Transactional;

@Service
public class BookingService {
    @Autowired
    VehicleRepository vehicleRepo;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    TrackingRepository trackingRepository;

    @Transactional
    public ResponseEntity<?> bookVehicle(int userId, Booking book) {
        Vehicle vehicle = vehicleRepo.findByVehicleId(book.getVehicleId());
        if (vehicle.getAvailability() == 1) {
            book.setUserId(userId);
            book.setVehicleId(book.getVehicleId());
            book.setPickUpDate(book.getPickUpDate());
            book.setReturnDate(book.getReturnDate());
            book.setPrice(book.getPrice());
            book.setStatus("Pending Payment");
            vehicle.setAvailability(0);
            bookingRepository.save(book);
            vehicleRepo.save(vehicle);
            return new ResponseEntity<>(book, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Cannot make Booking", HttpStatus.BAD_REQUEST);
        }
    }

    public List<BookingInfoDto> getAllBookings() {
        return bookingRepository.findAllBookingDetailsByBooking();
    }

    public List<BookingDetailsDTO> getAllBookingById(int user_id) {
        return bookingRepository.findAllBookingDetailsById(user_id);
    }

    public List<BookingDetailsDTO> getAllBookingByUserId(int user_id) {
        return bookingRepository.findAllBookingDetailsByUserId(user_id);

    }

    @Scheduled(fixedRate = 3600000)
    public void updateBookingStatus() {
        Date oneHourAgo = new Date(System.currentTimeMillis() - 3600000);
        List<Booking> pendingBookings = bookingRepository.findByStatusAndCreatedAtBefore("Pending Payment", oneHourAgo);
        for (Booking booking : pendingBookings) {
            booking.setStatus("Cancelled");
            Vehicle vehicle = vehicleRepo.findByVehicleId(booking.getVehicleId());
            vehicle.setAvailability(1);
            bookingRepository.save(booking);
            vehicleRepo.save(vehicle);
        }
    }

    @Transactional
    @Scheduled(fixedRate = 1, timeUnit = TimeUnit.SECONDS)
    public void updateBookingStatusOnBegin() {
        Date today = new Date();
        bookingRepository.updateStatusForPickupDate(today);
        List<Booking> bookings = bookingRepository.findAllByStatus("Started");
        // System.out.println(bookings);
        for(Booking book : bookings){
            int id = book.getBookId();
            trackingRepository.updateStatusForBookId(id);
        }
    }

    public void cancelbooking(int userIdFromToken, int bookId) {
        Booking book = bookingRepository.findByBookId(bookId);
        if (book.getStatus().equals("Booked")) {
            Tracking t = trackingRepository.findByBookId(bookId);
            t.setStatus("Cancelled");
            t.setFine(book.getPrice() * 0.5);
            trackingRepository.save(t);
        }
        book.setStatus("Cancelled");
        Vehicle vehicle = vehicleRepo.findByVehicleId(book.getVehicleId());
        vehicle.setAvailability(1);
        bookingRepository.save(book);
        vehicleRepo.save(vehicle);
    }

}
