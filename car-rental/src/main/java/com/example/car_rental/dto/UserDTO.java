package com.example.car_rental.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String role;
    private Long phoneNumber;
    private String email;
    private String password;
    private String username;
    private String area;
    private String city;
    private String zip;

}
