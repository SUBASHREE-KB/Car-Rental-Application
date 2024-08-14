package com.example.car_rental.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.car_rental.dto.AgencyBookingCountDto;
import com.example.car_rental.dto.AgencyMetricsDto;
import com.example.car_rental.dto.BookingStatusCountDTO;
import com.example.car_rental.dto.CustomerPerMonthDto;
import com.example.car_rental.dto.StatusDto;
import com.example.car_rental.dto.TrackingDetailsDTO;
import com.example.car_rental.model.Tracking;
import com.example.car_rental.model.Booking;
import com.example.car_rental.model.Vehicle;
import com.example.car_rental.repository.BookingRepository;
import com.example.car_rental.repository.TrackingRepository;
import com.example.car_rental.repository.UserRepository;
import com.example.car_rental.repository.VehicleRepository;
import com.example.car_rental.model.User;

@Service
public class TrackingService {

    @Autowired
    private TrackingRepository trackingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private BookingRepository bookingRepository;

    public void createNewTrack(int book_id, int userid, Date due) {
        Tracking track = new Tracking();
        track.setBookId(book_id);
        System.out.println(book_id);
        track.setUserId(userid);
        System.out.println(userid);
        track.setDue(due);
        System.out.println(due);
        track.setStatus("Booked");
        System.out.println("Booked");
        track.setFine(0.00);
        System.out.println(track);

        track.setModifiedAt(new Timestamp(System.currentTimeMillis()));
        System.out.println(track);
        trackingRepository.save(track);
    }

    @Scheduled(cron = "0 0 12 * * ?")
    public void updateOverdueTracking() {
        System.out.println("hello");
        Date now = new Date();
        List<Tracking> ongoingTracks = trackingRepository.findByStatus("Ongoing");
        System.out.println(ongoingTracks);
        for (Tracking track : ongoingTracks) {
            if (track.getDue().before(now)) {
                System.out.println(track);
                track.setStatus("Overdue");
                Double amount = bookingRepository.findAmountByBookId(track.getBookId());
                Long overduedays = daysBetween(track.getDue(), now);
                track.setFine(amount * overduedays);
                trackingRepository.save(track);
                System.out.println(track);
            }
        }

    }

    @Scheduled(cron = "0 54 11 * * ?")
    public void overdueNotification() {
        Date date = new Date();
        List<Tracking> overdueTracks = trackingRepository.findByStatus("Overdue");

        for (Tracking track : overdueTracks) {
            Date due = track.getDue();
            String userEmail = userRepository.getUserEmailById(track.getUserId());
            String userName = userRepository.getUserNameById(track.getUserId());
            int vehicleId = bookingRepository.getVehicleIdByBookId(track.getBookId());
            Vehicle vehicleInfo = vehicleRepository.findByVehicleId(vehicleId);
            long overdueDays = daysBetween(due, date);
            emailService.sendOverdueNotification(userEmail, userName, vehicleInfo, overdueDays);
            System.out.println("Mail sent");

        }
    }

    public List<TrackingDetailsDTO> getAllTrackingByUserId(int user_id) {
        List<TrackingDetailsDTO> tracklist = trackingRepository.getAllTrackingByUserId(user_id);
        return tracklist;
    }

    public static long daysBetween(Date startDate, Date endDate) {
        LocalDate startLocalDate = Instant.ofEpochMilli(startDate.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate endLocalDate = Instant.ofEpochMilli(endDate.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        return ChronoUnit.DAYS.between(startLocalDate, endLocalDate);
    }

    public Tracking savestatus(int userIdFromToken, StatusDto statusdto) {
        Tracking tracking = trackingRepository.findByTrackId(statusdto.getTrackId());
        tracking.setStatus(statusdto.getStatus());
        trackingRepository.save(tracking);
        Booking book = bookingRepository.findByBookId(tracking.getBookId());
        Vehicle v = vehicleRepository.findByVehicleId(book.getVehicleId());
        if(v.getAvailability()==0)
        {
            v.setAvailability(1);
            vehicleRepository.save(v);
        }
        return tracking;
    }

    public List<Tracking> findByUserIdAndStatus(int userId, String status) {
        return trackingRepository.findByUserIdAndStatusOrderByModifiedAtDesc(userId, status);
    }

    public List<TrackingDetailsDTO> getAllCancelledTrackingByUserId(int userId) {
        List<TrackingDetailsDTO> tracklist = trackingRepository.getAllCancelledTrackingByUserId(userId);
        return tracklist;
    }

    public Tracking saveRefundstatus(int userIdFromToken, StatusDto statusdto) {
        Tracking tracking = trackingRepository.findByTrackId(statusdto.getTrackId());
        User u = userRepository.findByUserId(tracking.getUserId());
        tracking.setStatus(statusdto.getStatus());
        trackingRepository.save(tracking);
        emailService.sendRefund(u.getEmail(), u.getUsername(), tracking.getFine());
        System.out.println("Mail sent");
        return tracking;
    }

    public List<AgencyBookingCountDto> getBookingCountsByAgency() {
        return trackingRepository.getBookingCountsByAgency();
    }

    public BookingStatusCountDTO getBookingStatusCounts() {
        return trackingRepository.getBookingStatusCounts();
    }

    public BookingStatusCountDTO getBookingStatusCountsAgency(int userId) {
        return trackingRepository.getBookingStatusCountsAgency(userId);
    }

    public List<AgencyMetricsDto> getMetricsByAgencies(List<String> agencyNames) {
        return trackingRepository.findMetricsByAgencyNames(agencyNames);
    }

    public List<Double> getRevenueLossAgency(int userId) {

        List<Double> l = new ArrayList<>();
        Double revenue = trackingRepository.findRevenueById(userId);
        Double loss = trackingRepository.findLossById(userId);
        l.add(revenue);
        l.add(loss);
        return l;
    }

    public List<CustomerPerMonthDto> getBookingCountPerMonth(int userId) {
        return trackingRepository.findBookingCountPerMonth(userId);
    }
}
