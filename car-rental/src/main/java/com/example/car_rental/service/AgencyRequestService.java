package com.example.car_rental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.car_rental.dto.AgencyRequestDto;
import com.example.car_rental.model.AgencyRequest;
import com.example.car_rental.repository.AgencyRequestRepository;
import java.util.List;

@Service
public class AgencyRequestService {

    @Autowired
    private AgencyRequestRepository agencyRequestRepository;
    @Autowired
    private EmailService emailService;

    public void registerUser(AgencyRequestDto agencyRequestDto) {
        AgencyRequest agencyRequest = new AgencyRequest();
        agencyRequest.setUsername(agencyRequestDto.getUsername());
        agencyRequest.setPhoneNumber(agencyRequestDto.getPhoneNumber());
        agencyRequest.setEmail(agencyRequestDto.getEmail());
        agencyRequest.setPassword(agencyRequestDto.getPassword());
        agencyRequest.setArea(agencyRequestDto.getArea());
        agencyRequest.setCity(agencyRequestDto.getCity());
        agencyRequest.setZip(agencyRequestDto.getZip());
        agencyRequest.setBusinessLicense(agencyRequestDto.getBusinessLicense());
        agencyRequest.setStatus("Pending");
        agencyRequestRepository.save(agencyRequest);

    }

    public void sendMail(String email, String username) {
        emailService.sendSuccessfulRegister(email, username);
        System.out.println("Mail Sent for Registration");
    }

    public List<AgencyRequestDto> getPending() {
        return agencyRequestRepository.findByStatus("Pending");
    }

    public void sendMailReject(String email, String username) {
        emailService.sendRejectRegister(email, username);
        System.out.println("Mail Sent for Registration Rejection");
    }
}
