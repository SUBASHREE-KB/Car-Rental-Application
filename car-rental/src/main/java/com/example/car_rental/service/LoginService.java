package com.example.car_rental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.car_rental.dto.LoginDTO;
import com.example.car_rental.model.User;
import com.example.car_rental.repository.UserRepository;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepo;

    public String authenticate(LoginDTO loginDTO) {
        User user = userRepo.findByEmail(loginDTO.getEmail());

        if (user != null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (encoder.matches(loginDTO.getPassword(), user.getPassword())) {
                return user.getRole();
            }
        }
        return "Invalid";
    }

    public User getUser(LoginDTO loginDTO) {
        return userRepo.findByEmail(loginDTO.getEmail());
    }
}
