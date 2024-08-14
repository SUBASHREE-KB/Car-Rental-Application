package com.example.car_rental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.car_rental.dto.LoginDTO;
import com.example.car_rental.dto.AuthDto;
import com.example.car_rental.model.User;
import com.example.car_rental.service.LoginService;
import com.example.car_rental.util.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/log")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        try {
            String role = loginService.authenticate(loginDTO);
            if ("Invalid".equals(role)) {
                return ResponseEntity.status(401).body("Invalid credentials");
            } else {
                User user = loginService.getUser(loginDTO);
                if (user == null) {
                    return ResponseEntity.status(401).body("User not found");
                }

                int userId = user.getUserId();
                AuthDto authDto = new AuthDto();
                authDto.setUserId(userId);
                authDto.setRole(role);

                String token = jwtTokenUtil.generateToken(authDto);
                return ResponseEntity.ok(token);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error Occurred: " + e.getMessage());
        }
    }
}
