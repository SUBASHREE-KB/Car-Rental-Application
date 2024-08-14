package com.example.car_rental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.car_rental.dto.AgencyRequestDto;
import com.example.car_rental.model.AgencyRequest;
import com.example.car_rental.repository.AgencyRequestRepository;
import com.example.car_rental.service.AgencyRequestService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AgencyRequestController {
    @Autowired
    private AgencyRequestService agencyRequestService;
    @Autowired
    private AgencyRequestRepository agencyRequestRepository;

    @PostMapping("/agency/register")
    public void registerUser(@RequestBody AgencyRequestDto agencyRequestDto) {
        // User user = new User();
        // user.setUsername(userDTO.getUsername());
        // user.setPhoneNumber(userDTO.getPhoneNumber());
        // user.setEmail(userDTO.getEmail());
        // user.setPassword(userDTO.getPassword());
        // user.setRole(userDTO.getRole());
        agencyRequestService.registerUser(agencyRequestDto);
    }

    @GetMapping("/agency/requestpending")
    public List<AgencyRequestDto> pendingRequests() {
        return agencyRequestService.getPending();
    }

    @PostMapping("/agency/reject")
    public void rejectRequest(@RequestBody AgencyRequestDto agencyRequestdto) {
        AgencyRequest agencyRequest = agencyRequestRepository.findByEmail(agencyRequestdto.getEmail());
        agencyRequest.setStatus("Rejected");
        agencyRequestRepository.save(agencyRequest);
        agencyRequestService.sendMailReject(agencyRequestdto.getEmail(), agencyRequestdto.getUsername());
    }
}
