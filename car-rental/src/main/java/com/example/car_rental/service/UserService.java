package com.example.car_rental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.car_rental.dto.AgencyDetailsDto;
import com.example.car_rental.dto.CustomerPerMonthDto;
import com.example.car_rental.dto.UserDTO;
import com.example.car_rental.model.AgencyLocation;
import com.example.car_rental.model.User;
import com.example.car_rental.repository.AgencyLocationRepository;
import com.example.car_rental.repository.AgencyRequestRepository;
import com.example.car_rental.repository.BookingRepository;
import com.example.car_rental.repository.ReviewRepository;
import com.example.car_rental.repository.UserRepository;
import com.example.car_rental.repository.VehicleRepository;
import com.example.car_rental.repository.TrackingRepository;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AgencyLocationRepository agencyLocationRepository;
    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private TrackingRepository trackingRepository;
    @Autowired
    private AgencyRequestRepository agencyRequestRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        if (user.getRole().equalsIgnoreCase("agency")) {
            AgencyLocation agencyLocation = new AgencyLocation();
            agencyLocation.setUserId(user.getUserId());
            agencyLocation.setArea(userDTO.getArea());
            agencyLocation.setCity(userDTO.getCity());
            agencyLocation.setZip(userDTO.getZip());
            agencyLocationRepository.save(agencyLocation);

        }
    }

    public List<AgencyDetailsDto> findAllAgencies() {
        return userRepository.findAllByAgency();
    }

    public List<AgencyDetailsDto> findAllCustomers() {
        return userRepository.findAllByCustomers("customer");
    }

    public List<AgencyDetailsDto> findAllCustomersbyAgency(int userId) {
        return userRepository.findAllByCustomersbyAgecny(userId);
    }

    public HashMap<String, Long> getCounts() {
        HashMap<String, Long> counts = new HashMap<>();
        counts.put("customers", userRepository.count() - agencyLocationRepository.count() - 1);
        counts.put("confirmed bookings", bookingRepository.countOfBooked());
        counts.put("cars", vehicleRepository.count());
        counts.put("agencies", agencyLocationRepository.count());
        counts.put("reviews", reviewRepository.count());
        counts.put("agency verification", agencyRequestRepository.countofPending());
        return counts;
    }

    public HashMap<String, Long> getCountsByAgency(int id) {
        HashMap<String, Long> counts = new HashMap<>();
        counts.put("customers", userRepository.countofCutomerByAgency(id));
        counts.put("confirmed bookings", bookingRepository.countOfBookedByAgency(id));
        counts.put("cars", vehicleRepository.countofVehcileByAgency(id));
        counts.put("trackings", trackingRepository.countoftrackingByAgency(id));
        return counts;
    }

    public List<HashMap<String, Object>> getDetailsByAgency(List<AgencyDetailsDto> agencyList) {
        List<HashMap<String, Object>> result = new ArrayList<>();
        for (AgencyDetailsDto agencydto : agencyList) {
            User u = userRepository.findByEmail(agencydto.getEmail());
            HashMap<String, Object> counts = new HashMap<>();
            counts.put("agencyName", agencydto.getUsername());
            counts.put("customers", userRepository.countofCutomerByAgency(u.getUserId()));
            counts.put("bookings", bookingRepository.countOfBookedByAgency(u.getUserId()));
            counts.put("cars", vehicleRepository.countofVehcileByAgency(u.getUserId()));
            counts.put("trackings", trackingRepository.countoftrackingByAgency(u.getUserId()));
            result.add(counts);
        }
        return result;
    }

    public User getUser(int userId) {
        return userRepository.findByUserId(userId);

    }

    public List<CustomerPerMonthDto> getCustomerCountPerMonth() {
        return userRepository.findCustomerCountPerMonth();
    }
}
