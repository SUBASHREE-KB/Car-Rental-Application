package com.example.car_rental.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.car_rental.model.Payment;
import com.example.car_rental.model.Vehicle;
import com.example.car_rental.model.Booking;
import com.example.car_rental.repository.BookingRepository;
import com.example.car_rental.repository.PaymentRepository;
import com.example.car_rental.repository.VehicleRepository;

import jakarta.transaction.Transactional;

@Service
public class PaymentService {
    @Autowired
    PaymentRepository paymentRepo;
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    VehicleRepository vehicleRepository;
    @Autowired
    TrackingService trackingService;

    @Transactional
    public ResponseEntity<?> createNewPayment(int user_id, Payment newPayment) {
        try {
            if (isExpired(newPayment.getExpirationDate())) {
                return new ResponseEntity<>("Card is expired", HttpStatus.BAD_REQUEST);
            }
            newPayment.setBookId(newPayment.getBookId());
            System.out.println("UUID" + generateTransactionId());
            newPayment.setTransactionId(generateTransactionId());
            newPayment.setAmount(bookingRepository.findAmountByBookId(newPayment.getBookId()));
            int vehicleId = bookingRepository.findVehicleIdByBookId(newPayment.getBookId());
            Vehicle vehicle = vehicleRepository.findByVehicleId(vehicleId);
            newPayment.setStatus("Success");
            paymentRepo.save(newPayment);
            vehicle.setAvailability(0);
            vehicleRepository.save(vehicle);
            Booking book = bookingRepository.findByBookId(newPayment.getBookId());
            System.out.println(book);
            book.setStatus("Booked");
            Date due = bookingRepository.findReturnDateByBookId(newPayment.getBookId());
            int userid = bookingRepository.findUserIdByBookId(newPayment.getBookId());
            trackingService.createNewTrack(newPayment.getBookId(), userid, due);
            System.out.println(due);
            bookingRepository.save(book);
            return new ResponseEntity<>(newPayment, HttpStatus.CREATED);
        } catch (Exception e) {
            newPayment.setStatus("Failed");
            return new ResponseEntity<>("Cannot make Payment", HttpStatus.BAD_REQUEST);
        }
    }

    public static String generateTransactionId() {
        return UUID.randomUUID().toString();
    }

    private boolean isExpired(Date expirationDate) {
        LocalDate expDate = expirationDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate currentDate = LocalDate.now();
        return expDate.isBefore(currentDate);
    }

    public List<Payment> getAllPaymentsById(int user_id) {
        return paymentRepo.findAllByUserId(user_id);
    }

}
